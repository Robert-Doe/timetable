import React, {useEffect, useRef, useState} from 'react'


export function DeptBatchCourses() {


    const yearRef = useRef();
    const clientDeptRef = useRef();
    const lecturerRef = useRef();
    const responseRef = useRef();
    const serverDeptRef = useRef();
    const coursesRef = useRef()
    const [departments, setDepartments] = useState([]);
    const [serverDeptId, setServerDeptId] = useState(null);
    const [clientDeptId, setClientDeptId] = useState(null);
    //const [clientDeptId,setClientDeptId]=useState(null);
    const [courses, setCourses] = useState([]);
    const [activeCourseId, setActiveCourseId] = useState(null);
    const [pairings, setPairings] = useState([]);
    const [batches, setBatches] = useState([]);

    const value = (ref) => ref.current.value

    const refEmpty = (ref) => {
        return ref.current.value === ''
    }

    const getCurrentId = (ref) => {
        let activeTags = []
        const currentNodes = ref.current.childNodes
        Object.keys(currentNodes).forEach(e => activeTags = [currentNodes[e], ...activeTags])
        return activeTags.find(node => node.value === value(ref)).dataset.id
    }

    const clientDeptHandler = (e) => {
        setClientDeptId(getCurrentId(clientDeptRef))
    }


    const serverDeptHandler = (e) => {
        setServerDeptId(getCurrentId(serverDeptRef))
        //console.log(serverDeptId)
    }


    const changeCourseHandler = () => {
        setActiveCourseId(getCurrentId(coursesRef))
    }


    useEffect(() => {
        fetch('http://localhost:9999/departments', {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setDepartments(data)
                // setTimeout(() => {setServerDeptId(getCurrentId(serverDeptRef))
                //     setClientDeptId(getCurrentId(clientDeptRef))}, 150)
                setServerDeptId(getCurrentId(serverDeptRef))
                setClientDeptId(getCurrentId(clientDeptRef))
                if (!refEmpty(coursesRef))
                    setTimeout(() => setActiveCourseId(getCurrentId(coursesRef)), 150)
                console.log(clientDeptId);
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })

    }, [])


    useEffect(() => {
        fetch(`http://localhost:9999/batches/departments/${clientDeptId}`, {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setBatches(data)
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })
    }, [clientDeptId])


    useEffect(() => {

        fetch(`http://localhost:9999/courses/departments/${serverDeptId}`, {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setCourses(data)
                if (!refEmpty(coursesRef)) {
                    setTimeout(() => setActiveCourseId(getCurrentId(coursesRef)), 150)
                } else {
                    lecturerRef.current.value = null;
                }
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })

    }, [serverDeptId])

    useEffect(() => {

        fetch(`http://localhost:9999/pairings/courses/${activeCourseId}`, {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setPairings(data)
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })

    }, [activeCourseId])


    const addDeptBatchCourse = (e) => {
        e.preventDefault();
        if (!refEmpty(yearRef) && !refEmpty(serverDeptRef) && !refEmpty(coursesRef)) {
            const newLecturerCoursePair = {
                client: getCurrentId(clientDeptRef),
                server: getCurrentId(serverDeptRef),
                year: value(yearRef),
            }

            console.log(newLecturerCoursePair);
            /*fetch(`http://localhost:9999/departments/tome`, {
                method: "POST",
                body: JSON.stringify(newDepartment),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json())
                .then(data => {
                    console.log(data)
                    responseRef.current.value = data.msg;
                })
                .catch(err => {
                    console.log(err)
                    responseRef.current.value = err.msg;
                })*/

        }
    }


    return (
        <section className={'container mt-3 py-3'}>
            <section className={'container px-3'}>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="http://localhost:3000/">Home</a></li>
                        <li className="breadcrumb-item"><a href="http://localhost:3000/departments">Departments</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Add</li>
                    </ol>
                </nav>
                <form className={'px-5'} onSubmit={addDeptBatchCourse}>

                    <div className={'row'}>
                        <div className="col-lg-6 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Client Department</label>
                            <select className="form-control" id="exampleFormControlSelect1"
                                    onChange={clientDeptHandler} ref={clientDeptRef}>
                                {departments.map((department) => {
                                    return (<option key={department._id}
                                                    data-id={department._id}>{department.name}</option>)
                                })}
                            </select>
                        </div>
                        <div className="col-lg-6 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Year Batch</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={yearRef}>
                                {batches.map((batch) => {
                                    return (<option key={batch._id}
                                                    data-id={batch._id}>{batch.name}</option>);
                                })}
                            </select>
                        </div>
                    </div>

                    <div className={'row'}>
                        <div className="col-lg-6 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Server Department</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={serverDeptRef}
                                    onChange={serverDeptHandler}>
                                {departments.map((department) => {
                                    return (<option key={department._id}
                                                    data-id={department._id}>{department.name}</option>)
                                })}
                            </select>
                        </div>
                        <div className="col-lg-6 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Course</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={coursesRef}
                                    onChange={changeCourseHandler}>
                                {courses.map((course) => {
                                    return (<option key={course._id} data-id={course._id}>{course.course_abbr}</option>)
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Lecturers</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={lecturerRef}>
                                {pairings.map((pair) => {
                                    return (<option key={pair._id} data-id={pair._id}>{pair.lecturer_id}</option>)
                                })}
                            </select>
                        </div>

                        <div className="col-md-6 pt-3">
                            <label htmlFor="first_name" style={{color: '#f00'}}>Response</label>
                            <input type="text" id={'response'} className="form-control" disabled
                                   placeholder="Response :" ref={responseRef}/>
                        </div>
                    </div>

                    <div className="row pt-3">
                        <div className="form-group">
                            <input id={'add_dept'} className="btn btn-primary form-control" type={'submit'}
                                   value={'Add Department'}/>
                        </div>
                    </div>
                </form>
            </section>
        </section>
    )
}