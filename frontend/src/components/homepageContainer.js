import React from 'react';
import Homepage2img from "../resources/homepage/home-img-2.jpg"; 
import "../stylesheets/homepage.css";
import "../stylesheets/tabs.css"; 

function HomepageContainer(){
    return(
        <div className= "homepage-container">
            <div className= "home-img2">
                <img src={Homepage2img} alt='home-img2'></img>
            </div>
        </div>
    );
}

export default HomepageContainer;
