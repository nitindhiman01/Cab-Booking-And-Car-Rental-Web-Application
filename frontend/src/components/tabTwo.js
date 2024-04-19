import React, { useState } from 'react';
import "../stylesheets/homepage.css";
import "../stylesheets/tabs.css";
import {useNavigate} from 'react-router-dom';
import MultipleSelect from "./drawer.js";

function Tab2(){

    const [location, setLocation] = useState("");
    const [rentPackage, setRentPackage] = useState("");

    const navigate = useNavigate();

    function handleCallBack(data){
        setRentPackage(data);
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log(location);
        console.log(rentPackage);
        navigate("/rental", {state: {location, rentPackage}});
    }

    return(
        <div className = "tabOne home-booking-form">
            <form onSubmit={handleSubmit}>
                <input value={location} onChange={(e) => {setLocation(e.target.value)}} name='location-box' placeholder='Enter Location'></input>
                <MultipleSelect parentCallBack = {handleCallBack} />
                <button className="tab1Button" type='submit'>Search Cabs</button>
            </form>
        </div>
        
    );
}

export default Tab2;

