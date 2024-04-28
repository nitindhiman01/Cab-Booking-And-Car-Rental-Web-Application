import React, { useState } from 'react';
import "../stylesheets/homepage.css";
import "../stylesheets/tabs.css";
import {useNavigate} from 'react-router-dom';
import MultipleSelect from "./drawer.js";
import MainHomePageImg from "../resources/homepage/rental2.jpg";

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
        <div className = "tabOne home-booking-form1 home-rental-form">
            <div className='main-form'>
                <div className='home-main-line'>
                    <h2>Let's Ride...</h2>
                    <p>Enter a location and enjoy your ride with us.</p>
                </div>
                <form className='main-rental-form' onSubmit={handleSubmit}>
                    <input className='location-input-rental' value={location} onChange={(e) => {setLocation(e.target.value)}} name='location-box' placeholder='Enter Location'></input>
                    <MultipleSelect className="select-input" parentCallBack = {handleCallBack} />
                    <button className="tab1Button" type='submit'>Search Cabs</button>
                </form>
            </div>
            <div className='home-img-container'>
                <img src={MainHomePageImg} alt='home-img'></img>
            </div>
        </div>
        
    );
}

export default Tab2;

