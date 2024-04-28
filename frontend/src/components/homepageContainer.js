import React from 'react';
import Homepage2img from "../resources/homepage/cab.jpg"; 
import Homepage3img from "../resources/homepage/cab2.jpg"; 
import "../stylesheets/homepage.css";
import "../stylesheets/tabs.css"; 

function HomepageContainer(){
    return(
        <div>
        <div className= "homepage-container">
            <div className= "home-img2">
                <img src={Homepage2img} alt='home-img2'></img>
                <div className='container-detail'>
                    <h2>Anytime, Anywhere</h2>
                    <h3>CarBuddy is for you...</h3>
                    <p>Book ride for anywhere at any time.</p>
                </div>
            </div>
        </div>
        <div className='homepage-container2'>
            <div className= "home-img2">
                <div className='container-detail container-detail-imp'>
                    <h2>Rent the car</h2>
                    <h3>you love</h3>
                    <p>Book any car and take it wherever you want without any hassle.</p>
                </div>
                <img src={Homepage3img} alt='home-img2'></img>
            </div>
        </div>
        </div>
    );
}

export default HomepageContainer;
