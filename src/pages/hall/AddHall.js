import React from 'react';

function AddHall(){
    return(
        <section className={'container mt-5 py-5'} >
            <section className={'container px-5'} >
                <form className={'px-5'}>

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

                    <div className="row">
                        <div className="col-lg-6 pt-3">
                            <label htmlFor="first_name" >Class Size</label>
                            <input type="number" id={'size'} className="form-control" placeholder="First name (eg. Robert)"/>
                        </div>
                        <div className="col-lg-6 pt-3">
                            <label htmlFor="first_name" style={{color:'#f00'}}>Identifier</label>
                            <input type="text" id={'size'} className="form-control" disabled placeholder="Class Id: (CS1)"/>
                        </div>
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

export default AddHall