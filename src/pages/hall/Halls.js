import React from 'react';

function Halls(){
    return(
        <section className={'container mt-5 py-5'}>
            <table className="table table-bordered" style={{borderRadius:'50px'}} >
                <thead className={'table-dark'}>
                <tr>
                    <th>#id</th>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Type</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>fad23fa78829abc34e</td>
                    <td>SF9</td>
                    <td>400</td>
                    <td>Regular</td>
                </tr>
                </tbody>
            </table>
        </section>
    )
}

export default Halls