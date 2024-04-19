import React, { useState } from 'react';
import GoBackButton from './goBackButton';
import "../stylesheets/booking.css";
import CarSelect from './carSelect';
import {useLocation} from 'react-router-dom';
import { socket } from '../socket';

const Booking = (props) => {
    const location = useLocation();

    const [ButtonValue, setButtonValue] = useState("");

    const handleCallBack = (data) => {
        setButtonValue(data);
        console.log(ButtonValue);
    }

    const handleClick = (event) => {
        event.preventDefault();

        props.parentCallBack({
            location_value: location.state.locationValue,
            dest_value: location.state.destinationValue,
            button_value: ButtonValue
        }
        );

        socket.emit('triggerRequest');
    }

  return (
    <div>
        <div className='booking-container'>
            <div className='container'>
                <div className='heading-container'>
                    <GoBackButton />
                    <div className='heading'>
                        <h1>Choose<br /> Your <br /> Ride</h1>
                    </div>
                </div>
                <div className='main-container'>
                    <div className='choice-container'>
                        <CarSelect value='economy' location={location.state.locationValue} destination = {location.state.destinationValue} parentCallBack={handleCallBack} />
                        <div className='horizontal-line'></div>
                        <CarSelect value='Premium' location={location.state.locationValue} destination = {location.state.destinationValue} parentCallBack={handleCallBack} />
                        <div className='horizontal-line'></div>
                        <CarSelect value='Luxury' location={location.state.locationValue} destination = {location.state.destinationValue} parentCallBack={handleCallBack} />
                        <div className='horizontal-line'></div>
                        <CarSelect value='SUV' location={location.state.locationValue} destination = {location.state.destinationValue} parentCallBack={handleCallBack} />
                        <button onClick={handleClick}>Click</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Booking