import React from 'react';

const viewPairHandler=(e)=>{
    const targetFile=e.target.parentNode;
    console.log(targetFile.childNodes[0].textContent);
    window.location.href = `http://localhost:3000/pairings/view/${targetFile.childNodes[0].textContent}`

}


function Pairings(){
    return(
        <section className={'container mt-5 py-5'}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="http://localhost:3000/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Pairings</li>
                </ol>
            </nav>
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
                <tr onClick={viewPairHandler}>
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