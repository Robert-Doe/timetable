import React from 'react';
import {useParams} from 'react-router-dom'
import sessions from "../../../data/sessions";
import {BatchClassTable} from "../batches/BatchClassTable";
import {LecturerClassTable} from "./LecturerClassTable";



function LecturerSession() {
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
            <LecturerClassTable id={id}/>
        </section>
    )
}

export default LecturerSession;