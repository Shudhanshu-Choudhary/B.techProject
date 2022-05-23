import React from "react";
import image from "../assets/img/page404.png";
import "../assets/scss/pages/page404.scss"

function Page404() {
    return ( 
        <div className="page-not-found-container">
            <div className="content">
                {image}
            </div>
        </div>
     );
}

export default Page404;