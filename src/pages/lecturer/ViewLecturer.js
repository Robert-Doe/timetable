import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

function ViewLecturer() {

    let {id} = useParams();
    let [lecturer, setLecturer] = useState({});
    let [department, setDepartment] = useState({})
    let [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:9999/lecturers/${id}`, {
            method: "GET",
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
            .then(response => response.json())
            .then(teacher => {
                setLecturer(teacher);
                console.log(teacher);

                fetch(`http://localhost:9999/departments/${teacher.dept_id}`, {
                    method: "GET",
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                    .then(response => response.json())
                    .then(dept => {
                        setDepartment(dept);
                        console.log(dept);
                    })
                    .catch(err => console.log(err))

                fetch(`http://localhost:9999/pairings/lecturers/${id}`, {
                    method: "GET",
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                    .then(response => response.json())
                    .then(courses => {
                        setCourses(courses);
                        console.log(courses)
                    })
            })

            .catch(err => console.log(err))

    }, [])


    return (
        <section className={'container mt-3 py-3'}>
            <section className={'container px-5'}>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="http://localhost:3000/">Home</a></li>
                        <li className="breadcrumb-item"><a href="http://localhost:3000/lecturers">Lecturers</a></li>
                        <li className="breadcrumb-item active" aria-current="page">View</li>
                    </ol>
                </nav>
                <dl className={'dl-horizontal text-center'}>
                    <dt>Identity</dt>
                    <dd>{lecturer && `${id}`}</dd>

                    <dt>Name</dt>
                    <dd>{lecturer && `${lecturer.fname} ${lecturer.lname}`}</dd>

                    <dt>Department</dt>
                    <dd>{department && `${department.name}`}</dd>

                    <dt>Sessions</dt>
                    <dd>{department && `${courses.length}`}</dd>

                    <dt>Pairing</dt>
                    <dd>{department && `${courses.length}`}</dd>
                </dl>
                <div className="accordion" id="accordionExample">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h2 className="mb-0">
                                <button className="btn btn-link btn-block text-center" type="button"
                                        data-toggle="collapse" data-target="#collapseOne" aria-expanded="true"
                                        aria-controls="collapseOne">
                                    Courses
                                </button>
                            </h2>
                        </div>

                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne"
                             data-parent="#accordionExample">
                            <div className="card-body">
                                Some placeholder content for the first accordion panel. This panel is shown by default,
                                thanks to the <code>.show</code> class.
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingTwo">
                            <h2 className="mb-0">
                                <button className="btn btn-link btn-block text-center collapsed" type="button"
                                        data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false"
                                        aria-controls="collapseTwo">
                                    Sessions
                                </button>
                            </h2>
                        </div>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                             data-parent="#accordionExample">
                            <div className="card-body">
                                Some placeholder content for the second accordion panel. This panel is hidden by
                                default.
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </section>
    )
}

export default ViewLecturer