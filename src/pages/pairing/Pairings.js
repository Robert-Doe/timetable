import React from 'react';

function Pairings(){
    return(
        <section className={'container mt-5 py-5'}>
            <table className="table table-bordered" style={{borderRadius:'50px'}} >
                <thead className={'table-dark'}>
                <tr>
                    <th>#id</th>
                    <th>Lecturer</th>
                    <th>Course Code</th>
                    <th>Department</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>fad23fa78829abc34e</td>
                    <td>Robert Doe</td>
                    <td>CSM157</td>
                    <td>Computer Science</td>
                </tr>
                </tbody>
            </table>
        </section>
    )
}

export default Pairings