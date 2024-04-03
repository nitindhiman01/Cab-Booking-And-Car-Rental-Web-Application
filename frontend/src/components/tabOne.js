import React from 'react';
import "../stylesheets/homepage.css";
import "../stylesheets/tabs.css";


function Tab1(){
    return(
        <div className = "tabOne home-booking-form">
            <input name='location-box' placeholder='Enter Location'></input>
            <input name='destination-box' placeholder='Enter Destination'></input>
            <button className="tab1Button" type='submit'>Search Cabs</button>
        </div>
        
    );
}

export default Tab1;