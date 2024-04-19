import React, { useState } from 'react';
import { AddressAutofill } from '@mapbox/search-js-react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import "../stylesheets/homepage.css";
import "../stylesheets/tabs.css";
import Map from './map';


function Tab1(props){
    const [locationValue, setLocationValue] = useState('');
    const [destinationValue, setDestinationValue] = useState('');
    const [coordinates, setCoordinates] = useState([0,0]);
    const [destCoordinates, setDestCoordinates] = useState([0,0]);

    const navigate = useNavigate();

    const handleGeocode = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(locationValue) + '.json', {
                params: {
                    access_token: 'pk.eyJ1Ijoibml0aW5kaGltYW4iLCJhIjoiY2x1NDA3Y2R2MTlwaDJrcXM1NnliNTZ5aSJ9.lGvVeEvnZksL2DCWLSbAug',
                    types: 'address',
                    limit: 1
                }
            });

            const {features} = response.data;
            // console.log(features);
            if(features && features.length > 0){
                const {center} = features[0];
                setCoordinates(center);
            } else {
                console.log("location not found");
            }
        } catch (error){
            console.error('Error Fetching Geocode: ', error);
        }

        console.log(coordinates && coordinates[0]);
        console.log(coordinates && coordinates[1]);


        try{
            const response = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(destinationValue) + '.json', {
                params: {
                    access_token: 'pk.eyJ1Ijoibml0aW5kaGltYW4iLCJhIjoiY2x1NDA3Y2R2MTlwaDJrcXM1NnliNTZ5aSJ9.lGvVeEvnZksL2DCWLSbAug',
                    types: 'address',
                    limit: 1
                }
            });

            const {features} = response.data;
            // console.log(features);
            if(features && features.length > 0){
                const {center} = features[0];
                setDestCoordinates(center);
            } else {
                console.log("location not found");
            }
        } catch (error){
            console.error('Error Fetching Geocode: ', error);
        }
        
    };

    function handleClick(event){
        event.preventDefault();
        
        navigate('/cabBooking',{state: {locationValue, destinationValue, coordinates, destCoordinates}});
    }

    return(
        <div className = "tabOne home-booking-form">
            <div className='home-main-line'>
                <h2>Let's Ride...</h2>
                <p>Enter a location and enjoy your ride with us.</p>
            </div>
            <form className = "tabOne home-booking-form">
                <AddressAutofill options={{country: 'IN'}} accessToken='pk.eyJ1Ijoibml0aW5kaGltYW4iLCJhIjoiY2x1NDA3Y2R2MTlwaDJrcXM1NnliNTZ5aSJ9.lGvVeEvnZksL2DCWLSbAug'>
                    <input className='home-booking-form-input' autoComplete='true' value={locationValue} onChange={(e) => setLocationValue(e.target.value)} name='location-box' placeholder='Enter Location'></input>
                </AddressAutofill>
                <AddressAutofill options={{country: 'IN'}} accessToken='pk.eyJ1Ijoibml0aW5kaGltYW4iLCJhIjoiY2x1NDA3Y2R2MTlwaDJrcXM1NnliNTZ5aSJ9.lGvVeEvnZksL2DCWLSbAug'>
                    <input className='home-booking-form-input' autoComplete='address line-1 address line-2' value={destinationValue} onChange={(e) => setDestinationValue(e.target.value)} name='destination-box' placeholder='Enter Destination'></input>
                </AddressAutofill>
                <div className='button-flex'>
                    <button className="tab1Button" onClick={handleGeocode}>Get Location</button>
                    <button className='tab1Button' type='submit' onClick={handleClick}>Search {props.buttonName} Cabs</button>
                </div>
            </form>
            <Map lati={coordinates[1]} lngi={coordinates[0]} destLati={destCoordinates[1]} destLngi={destCoordinates[0]} />
        </div>
    );
}

export default Tab1;