import React from 'react';
import "../stylesheets/homepage.css";
import "../stylesheets/tabs.css";


function Tab1(props){
    return(
        <div className = "tabOne home-booking-form">
            <div className='home-main-line'>
                <h2>Let's Ride...</h2>
                <p>Enter a location and enjoy your ride with us.</p>
            </div>
            <input name='location-box' placeholder='Enter Location'></input>
            <input name='destination-box' placeholder='Enter Destination'></input>
            <button className="tab1Button" type='submit'>Search {props.buttonName} Cars</button>
        </div>
        
    );
}

export default Tab1;