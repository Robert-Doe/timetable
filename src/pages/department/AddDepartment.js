import React from 'react';

function AddDepartment(){
    return(
        <section className={'container mt-5 py-5'} >
            <section className={'container px-5'} >
            <form className={'px-5'}>
                <div className="row pt-3">
                    <div className="col">
                        <label htmlFor="name">Name of Department</label>
                        <input type="text" id={'name'} className="form-control" placeholder="Name of Department"/>
                    </div>
                </div>
                <div className={'row'}>
                    <div className="col pt-3">
                        <label htmlFor="dept_abbr">Abbreviation</label>
                        <input type="text" id={'dept_abbr'} className="form-control" placeholder="Department Abbreviation"/>
                    </div>
                </div>
                <div className="form-group pt-3">
                    <label htmlFor="exampleFormControlTextarea1">Details</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder={'Add any information about the department here'}></textarea>
                </div>
                <div className="row pt-3">
                    <div className="form-group">
                        <input id={'add_dept'} className="btn btn-primary form-control w-25" type={'submit'} value={'Add Department'}></input>
                    </div>
                </div>
            </form>
            </section>
        </section>
    )
}

export default AddDepartment