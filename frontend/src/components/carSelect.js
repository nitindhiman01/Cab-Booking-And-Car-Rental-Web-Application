import React from 'react';
import economy from "../resources/booking/economy.png";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import "../stylesheets/booking.css";

const CarSelect = (props) => {
  
    function handleClick(event){
        event.preventDefault();
        console.log(event.currentTarget.value);
    }

  return (
    <div className='selection-container'>
        <div className='car-img-container'>
            <img src={economy} alt='car-icon'></img>
        </div>
        <div className='main-info-container'>
            <div className='info-price'>
                <div className='info'>
                    <h4>CarBuddy Economy</h4>
                    <p>30 min away, 25kms</p>
                    <p>Affordable, compact rides</p>
                </div>
                <div className='price'>
                    <p>Rs 99.81</p>
                </div>
            </div>
            <div className='book-button'>
                <button value={props.value} onClick={handleClick}><ChevronRightIcon /></button>
            </div>
        </div>
    </div>
  )
}

export default CarSelect