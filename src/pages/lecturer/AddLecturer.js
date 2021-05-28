import React from 'react';

function AddLecturer(){
    return(
        <section className={'container mt-5 py-5'} >
            <section className={'container px-5'} >
            <form className={'px-5'}>
                <div className="row">
                    <div className="col-lg-6 pt-3">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" id={'first_name'} className="form-control" placeholder="First name (eg. Robert)"/>
                    </div>
                    <div className="col-lg-6 pt-3">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" id={'last_name'} className="form-control" placeholder="Last name (eg. Doe)"/>
                    </div>
                </div>
                <div className={'row'}>
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
                    <div className="col-lg-6 pt-4">
                        <div className="input-group pt-3">
                            <div className="input-group-prepend" id={'name_initials'}>
                                <span className="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <input type="text" className="form-control py-0" placeholder="Abbr. Name (Eg. R. Doe)" aria-label="Username"
                                   aria-describedby="basic-addon1" />
                        </div>
                    </div>

                </div>

                <div className="form-group pt-3">
                    <label htmlFor="exampleFormControlTextarea1">Details</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className="row pt-3">
                    <div className="form-group">
                        <input id={'add_lecturer'} className="btn btn-primary form-control w-25" type={'submit'} value={'Add Lecturer'}></input>
                    </div>
                </div>
            </form>
            </section>
        </section>
    )
}

export default AddLecturer