import React from 'react';
import {Link} from 'react-router-dom'

const viewBatchHandler=(e)=>{
    const targetFile=e.target.parentNode;
    console.log(targetFile.childNodes[0].textContent);
    window.location.href=`http://localhost:3000/batches/view/${targetFile.childNodes[0].textContent}`

}

function Batches(){
    return(
        <section className={'container mt-5 py-5'}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="http://localhost:3000/">Home</Link></li>
                    <li className="breadcrumb-item active">Batches</li>
                </ol>
            </nav>
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
                <tr onClick={viewBatchHandler}>
                    <td>csbatch1</td>
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