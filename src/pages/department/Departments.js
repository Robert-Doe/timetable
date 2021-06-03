import React from 'react';

const viewDepartmentHandler=(e)=>{
    const targetFile=e.target.parentNode;
    console.log(targetFile.childNodes[0].textContent);
    window.location.href=`http://localhost:3000/departments/${targetFile.childNodes[0].textContent}`

}

function Departments(){
    return(
        <section className={'container mt-5 py-5'}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="http://localhost:3000/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Departments</li>
                </ol>
            </nav>
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
                <tr onClick={viewDepartmentHandler}>
                    <td>fad23fa78829abc34e</td>
                    <td>Computer Science</td>
                    <td>Software and Programming</td>
                    <td>CS</td>
                </tr> <tr onClick={viewDepartmentHandler}>
                    <td>f98897987999abc34e</td>
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