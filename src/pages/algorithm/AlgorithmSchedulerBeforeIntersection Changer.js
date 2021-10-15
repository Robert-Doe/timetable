import React from 'react';
//import sessions from "../../data/sessions";
import batches from "./batches";
import pairings from "./pairings";
import classrooms from "./classrooms";

function AlgorithmScheduler() {
    let days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri'];
    let sessions = [];

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
         if(pObject(fPeriod).day === pObject(sPeriod).day){
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


    const isStudentFree =(id, period) => {
            let sSessions=sessions.filter(session => session.batch_id === id)
        return !sSessions.some(sess => doIntersect(sess.period, period))/*.length===0;*/
    }


    const isLecturerFree = (id, period) => {
        let lSessions=sessions.filter(session => session.lecturer_id === id)
        return !lSessions.some(sess => doIntersect(sess.period, period))/*.length===0;*/
    }


    const getRandomClassroom = (period, batchSize) => {
        let randomRoom = null;
        let fitClasses=classrooms.filter(classroom=>classroom.size>=batchSize);
        do {
            randomRoom = fitClasses[Math.floor(Math.random()*fitClasses.length)];
            if(randomRoom===undefined) {
                randomRoom = {id: 'UNDEFINED', size: null}
            }
        } while ((sessions.some(session => session.period === period && session.classroom === randomRoom.id)));

        //console.log(randomRoom, batchSize)
        if (randomRoom.size >= batchSize) {
            return randomRoom.id
        }
        else{ return 'UNDEFINED'}
    }

    const getRandomTime = (hours, lecturerId, batchId) => {
        let lFree = false;
        let sFree = false;
        let sampletime = '0000-00-00';
        let maxCount = 0;
         do{
            maxCount++;
            sampletime = randtime(hours);
            sFree = isStudentFree(batchId, sampletime)
            lFree = isLecturerFree(lecturerId, sampletime)
            console.log(batchId,sFree,sampletime,lecturerId,lFree)
        }while (maxCount<300 && !(sFree && lFree));

        return (sFree && lFree)?sampletime:'0000-00-00';
    }

    const studentFreetime=(batchId,duration)=>{
        const currentSchedule=sessions.map(session=>{
            if(session.batch_id===batchId){
                return session.period;
            }
        });
        possibleSet(duration);
    }

    const possibleSet=(duration)=>{
        let freeperiod=[];
        days.forEach(day=>{
            let count=1;
            while(count<(maxPeriod-(duration))){
                freeperiod.push (`${day}-${count}-${count+duration}`);
                count++;
            }
        });
        return freeperiod;
    }


    const btnClickHandler = (e) => {
        sessions = [];
        console.clear();
        batches.forEach((batch) => {
            batch.pairings.forEach((pair) => {
                let lecturer=getLecturer(pair)
                let period = getRandomTime(2, lecturer, batch.id)
                let classroom = getRandomClassroom(period, batch.size);

                if(!sessions.some(sess=>(sess.period===period && sess.lecturer_id===lecturer))){
                    sessions.push({
                        period: period,
                        pair_id: pair,
                        batch_id: batch.id,
                        classroom: classroom
                    });
                }

            })
        })
        sessions.forEach(item => console.log(item))
        //console.log(sessions.length)
        sessions = [];
    }


    return (<section className={'container py-2'}>
            <h1>Algorithm Scheduler</h1>
            <button onClick={btnClickHandler}>Generator</button>
        </section>
    )
}

export default AlgorithmScheduler