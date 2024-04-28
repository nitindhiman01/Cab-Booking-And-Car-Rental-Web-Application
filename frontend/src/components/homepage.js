import React from 'react';
import MainHomePageImg from "../resources/homepage/home-img-1.jpg";
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import NearMeIcon from '@mui/icons-material/NearMe';
// import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import "../stylesheets/homepage.css";
import BasicTabs from './homepageTabs';
import HomepageContainer from './homepageContainer.js'

function Homepage(){
    return(
        <div className='homepage'>
            <div className='tabs'></div>
            <div className='home-main'>
                <div className='home-ride-form'>
                    <div className='tabs'>
                        <BasicTabs />
                    </div>
                    {/* <div className='home-main-line'>
                        <h2>Let's Ride...</h2>
                        <p>Enter a location and enjoy your ride with us.</p>
                    </div> */}
                </div>
                {/* <div className='home-img-container'>
                    <img src={MainHomePageImg} alt='home-img'></img>
                </div> */}
            </div>
            <HomepageContainer />
        </div>
    );
}

export default Homepage;