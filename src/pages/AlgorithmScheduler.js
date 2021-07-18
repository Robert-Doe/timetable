import React from 'react';

function AlgorithmScheduler() {
    let days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri'];
    let period = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let schedules = [];
    let pairings = [];
    let batches = [{
        id: "CS1",
        pairings: ['rdoe1-CSM124', 'bdoe1-CSM123', 'ddoe1-CSM111']
    }, {
        id: "CS2",
        pairings: ['bdoe1-CSM214', 'cdoe1-CSM215', 'ddoe1-CSM282']
    }, {
        id: "CS3",
        pairings: ['rdoe1-CSM333', 'cdoe1-CSM323', 'ddoe1-CSM324']
    }, {
        id: "CS4",
        pairings: ['bdoe1-CSM422', 'cdoe1-CSM444', 'ddoe1-CSM433']
    }, {
        id: "CS5",
        pairings: ['rdoe1-CSM511', 'bdoe1-CSM512', 'ddoe1-CSM532']
    }, {
        id: "CS6",
        pairings: ['bdoe1-CSM623', 'cdoe1-CSM632', 'ddoe1-CSM642']
    },
    ]

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
            // console.log(rangeWithPeriod(fPeriod));
            // console.log(rangeWithPeriod(sPeriod));
            return rangeWithPeriod(fPeriod).filter(x => rangeWithPeriod(sPeriod).indexOf(x) !== -1).length > 0
            // return rangeWithPeriod(fPeriod).filter(x => rangeWithPeriod(sPeriod).includes(x)).length > 0
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


    const btnClickHandler = (e) => {
        let array = [];
        console.clear();
        batches.forEach((batch) => {
            Math.floor(Math.random() * 10);
            batch.pairings.forEach((pair) => {
                let newTime = randtime(2)
                if (array.some(item => doIntersect(item, newTime))) {
                    console.log('Conflict With Period  ' + newTime)
                } else {
                    array.push(newTime);
                }

            })
        })
        array.forEach(item => console.log(item))
    }

    return (<section className={'container py-2'}>
            <h1>Algorithm Scheduler</h1>
            <button onClick={btnClickHandler}>Generator</button>
        </section>
    )
}

export default AlgorithmScheduler