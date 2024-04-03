import React from 'react';
import MainHomePageImg from "../resources/homepage/home-img-1.jpg";
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import NearMeIcon from '@mui/icons-material/NearMe';
// import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import "../stylesheets/homepage.css";
import BasicTabs from './homepageTabs';

function Homepage(){
    return(
        <div className='homepage'>
            <div className='tabs'></div>
            <div className='home-main'>
                <div className='home-ride-form'>
                    <div className='tabs'>
                        <BasicTabs />
                    </div>
                    <div className='home-main-line'>
                        <h2>Let's Ride...</h2>
                        <p>Enter a location and enjoy your ride with us.</p>
                    </div>
                    <div className='home-booking-form'>
                        <input name='location-box' placeholder='Enter Location'></input>
                        <input name='destination-box' placeholder='Enter Destination'></input>
                    </div>
                </div>
                <div className='home-img-container'>
                    <img src={MainHomePageImg} alt='home-img'></img>
                </div>
            </div>
        </div>
    );
}

export default Homepage;