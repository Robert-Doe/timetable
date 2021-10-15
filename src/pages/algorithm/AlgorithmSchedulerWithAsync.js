import React, {createContext, useRef, useState} from 'react';
//import sessions from "../../data/sessions";
import batches from "./batches";
import classrooms from "./classrooms";
import {Table} from "./Table";
import {Singleton} from "./sessions"

//import sessions from "../../data/sessions";
//import period from "../../data/period";

export const SessionContext = createContext();

function AlgorithmScheduler() {

    const lecturerRef = useRef();

    let days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri'];
    const [interim, setInterim] = useState([]);
    //let sessions = [];


    const rangeArray = (start, end) => {
        return [...Array(end).keys()].filter(x => x >= start);
    }

    const intValue = (numString) => Number.parseInt(numString);

    const pObject = (period = 'Mon-00-00') => {
        return {
            day: period.split('-')[0],
            start: intValue(period.split('-')[1]),
            end: intValue(period.split('-')[2])
        }
    }

    const rangeWithPeriod = (period) => {
        const {start, end} = pObject(period);
        return rangeArray(start, end);
    }

    const doIntersect = (fPeriod, sPeriod) => {
        if (pObject(fPeriod).day === pObject(sPeriod).day) {
            return rangeWithPeriod(fPeriod).filter(x => rangeWithPeriod(sPeriod).includes(x)).length > 0
        } else {
            return false
        }
    }


    const getLecturer = async (pairId) => pairId.split('-')[0]/*pairings.filter(pair => pair.id === pairId)[0].lecturer_id*/;


    const getRandomClassroom = (period, batchSize) => {
        let randomRoom = null;
        let fitClasses = classrooms.filter(classroom => classroom.size >= batchSize);
        do {
            randomRoom = fitClasses[Math.floor(Math.random() * fitClasses.length)];
            if (randomRoom === undefined) {
                randomRoom = {id: 'UNDEFINED', size: null}
            }
        } while ((Singleton.getInstance().some(session => session.period === period && session.classroom === randomRoom.id)));

        //console.log(randomRoom, batchSize)
        if (randomRoom.size >= batchSize) {
            return randomRoom.id
        } else {
            return 'UNDEFINED'
        }
    }

    const getRandomTime = async (hours, lecturerId, batchId, schedules) => {
        let sampletime = 'Mon-00-00';
        const sFreePeriods =await studentFreeTime(batchId, hours, schedules);
        const lFreePeriods =await lecturerFreeTime(lecturerId, hours, schedules);
        // console.log(sFreePeriods,lFreePeriods);
        const bestTimes = sFreePeriods.filter(x => lFreePeriods.includes(x));
        // do{
        if (bestTimes !== []) {
            sampletime = bestTimes[Math.floor(Math.random() * bestTimes.length)]
        }/*else{break;}*/
        // }while(!schedulable(sampletime,lecturerId,batchId))

        return sampletime;
    }

    const studentFreeTime = async (batchId, time, schedules) => {
        const currentSchedule =schedules.map(session => {
            if (session.batch_id === batchId) {
                return session.period;
            }
        });
        //return possibleSet(time, 11).filter(x => !currentSchedule.includes(x));
        return (await possibleSet(time, 11)).filter(x => !currentSchedule.some(y => doIntersect(x, y)));
    } //Change the 12 Back to 11 . It was just for Testing Purposes

    //Filter in came to Replace map which existed in the previous
    const lecturerFreeTime = async (lecturerId, time, schedules) => {
        const currentSchedule = schedules.map(async session => {
            if ( await getLecturer(session.pair_id) === lecturerId) {
                return session.period;
            }
        });
        //return possibleSet(duration, 11).filter(x => !currentSchedule.includes(x));
        return (await possibleSet(time, 11)).filter(x => !currentSchedule.some(y => doIntersect(x, y)));//Change the 12 to 11
    }//Change the 12 To 11. It was just for testing purposes

    const possibleSet =async (duration, maxPeriod) => {
        let freePeriod = [];
        days.forEach(day => {
            let count = 1;
            while (count <= (maxPeriod - (duration + 1))) {
                freePeriod.push(`${day}-${count}-${count + duration}`);
                count++;
            }
        });
        return freePeriod;
    }


    const btnClickHandler =async () => {
        //sessions = [];
        //Singleton.clearInstance();
        //Singleton.clearInstance()
        setInterim([]);
        console.clear();
        let durations = [1, 2, 3,4];

            batches.forEach((batch,indexup) => {
                batch.pairings.forEach(async (pair,indexdown) => {
                let lecturer = await getLecturer(pair)
                let period =await getRandomTime(durations[Math.floor(Math.random() * 4)]/*2*/, lecturer, batch.id,Singleton.getInstance)
                let classroom =await getRandomClassroom(period, batch.size);
                //console.log(batch.id,period,lecturer,classroom);
                const newSession = {
                    period: period,
                    pair_id: pair,
                    batch_id: batch.id,
                    classroom: classroom
                };
                //sessions.push(newSession);
                  if(newSession.period !== "Mon-00-00"){
                      //setSessions(newSession)
                      //setInterim((prev)=>[...sessions])
                      Singleton.addInstance(newSession);
                  }

                if((batches.length-1)===indexup && (batch.pairings.length-1)=== indexdown){
                    let displayable =Singleton.getInstance().filter(sess => sess.period !== 'Mon-00-00' && sess.period)
                    console.log(displayable)
                    setInterim(displayable);
                }


            })

        })


        //sessions.forEach(item => console.log(item))
       /* setTimeout(()=>{*/

       /* },500)*/

        /*let rdoe1busy=sessions.map(x=>{if(getLecturer(x.pair_id)==='rdoe1'){return x.period}});
        console.log('rdoe1busy',rdoe1busy)
        let rdoe1set=possibleSet(2,11).filter(pos=>!rdoe1busy.includes(pos))
        console.log('rdoe1',rdoe1set)*/
        //console.log(sessions.length)
        //sessions = [];
    }


    return (<SessionContext.Provider value={{interim, setInterim}}>
            <section className={'container-fluid py-2'}>
                <h1>Algorithm Scheduler</h1>
                {/*    <form>
                    <input type={'text'} value={'rdoe1'} className={'form-control-sm'} name={'lecturer'} ref={lecturerRef}/>
                    <input type={'submit'}/>
                </form>*/}
                <button onClick={async()=>btnClickHandler()}>Generator</button>
                <Table id={'rdoe1'}/>
            </section>
        </SessionContext.Provider>

    )
}

export default AlgorithmScheduler


/*
const schedulable=(time,lecturerId,batchId)=>{
    if(time==='0000-00-00'){
        return true
    }else{return (isStudentFree(batchId,time) && isLecturerFree(lecturerId,time)) }
}*/

/*    const randtime = (duration) => {
        let randDay = Math.floor((Math.random() * 5));
        let randStart = Math.floor((Math.random() * 10)) + 1;
        let randEnd = randStart + duration;
        return `${days[randDay]}-${randStart}-${randEnd}`
    }*/

/*
const isStudentFree = (id, period) => {
    let sSessions = sessions.filter(session => session.batch_id === id)
    return !sSessions.some(sess => doIntersect(sess.period, period))/!*.length===0;*!/
}


const isLecturerFree = (id, period) => {
    let lSessions = sessions.filter(session => session.lecturer_id === id)
    return !lSessions.some(sess => doIntersect(sess.period, period))/!*.length===0;*!/
}*/
