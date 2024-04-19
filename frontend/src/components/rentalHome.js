import React from 'react';
import MetaData from './layout/MetaData.js';
import RentalCars from './rentalCars.js';
import {useLocation} from 'react-router-dom';
import ResponsiveAppBar from './navbar.js';
import Footer from './footer.js';
import "../stylesheets/rental.css";
import "../stylesheets/footer.css";



const rentalCars= {
    name: "Range Rover",
    _id: "aastha",
    // model: 2024,
    // category: "luxury SUV",
    // transmission: "manual",
    price: 5000,
    images:[{url: "https://wallpaperaccess.com/full/2103829.jpg"}],
    // fueltype: "petrol",
    // occupancy: 5,
    // plate_number: "HR 26 jmd",
    // num_trips: 10,
    // reviews: "5+ stars"
};

function RentalHome(){

    const location = useLocation();

    function handleClick(e){
        e.preventDefault();

        console.log(location.state.location);
        console.log(location.state.rentPackage);
    
    }

    return(
        <fragment>
            <MetaData title="Rental Cars" />
            <ResponsiveAppBar />
            <div className= "container" id= "container">
                 <RentalCars rentalCars ={rentalCars} />
                 <RentalCars rentalCars ={rentalCars} />
                 <RentalCars rentalCars ={rentalCars} />
                 <RentalCars rentalCars ={rentalCars} />
                 <button onClick={handleClick}>click</button>
            </div>
            <Footer />
        </fragment>
    );
}

export default RentalHome;