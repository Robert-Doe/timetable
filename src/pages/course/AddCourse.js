import React from 'react';


function AddCourse(){
    return(
        <section className={'container mt-5 py-5'} >
            <section className={'container px-5'} >
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="http://localhost:3000/">Home</a></li>
                        <li className="breadcrumb-item"><a href="http://localhost:3000/courses">Courses</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Add</li>
                    </ol>
                </nav>
                <form className={'px-5'}>
                    <div className="row">
                        <div className="col-lg-6 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Department</label>
                            <select className="form-control" id="exampleFormControlSelect1">
                                <option>Department of Mathematics</option>
                                <option>Department of Biological Science</option>
                                <option>Department of Chemistry</option>
                                <option>Department of Computer Science</option>
                                <option>Department of Borrowed</option>
                            </select>
                        </div>
                        <div className="col-lg-6 pt-3">
                            <label htmlFor="course_name">Course Name</label>
                            <input type="text" id={'course_name'} className="form-control" placeholder="Course Name (eg. Application to Electronics)"/>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className="col-lg-6 pt-3">
                            <label htmlFor="course_name">Course Code</label>
                            <input type="text" id={'course_code'} className="form-control" placeholder="Course Code (eg. CSM123)"/>
                        </div>
                        <div className="col-lg-6 pt-3">
                            <label htmlFor="course_name">Credit Hours</label>
                            <input type="number" id={'credit_hours'} className="form-control" placeholder="Credit Hours (eg. 3)"/>
                        </div>

                    </div>
                    <div className="form-group pt-3">
                        <label htmlFor="exampleFormControlTextarea1">Details</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <div className="row pt-3">
                        <div className="form-group">
                            <input id={'add_course'} className="btn btn-primary form-control w-25" type={'submit'} value={'Add Course'}></input>
                        </div>
                    </div>
                </form>
            </section>
        </section>
    )
}

export default AddCourse