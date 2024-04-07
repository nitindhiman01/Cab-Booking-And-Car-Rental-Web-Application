import React from 'react';
import "../stylesheets/homepage.css";
import "../stylesheets/tabs.css";
import MultipleSelect from "./drawer.js";

function Tab2(){
    return(
        <div className = "tabOne home-booking-form">
            <input name='location-box' placeholder='Enter Location'></input>
            <MultipleSelect />
            <button className="tab1Button" type='submit'>Search Cabs</button>
        </div>
        
    );
}

export default Tab2;

