import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {BatchNavData} from "../../components/BatchNavData";


function AddBatch() {
    const deptRef = useRef(null);
    const sizeRef = useRef(null);
    const yearRef = useRef(null);
    const nameRef = useRef(null);
    const divRef = useRef(null);
    const [departments, setDepartments] = useState([]);
    const [success, setSuccess] = useState([]);

    const refEmpty = (ref) => {
        return ref.current.value === ''
    }

    const value = (ref) => ref.current.value

    const getCurrentId = (ref) => {
        let activeTags = []
        const currentNodes = ref.current.childNodes
        Object.keys(currentNodes).forEach(e => activeTags = [currentNodes[e], ...activeTags])
        return activeTags.find(node => node.value === value(ref)).dataset.id
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
                setDepartments(data);
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })

    }, [])


    const addBatchHandler = (e) => {
        e.preventDefault();
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const division = Number.parseInt(divRef.current.value);
        const yearValue = value(yearRef);
        const sizeValue = (value(sizeRef)) / division;
        const deptValue = getCurrentId(deptRef);
        const nameValue = value(nameRef);
        //console.log(divRef.current);
        // alert(division)
        // console.log(division)

        if (!refEmpty(deptRef) && !refEmpty(sizeRef) && !refEmpty(yearRef) && !refEmpty(nameRef)) {

            for (let i = 0; i < division; i++) {
                const newBatch = {
                    year: yearValue,
                    size: Math.floor(sizeValue),
                    dept_id: deptValue,
                    name: division > 1 ? nameValue + '-' + characters.charAt(i) : nameValue,
                    class_size: value(sizeRef)
                }


                fetch("http://localhost:9999/batches", {
                    method: "POST",
                    body: JSON.stringify(newBatch),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }).then(response => response.json())
                    .then(data => {
                        console.log(data)
                        //responseRef.current.value = data.msg;
                        // console.log('I am here at the Inserting');
                        if (data.status === 'success')
                            setSuccess((prev) => [newBatch.name, ...prev]);
                    })
                    .catch(err => {
                        console.log(err);
                        alert('Error Inserting');
                        //responseRef.current.value = err.msg
                    })
            }

        } else {
            alert("All Fields are important")
        }

        setTimeout(() => setSuccess([]), 2000)
    }


    return (
        <section className={'container mt-5 py-5'}>
            <section className={'container px-5'}>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="http://localhost:3000/">Home</a></li>
                        <li className="breadcrumb-item"><a href="http://localhost:3000/batches">Batches</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Add</li>
                    </ol>
                </nav>

                <aside className={'nav-aside'}>
                    <ul>
                        {BatchNavData.map((item, index) => {
                            return (
                                <li key={index} style={{listStyle: 'none'}}>
                                    <Link to={item.path} class={'link'}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </aside>

                <form className={'px-5'} onSubmit={addBatchHandler}>

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
                        <div className="col-lg-6 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Year Batch</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={yearRef}>
                                <option>100</option>
                                <option>200</option>
                                <option>300</option>
                                <option>400</option>
                                <option>500</option>
                                <option>600</option>
                                <option>700</option>
                                <option>800</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 pt-3">
                            <label htmlFor="first_name">Class Size</label>
                            <input type="number" id={'size'} className="form-control" placeholder="Batch Size"
                                   ref={sizeRef} min={0}/>
                        </div>
                        <div className="col-lg-4 pt-3">
                            <label htmlFor="name">Name</label>
                            <input type="text" id={'name'} className="form-control" placeholder="Name" ref={nameRef}/>
                        </div>
                        {/*<div className="col-lg-4 pt-3">*/}
                        {/*<label htmlFor="first_name" style={{color: '#f00'}}>Response</label>
                            <input type="text" id={'response'} className="form-control" disabled
                                   placeholder="Response :" ref={responseRef}/>*/}
                        <div className="col-lg-4 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Division</label>
                            <select className="form-control" id="divisionSelect" ref={divRef}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                            </select>
                        </div>
                        {/*</div>*/}


                        <div className="row pt-3">
                            <div className="form-group">
                                <input id={'add_lecturer'} className="btn btn-primary form-control" type={'submit'}
                                       value={'Add Batch'}/>
                            </div>
                        </div>
                    </div>
                </form>
                {success && success.map((suc, index) => {
                    return (
                        <div className="alert alert-warning alert-dismissible fade show" role="alert" key={index}>
                            <strong>Added Successfully!</strong> New Batch - {suc}
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>)
                })}
            </section>
        </section>
    )
}

export default AddBatch;