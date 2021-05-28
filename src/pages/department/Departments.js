import React from 'react';

function Departments(){
    return(
        <section className={'container mt-5 py-5'}>
            <table className="table table-bordered" style={{borderRadius:'50px'}} >
                <thead className={'table-dark'}>
                <tr>
                    <th>#id</th>
                    <th>Name</th>
                    <th>Details</th>
                    <th>Abbr</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>fad23fa78829abc34e</td>
                    <td>Computer Science</td>
                    <td>Software and Programming</td>
                    <td>CS</td>
                </tr>
                </tbody>
            </table>
        </section>
    )
}

export default Departments