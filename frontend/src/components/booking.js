import React from 'react';
import GoBackButton from './goBackButton';
import "../stylesheets/booking.css";
import CarSelect from './carSelect';
import {useLocation} from 'react-router-dom';

const Booking = () => {
    const location = useLocation();

    function handleClick(e){
        e.preventDefault();
        console.log(location.state.locationValue);
        console.log(location.state.destinationValue);
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
                        <CarSelect value='economy' />
                        <div className='horizontal-line'></div>
                        <CarSelect value='Premium' />
                        <div className='horizontal-line'></div>
                        <CarSelect value='Luxury' />
                        <div className='horizontal-line'></div>
                        <CarSelect value='SUV' />
                    </div>
                    <button onClick={handleClick}>Click</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Booking