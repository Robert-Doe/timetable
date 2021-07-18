import React, {useRef} from 'react';

function AddSession() {

    const days = {
        sunday: "Sun",
        monday: "Mon",
        tuesday: "Tues",
        wednesday: "Wed",
        thursday: "Thurs",
        friday: "Fri",
        saturday: "Sat"
    }

    const lecturerRef = useRef(null);
    const courseRef = useRef(null);
    const batchRef = useRef(null);
    const dayRef = useRef(null);
    const periodRef = useRef(null);
    const timeRef = useRef(null);
    const hallRef = useRef(null);
    const statusRef = useRef(null)

    const value = (ref) => ref.current.value

    const refEmpty = (ref) => {
        return ref.current.value === ''
    }


    const pairId = (lRef, cRef) => `${value(lRef)}-${value(cRef)}`;

    const period = (dRef, pRef, tRef) => `${days[value(dRef)]}-${value(periodRef)}-${value(tRef)}`


    const addSessionHandler = (e) => {
        e.preventDefault();

        if (!refEmpty(lecturerRef) && !refEmpty(dayRef) && !refEmpty(batchRef) && !refEmpty(hallRef) && !refEmpty(timeRef)) {
            const newSession = {
                pair_id: pairId(lecturerRef, courseRef),
                hall_id: value(hallRef),
                period: period(dayRef, periodRef, timeRef),
                batch: value(batchRef)
            }

            fetch("http://localhost:9999/sessions", {

                // Adding method type
                method: "POST",

                // Adding body or contents to send
                body: JSON.stringify(newSession),

                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json())
                .then(data => {
                    console.log(data)
                    lecturerRef.current.value = ''
                    dayRef.current.value = ''
                    batchRef.current.value = ''
                    hallRef.current.value = ''
                    statusRef.current.value = data.msg

                })
                .catch(err => console.log(err))

            lecturerRef.current.childNodes.forEach((child) => console.log(child))

        } else {
            alert("All Fields are important")
        }


    }


    return (
        <section className={'container mt-5 py-5'}>
            <section className={'container px-5'}>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="localhost:3000/">Home</a></li>
                        <li className="breadcrumb-item"><a href="localhost:3000/sessions">Sessions</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Add</li>
                    </ol>
                </nav>

                <form className={'px-5'} onSubmit={addSessionHandler}>
                    <div className={'row'}>
                        <div className="col-lg-4 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Lecturer's Department</label>
                            <select className="form-control" id="exampleFormControlSelect1">
                                <option>Department of Mathematics</option>
                                <option>Department of Biological Science</option>
                                <option>Department of Chemistry</option>
                                <option>Department of Computer Science</option>
                                <option>Department of Borrowed</option>
                            </select>
                        </div>
                        <div className="col-lg-4 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Lecturer</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={lecturerRef}>
                                <option>Dr Ussiph Najim</option>
                                <option>Prof. James Ben Hayfron-Acquah</option>
                                <option>Dr. Missah</option>
                                <option>Dr. Peasah</option>
                                <option>Dr. F Twum</option>
                                <option>Dr. Robert Doe</option>
                            </select>
                        </div>
                        <div className="col-lg-4 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Course</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={courseRef}>
                                <option>CSM 235</option>
                                <option>CSM580</option>
                                <option>CSM 192</option>
                                <option>CSM 123</option>
                                <option>CSM001</option>
                                <option>CSM 101</option>
                            </select>
                        </div>
                    </div>


                    <div className={'row'}>
                        <div className="col-lg-6 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Students Department</label>
                            <select className="form-control" id="exampleFormControlSelect1">
                                <option>Department of Mathematics</option>
                                <option>Department of Biological Science</option>
                                <option>Department of Chemistry</option>
                                <option>Department of Computer Science</option>
                                <option>Department of Borrowed</option>
                            </select>
                        </div>
                        <div className="col-lg-6 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Year Batch</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={batchRef}>
                                <option>Year One</option>
                                <option>Year Two</option>
                                <option>Year Three</option>
                                <option>Year Four</option>
                                <option>Year Five</option>
                                <option>Year Six</option>
                            </select>
                        </div>
                    </div>


                    <div className={'row'}>
                        <div className="col-lg-4 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Day</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={dayRef}>
                                <option>Mon</option>
                                <option>Tues</option>
                                <option>Wed</option>
                                <option>Thurs</option>
                                <option>Fri</option>
                            </select>
                        </div>
                        <div className="col-lg-4 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Period(Start)</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={periodRef}>
                                <option>1 - (8:00)</option>
                                <option>2 - (9:00)</option>
                                <option>3 - (10:30)</option>
                                <option>4 - (11:30)</option>
                                <option>5 - (01:00)</option>
                            </select>
                        </div>
                        <div className="col-lg-4 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Duration</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={timeRef}>
                                <option>1 Period</option>
                                <option selected>2 Periods</option>
                                <option>3 Periods</option>
                                <option>4 Periods</option>
                                <option>5 Periods</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Hall</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={hallRef}>
                                <option>SF1</option>
                                <option>SF2</option>
                                <option>SF3</option>
                                <option>SF4</option>
                                <option>SF5</option>
                            </select>
                        </div>
                        <div className="col-lg-6 pt-3">
                            <label htmlFor="first_name" className={'text-danger text-bold'}>Status</label>
                            <input type="text" id={'first_name'} className="form-control" disabled ref={statusRef}
                                   placeholder="Feasible Session Placement"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 pt-3">
                            <div className="form-group">
                                <input id={'add_lecturer'} className="btn btn-primary form-control" type={'submit'}
                                       value={'Add Session'}></input>
                            </div>
                        </div>
                    </div>


                </form>
            </section>
        </section>
    )
}

export default AddSession