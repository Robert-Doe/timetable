import React from 'react';
//import sessions from "../../data/sessions";
import batches from "./batches";
import pairings from "./pairings";
import classrooms from "./classrooms";

function AlgorithmSchedulerWithComments() {
    let days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri'];
    /* let period = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];*/
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

        if (pObject(fPeriod).day === pObject(sPeriod).day) {
            //return rangeWithPeriod(fPeriod).filter(x => rangeWithPeriod(sPeriod).indexOf(x) !== -1).length > 0
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

    const getLecturer = (pairId) => pairings.filter(pair => pair.id === pairId)[0].lecturer_id;


    const isStudentFree =(id, period) => {
            let sSessions=sessions.filter(session => session.batch_id === id)
        return sSessions.filter(sess => doIntersect(sess.period, period)).length===0;

        // if (sessions !== [])
        //     return !sessions.filter(session => session.batch_id === id)
        //         .some(sess => doIntersect(sess.period, period))
        // else return true
    }


    const isLecturerFree = (id, period) => {
        let lSessions=sessions.filter(session => session.lecturer_id === id)
        return lSessions.filter(sess => doIntersect(sess.period, period)).length===0;
        //return lSessions.filter(sess => doIntersect(sess.period, period)).length===0;

        // if (sessions !== [])
        //     return !sessions.filter(session => session.lecturer_id === id)
        //         .some(sess => doIntersect(sess.period, period))
        // else return true
    }


    const getRandomClassroom = (period, batchSize) => {
        let randomRoom = null;
        let count = 0;
        let fitClasses=classrooms.filter(classroom=>classroom.size>=batchSize);
        /*while (sessions.some(session => (session.period === period && session.classroom === randomRoom.id)) && count<classrooms.length*4){
           count+=1;
            randomRoom=classrooms[Math.floor(Math.random()*classrooms.length)].id;
        }*/
        do {
            //randomRoom = classrooms[Math.floor(Math.random() * classrooms.length) % classrooms.length];
            randomRoom = fitClasses[Math.floor(Math.random()*fitClasses.length)];
            if(randomRoom===undefined)
                randomRoom={id:'UNDEFINED',size:null}
            count++;
        } while ((sessions.some(session => session.period === period && session.classroom === randomRoom.id)));

        console.log(randomRoom, batchSize)
        if (randomRoom !== undefined && randomRoom.size >= batchSize)
            return randomRoom.id
        else return 'UNDEFINED';
        // return randomRoom.size >= batchSize ? randomRoom.id :'UNASSIGNED';
    }

    const getRandomTime = (hours, lecturerId, batchId) => {
        let lFree = false;
        let sFree = false;
        let sampletime = null;
        let maxCount = 0;
        /* let sFree = isStudentFree(batchId, period)
        let lFree = isLecturerFree(lecturerId, period)
        if (sFree && lFree) {
            return sampletime;
        } else {
            return getRandomTime(hours, lecturerId, batchId);
        }*/
         do{
            maxCount += 1;
            sampletime = randtime(hours);
            //console.log(sampletime);
            sFree = isStudentFree(batchId, sampletime)
            lFree = isLecturerFree(lecturerId, sampletime)
            console.log(batchId,sFree,sampletime,lecturerId,lFree)
            //console.log(sFree,lFree);
        }while (!(sFree && lFree) && maxCount < 100)
        if (sFree && lFree){
            return sampletime;
        } else {return '0000-00-00'}
    }


    const btnClickHandler = (e) => {
        sessions = [];
        console.clear();
        batches.forEach((batch) => {
            //Math.floor(Math.random() * 10);
            batch.pairings.forEach((pair) => {
                //console.info(pair);
                // console.info(getLecturer(pair))
                let period = getRandomTime(2, getLecturer(pair), batch.id)
                let classroom = getRandomClassroom(period, batch.size);
                sessions.push({
                    period: period,
                    pair_id: pair,
                    batch_id: batch.id,
                    classroom: classroom
                });
                //console.log(pair);
                // let newTime = randtime(2)
                // if (array.some(item => doIntersect(item, newTime))) {
                //     console.log('Conflict With Period  ' + newTime)
                // } else {
                //     array.push(newTime);
                // }
            })
            //

            //array.forEach(item => console.log(item))
        })
        sessions.forEach(item => console.log(item))
        console.log(sessions.length)
        sessions = [];
    }


    return (<section className={'container py-2'}>
            <h1>Algorithm Scheduler</h1>
            <button onClick={btnClickHandler}>Generator</button>
        </section>
    )
}

export default AlgorithmSchedulerWithComments