import React from 'react';

function AddPair(){
    return(
        <section>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="http://localhost:3000/">Home</a></li>
                    <li className="breadcrumb-item"><a href="http://localhost:3000/pairings">Pairings</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Add</li>
                </ol>
            </nav>

        </section>
    )
}

export default AddPair