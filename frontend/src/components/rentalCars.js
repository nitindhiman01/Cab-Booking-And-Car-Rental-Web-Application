import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import "../stylesheets/rental.css"

const options= {
    edit:"false",
    color: "rgba(20, 20, 20, 0.1)",
    activeColor:"tomato",
    value: 4.5,
    isHalf: true

}

const RentalCars = ({ rentalCars }) => {
    return(
        <Link className= "RentalCarCard" to={rentalCars._id}>
            <img src= {rentalCars.images[0].url} alt={rentalCars.name} />
            <p>{rentalCars.name}</p>
            <div>
                <ReactStars {...options} /> <span> (256 reviews) </span>
            </div>
            <span>{rentalCars.price}</span>
        </Link>
        

    );
}

export default RentalCars;


