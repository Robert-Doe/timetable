import React ,{useState} from 'react';
//import sessions from "../../data/sessions";
import batches from "./batches";
import classrooms from "./classrooms";
//import period from "../../data/period";

function AlgorithmScheduler() {
    let days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri'];
    const [sessions,setSessions] = useState([]);

    const rangeArray = (start, end) => {
        return [...Array(end).keys()].filter(x => x >= start);
    }

    const intValue = (numString) => Number.parseInt(numString);



    const pObject = (period) => {
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

    const randtime = (duration) => {
        let randDay = Math.floor((Math.random() * 5));
        let randStart = Math.floor((Math.random() * 10)) + 1;
        let randEnd = randStart + duration;
        return `${days[randDay]}-${randStart}-${randEnd}`
    }

    const getLecturer = (pairId) => pairId.split('-')[0]/*pairings.filter(pair => pair.id === pairId)[0].lecturer_id*/;


    const isStudentFree = (id, period) => {
        let sSessions = sessions.filter(session => session.batch_id === id)
        return !sSessions.some(sess => doIntersect(sess.period, period))/*.length===0;*/
    }


    const isLecturerFree = (id, period) => {
        let lSessions = sessions.filter(session => session.lecturer_id === id)
        return !lSessions.some(sess => doIntersect(sess.period, period))/*.length===0;*/
    }


    const getRandomClassroom = (period, batchSize) => {
        let randomRoom = null;
        let fitClasses = classrooms.filter(classroom => classroom.size >= batchSize);
        do {
            randomRoom = fitClasses[Math.floor(Math.random() * fitClasses.length)];
            if (randomRoom === undefined) {
                randomRoom = {id: 'UNDEFINED', size: null}
            }
        } while ((sessions.some(session => session.period === period && session.classroom === randomRoom.id)));

        //console.log(randomRoom, batchSize)
        if (randomRoom.size >= batchSize) {
            return randomRoom.id
        } else {
            return 'UNDEFINED'
        }
    }

    const schedulable=(time,lecturerId,batchId)=>{
        if(time==='0000-00-00'){
            return true
        }else{return (isStudentFree(batchId,time) && isLecturerFree(lecturerId,time)) }
    }

    const getRandomTime = (hours, lecturerId, batchId) => {
        let sampletime = 'Mon-00-00';
        const sFreePeriods = studentFreeTime(batchId, hours);
        const lFreePeriods = lecturerFreeTime(lecturerId, hours);
       // console.log(sFreePeriods,lFreePeriods);
        const bestTimes = sFreePeriods.filter(x => lFreePeriods.includes(x));
       // do{
            if (bestTimes !== []) {
                sampletime = bestTimes[Math.floor(Math.random() * bestTimes.length)]
            }/*else{break;}*/
       // }while(!schedulable(sampletime,lecturerId,batchId))

        return sampletime;
    }

    const studentFreeTime = (batchId, time) => {
        const currentSchedule = sessions.map(session => {
            if (session.batch_id === batchId) {
                return session.period;
            }
        });
        //return possibleSet(time, 11).filter(x => !currentSchedule.includes(x));
        return possibleSet(time, 11).filter(x => !currentSchedule.some(y=>doIntersect(x,y)));
    }
    const lecturerFreeTime = (lecturerId, time) => {
        const currentSchedule = sessions.map(session => {
            if (session.lecturer_id === lecturerId) {
                return session.period;
            }
        });
        //return possibleSet(duration, 11).filter(x => !currentSchedule.includes(x));
        return possibleSet(time, 11).filter(x => !currentSchedule.some(y=>doIntersect(x,y)));
    }

    const possibleSet = (duration, maxPeriod) => {
        let freePeriod = [];
        days.forEach(day => {
            let count = 1;
            while (count < (maxPeriod - (duration)-1)) {
                freePeriod.push(`${day}-${count}-${count + duration}`);
                count++;
            }
        });
        return freePeriod;
    }


    const btnClickHandler = (e) => {
        setSessions([])
        console.clear();
        batches.forEach((batch) => {
            batch.pairings.forEach((pair) => {
                let lecturer = getLecturer(pair)
                let period = getRandomTime(2, lecturer, batch.id)
                let classroom = getRandomClassroom(period, batch.size);
                //console.log(batch.id,period,lecturer,classroom);
                   const newSession={
                        period: period,
                        pair_id: pair,
                        batch_id: batch.id,
                        classroom: classroom
                    };
                   setSessions(prev=>[newSession,...prev])
            })
        })
        sessions.forEach(item => console.log(item))
        //console.log(sessions.length)
        /*sessions = [];*/
    }


    return (<section className={'container py-2'}>
            <h1>Algorithm Scheduler</h1>
            {/*<h2>Count=={sessions.length}</h2>*/}
            <button onClick={btnClickHandler}>Generator</button>
        </section>
    )
}

export default AlgorithmScheduler