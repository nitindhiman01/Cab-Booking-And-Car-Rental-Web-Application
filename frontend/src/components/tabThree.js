import React from 'react';
import "../stylesheets/homepage.css";
import "../stylesheets/tabs.css";

function Tab3(){
    return(
        <div className = "tabOne home-booking-form">
            <input name='location-box' placeholder='Enter Location'></input>
            <input name='destination-box' placeholder='Destination'></input>
            <button className="tab1Button" type='submit'>Search Cabs</button>
        </div>
        
    );
}

export default Tab3;