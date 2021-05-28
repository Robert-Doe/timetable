import React from 'react';

function Lecturers(){
    return(
        <section className={'container mt-5 py-5'}>
            <table className="table table-bordered" style={{borderRadius:'50px'}} >
                <thead className={'table-dark'}>
                <tr>
                    <th>#id</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>No(Courses)</th>
                    <th>No(Sessions)</th>
                </tr>
                </thead>
                <tbody>
                <tr >
                    <td>fad23fa78829abc34e</td>
                    <td nowrap={'nowrap'}>Robert Doe</td>
                    <td>Computer Science</td>
                    <td nowrap={'nowrap'}>6</td>
                    <td nowrap={'nowrap'}>7</td>
                </tr>
                </tbody>
            </table>
        </section>
    )
}

export default Lecturers