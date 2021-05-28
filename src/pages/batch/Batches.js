import React from 'react';

function Batches(){
    return(
        <section className={'container mt-5 py-5'}>
            <table className="table table-bordered" style={{borderRadius:'50px'}} >
                <thead className={'table-dark'}>
                <tr>
                    <th>#id</th>
                    <th>Department</th>
                    <th>Size</th>
                    <th>Year</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>fad23fa78829abc34e</td>
                    <td>Computer Science</td>
                    <td>250</td>
                    <td>3</td>
                </tr>
                </tbody>
            </table>
        </section>
    )
}

export default Batches