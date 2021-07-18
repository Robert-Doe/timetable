import React, {useEffect, useRef, useState} from 'react';

function AddLecturer() {

    const deptRef = useRef(null)
    const abbrRef = useRef(null);
    const detailRef = useRef(null);
    const fnameRef = useRef(null);
    const lnameRef = useRef(null);
    const [departments, setDepartments] = useState([])


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

    const addLecturerHandler = (e) => {
        e.preventDefault();

        if (!refEmpty(deptRef) && !refEmpty(abbrRef) && !refEmpty(detailRef) && !refEmpty(fnameRef) && !refEmpty(lnameRef)) {
            const newLecturer = {
                fname: value(fnameRef),
                lname: value(lnameRef),
                dept_id: getCurrentId(deptRef),
                abbr: value(abbrRef),
                sessions: [],
                detail: String,
                courses: []
            }

            fetch("http://localhost:9999/lecturers", {
                method: "POST",
                body: JSON.stringify(newLecturer),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json())
                .then(data => {
                    console.log(data)
                    deptRef.current.value = ''
                    abbrRef.current.value = ''
                    detailRef.current.value = ''
                    fnameRef.current.value = ''
                    lnameRef.current.value = ''
                })
                .catch(err => console.log(err))

        } else {
            alert("All Fields are important")
        }
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
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })

    }, [])


    return (
        <section className={'container mt-5 py-5'}>
            <section className={'container px-5'}>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="http://localhost:3000/">Home</a></li>
                        <li className="breadcrumb-item"><a href="http://localhost:3000/lecturers">Lecturers</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Add</li>
                    </ol>
                </nav>
                <form className={'px-5'} onSubmit={addLecturerHandler}>
                    <div className="row">
                        <div className="col-lg-6 pt-3">
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" id={'first_name'} className="form-control"
                                   placeholder="First name (eg. Robert)" ref={fnameRef}/>
                        </div>
                        <div className="col-lg-6 pt-3">
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" id={'last_name'} ref={lnameRef} className="form-control"
                                   placeholder="Last name (eg. Doe)"/>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className="col-lg-6 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Department</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={deptRef}>
                                {departments.map((department) => {
                                    return (<option key={department._id}
                                                    data-id={department._id}>{department.name}</option>)
                                })}
                            </select>
                        </div>
                        <div className="col-lg-6 pt-3">
                            <label htmlFor="exampleFormControlSelect1">Abbreviation</label>
                            <div className="input-group pt-0">
                                <div className="input-group-prepend" id={'name_initials'}>
                                    <span className="input-group-text" id="basic-addon1">@</span>
                                </div>
                                <input type="text" className="form-control py-0"
                                       placeholder="(Eg. R. Doe) Max(7 characters)" aria-label="Username"
                                       aria-describedby="basic-addon1" ref={abbrRef}/>
                            </div>
                        </div>

                    </div>

                    <div className="form-group pt-3">
                        <label htmlFor="exampleFormControlTextarea1">Details</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                  ref={detailRef}></textarea>
                    </div>
                    <div className="row pt-3">
                        <div className="form-group">
                            <input id={'add_lecturer'} className="btn btn-primary form-control" type={'submit'}
                                   value={'Add Lecturer'}></input>
                        </div>
                    </div>
                </form>
            </section>
        </section>
    )
}

export default AddLecturer