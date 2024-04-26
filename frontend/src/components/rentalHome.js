import React, {useEffect} from 'react';
import MetaData from './layout/MetaData.js';
import RentalCars from './rentalCars.js';
import {useLocation} from 'react-router-dom';
import GoBackButton from './goBackButton';
import { getrentCars } from '../actions/rentActions.js';
import {useSelector, useDispatch} from 'react-redux';
import "../stylesheets/rental.css";
import "../stylesheets/footer.css";

function RentalHome(){

    const dispatch = useDispatch();
    const {loading, error, rentCars} = useSelector(state => state.rentCars);

    useEffect(() => {
        dispatch(getrentCars());
    }, [dispatch]);

    const location = useLocation();

    return(
        <fragment>
            <MetaData title="Rental Cars" />
            <div className='box-container'>
                <div className='rent-heading-container'>
                    <GoBackButton />
                    <h1>Choose <br/> Your <br/> Ride</h1>
                </div>
                <div className= "rent-container" id= "container">
                    {rentCars && rentCars.map((rentCar) => <RentalCars rentalCars = {rentCar} location = {location.state.location} package = {location.state.rentPackage}/> )}
                </div> 
            </div>
        </fragment>
    );
}

export default RentalHome;