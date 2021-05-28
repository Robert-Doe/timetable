import React from 'react';

function Sessions(){
    return(
        <section className={'container mt-5 py-5'}>
            <table className="table table-bordered" style={{borderRadius:'50px'}} >
                <thead className={'table-dark'}>
                <tr>
                    <th>#id</th>
                    <th>Course Code</th>
                    <th>Lecturer</th>
                    <th>Halls</th>
                    <th>Time</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>fad23fa78829abc34e</td>
                    <td>CSM256</td>
                    <td>Robert Doe</td>
                    <td>SF1 SF3</td>
                    <td>M-3-5</td>
                </tr>
                </tbody>
            </table>
        </section>
    )
}

export default Sessions