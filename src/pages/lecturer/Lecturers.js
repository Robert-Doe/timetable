import React from 'react';

const viewLecturerHandler=(e)=>{
    const targetFile=e.target.parentNode;
    console.log(targetFile.childNodes[0].textContent);
    window.location.href=`http://localhost:3000/lecturers/${targetFile.childNodes[0].textContent}`

}


function Lecturers(){
    return(
        <section className={'container mt-5 py-5'}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="http://localhost:3000/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Lecturers</li>
                </ol>
            </nav>
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
                    <td onClick={viewLecturerHandler}>fad23fa78829abc34e</td>
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