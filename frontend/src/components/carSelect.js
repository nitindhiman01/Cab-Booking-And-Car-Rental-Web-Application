import React from 'react';
import economy from "../resources/booking/economy.png";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import "../stylesheets/booking.css";

const CarSelect = (props) => {

    var price = 0;

    if(props.value === "economy"){
        price = Math.round((props.distance * 5) * 100)/100;
    } else if(props.value === "Premium") {
        price = Math.round((props.distance * 6) * 100)/100;
    } else if(props.value === "Luxury") {
        price = Math.round((props.distance * 7) * 100)/100;
    } else if(props.value === "SUV") {
        price = Math.round((props.distance * 9) * 100)/100;
    } 
  
    function handleClick(event){
        event.preventDefault();
        console.log(event.currentTarget.value);
        console.log(props.location);
        console.log(props.destination);

        props.parentCallBack(
            event.currentTarget.value
        );

        props.distanceCallBack(
            price
        )
    }
    
  return (
    <div className='selection-container'>
        <div className='car-img-container'>
            <img src={economy} alt='car-icon'></img>
        </div>
        <div className='main-info-container'>
            <div className='info-price'>
                <div className='info'>
                    <h4>CarBuddy {props.value}</h4>
                    <p>30 min, {props.distance} Kms</p>
                    <p>Affordable, compact rides</p>
                </div>
                <div className='price'>
                    <p>Rs. {price}</p>
                </div>
            </div>
            <div className='book-button'>
                <button value={props.value} onClick={handleClick}><ChevronRightIcon /></button>
            </div>
        </div>
    </div>
  )
}

export default CarSelect;