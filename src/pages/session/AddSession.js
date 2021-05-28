import React from 'react';

function AddSession(){
    return(
        <section className={'container mt-5 py-5'} >
            <section className={'container px-5'} >

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="localhost:3000/">Home</a></li>
                        <li className="breadcrumb-item"><a href="localhost:3000/sessions">Sessions</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Add</li>
                    </ol>
                </nav>

                <form className={'px-5'}>
                    <div className={'row'}>
                        <div className="col-lg-6 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Lecturer's Department</label>
                            <select className="form-control" id="exampleFormControlSelect1">
                                <option>Department of Mathematics</option>
                                <option>Department of Biological Science</option>
                                <option>Department of Chemistry</option>
                                <option>Department of Computer Science</option>
                                <option>Department of Borrowed</option>
                            </select>
                        </div>
                        <div className="col-lg-6 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Lecturer</label>
                            <select className="form-control" id="exampleFormControlSelect1">
                                <option>Dr Ussiph Najim</option>
                                <option>Prof. James Ben Hayfron-Acquah</option>
                                <option>Dr. Missah</option>
                                <option>Dr. F Twum</option>
                                <option>Dr. Robert Doe</option>
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
                            <select className="form-control" id="exampleFormControlSelect1">
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
                            <select className="form-control" id="exampleFormControlSelect1">
                                <option>Monday</option>
                                <option>Tuesday</option>
                                <option>Wednesday</option>
                                <option>Thursday</option>
                                <option>Friday</option>
                            </select>
                        </div>
                        <div className="col-lg-4 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Period(Start)</label>
                            <select className="form-control" id="exampleFormControlSelect1">
                                <option>1 - (8:00)</option>
                                <option>2 - (9:00)</option>
                                <option>3 - (10:30)</option>
                                <option>4 - (11:30)</option>
                                <option>5 - (01:00)</option>
                            </select>
                        </div>
                        <div className="col-lg-4 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Duration</label>
                            <select className="form-control" id="exampleFormControlSelect1">
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
                            <select className="form-control" id="exampleFormControlSelect1">
                                <option>SF1</option>
                                <option>SF2</option>
                                <option>SF3</option>
                                <option>SF4</option>
                                <option>SF5</option>
                            </select>
                        </div>
                        <div className="col-lg-6 pt-3">
                            <label htmlFor="first_name" className={'text-danger text-bold'}>Status</label>
                            <input type="text" id={'first_name'} className="form-control" disabled placeholder="Feasible Session Placement"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 pt-3">
                            <div className="form-group">
                                <input id={'add_lecturer'} className="btn btn-primary form-control" type={'submit'} value={'Add Lecturer'} ></input>
                            </div>
                        </div>
                        <div className="offset-4 col-lg-4 pt-3">
                            <div className="form-group">
                                <input id={'add_lecturer'} className="btn btn-primary form-control" type={'submit'} value={'Add Lecturer'} ></input>
                            </div>
                        </div>
                    </div>


                </form>
            </section>
        </section>
    )
}

export default AddSession