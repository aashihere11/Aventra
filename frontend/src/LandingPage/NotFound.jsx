import React from "react";

function NotFound() {
    return (
        <>
        <div className="container text-center rounded p-5 mb-5">
            <img src="media/notfound.png" alt="404 not found" style={{ width: "30%" }} className="notfound-img"/>
             <h1>Sorry this page doesnt exist</h1>
        </div>
       
        </>
    );
}

export default NotFound;