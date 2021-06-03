import React from 'react';
import {useParams} from 'react-router-dom'
import periods from "../../data/period";
import Period from "./Period";
import Days from './Days';
import BackFill from "./BackFill";

let prevperiod = (session) => {
    return session.toString().split("-")
}
let pi=(text)=>{
    return Number.parseInt(text)
}
let cellInterval=(active,previous)=>{
    return Math.abs(pi(active[1])-pi(previous[2]))
}
function ViewBatch() {
    let {id} = useParams();

    return (
        <section className={'container-fluid mt-2 py-3'}>
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="http://localhost:3000/">Home</a></li>
                        <li className="breadcrumb-item"><a href="http://localhost:3000/batches">Batches</a></li>
                        <li className="breadcrumb-item active" aria-current="page">View</li>
                    </ol>
                </nav>
            </div>
            <main className={'px-3'}>
                <section className="row p-0">
                    <Days name={'Monday'}/>
                    {periods.monday.map((object, index) => {

                        const {period}=object;
                        const session = period.split("-")
                        console.log(session)
                        if (index !== 0) {
                            const prevSession=periods.monday[index-1].period.split('-')
                            const difference = cellInterval(session,prevSession)
                            console.log(difference)
                            if (difference > 0) {
                                return (<>
                                    <BackFill space={difference} key={index}/>
                                    < Period session={object} key={index}/>
                                </>)
                            } else {
                                return (< Period session={object} key={index}/>)
                            }
                        } else {
                                const difference=Math.abs(0-pi(session[1]))
                            return (<>
                                <BackFill space={difference} />
                                < Period session={object}/>
                                </>
                                )
                        }

                    })
                    }
                </section>
                <section className="row p-0">
                    <Days name={'Tuesday'}/>
                    {periods.wednesday.map((object, index) => {
                        if (object !== null)
                            return <Period session={object}/>
                    })
                    }
                </section>
                <section className="row p-0">
                    <Days name={'Wednesday'}/>
                    {periods.thursday.map((object, index) => {
                        if (object !== null)
                            return <Period session={object}/>
                    })
                    }
                </section>
                <section className="row p-0">
                    <Days name={'Thursday'}/>
                    {periods.friday.map((object, index) => {
                        if (object !== null)
                            return <Period session={object}/>
                    })
                    }
                </section>
                <section className="row p-0">
                    <Days name={'Friday'}/>
                    {periods.tuesday.map((object, index) => {
                        if (object !== null)
                            return <Period session={object}/>
                    })
                    }
                </section>
            </main>

        </section>
    )
}

export default ViewBatch;