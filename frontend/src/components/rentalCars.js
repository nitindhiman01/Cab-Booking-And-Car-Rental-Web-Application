import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import PersonIcon from '@mui/icons-material/Person';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import {useSelector, useDispatch} from 'react-redux';
import "../stylesheets/rental.css"
import { bookRentCar } from '../actions/rentActions';
import GooglePayButton from '@google-pay/button-react';
import {useAlert} from 'react-alert';

const RentalCars = (props) => {

    const [car, setCar] = useState("");
    const [userid, setUserid] = useState("");
    const alert = useAlert();
    const dispatch = useDispatch();
    const {error, loading, bookCar} = useSelector(state => state.bookCar);
    // const { error, loading, isAuthenticated } = useSelector((state) => state.user);
    const {user} = useSelector((state) => state.user);

    var price =0;
    

    const options= {
        edit: false,
        color: "rgba(20, 20, 20, 0.1)",
        activeColor:"tomato",
        value: props.rentalCars.rating,
        isHalf: true 
    }

    
    if(props.package === '4 Hours 200 Km'){
        const temp_price = props.rentalCars.price * 4;
        price = temp_price;
    } else if(props.package === '2 Hours 100 Km'){
        const temp_price = props.rentalCars.price * 2;
        price = temp_price;
    } else if(props.package === '8 Hours 300 Km'){
        const temp_price = props.rentalCars.price * 8;
        price = temp_price;
    }

    function handleClick(event){
        event.preventDefault();
        setCar(event.target.value);
        setUserid(user._id);
        console.log(car);
        console.log(props.location);
        console.log(props.package);

        const myCarData = new FormData();

        myCarData.set("location", props.location);
        myCarData.set("package", props.package);
        myCarData.set("car", car);
        myCarData.set("user", userid);

        dispatch(bookRentCar(myCarData));

    }

    return(
        <div className= "RentalCarCard">
            <div className='car-img'>
                <img src= {props.rentalCars.images[0].url} alt={props.rentalCars.name} />
            </div>
            <div className='car-details'>
                <p className='car-name'>{props.rentalCars.name} <span className='model'>{props.rentalCars.model}</span></p>
                <div className='ratings'>
                    <ReactStars {...options} />
                </div>
                <div className='detail'>
                    <p className='transmission'><DragIndicatorIcon />{props.rentalCars.transmission}</p>
                    <p className='fuel'><LocalGasStationIcon />{props.rentalCars.fueltype}</p>
                    <p className='person'><PersonIcon />{`${props.rentalCars.occupancy} Seater`}</p>
                </div>
            </div>
            <div className='cab-price'>
                <p>{`Rs. ${props.rentalCars.price}`}<span className='sub-price'>/hour</span></p>
            </div>
            <div className='cab-book-button'>
                <button value={props.rentalCars._id} onClick={handleClick}>Book Now</button>
                <GooglePayButton
                    style={{width: "100%", marginTop: "2px"}}
                    environment="TEST"
                    paymentRequest={{
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [
                        {
                        type: "CARD",
                        parameters: {
                            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                            allowedCardNetworks: ["MASTERCARD", "VISA"],
                        },
                        tokenizationSpecification: {
                            type: "PAYMENT_GATEWAY",
                            parameters: {
                            gateway: "example",
                            gatewayMerchantId: "exampleGatewayMerchantId",
                            },
                        },
                        },
                    ],
                    merchantInfo: {
                        merchantId: "12345678901234567890",
                        merchantName: "Demo Merchant",
                    },
                    transactionInfo: {
                        totalPriceStatus: "FINAL",
                        totalPriceLabel: "Total",
                        totalPrice: `${price}`,
                        currencyCode: "INR",
                        countryCode: "IN",
                    },
                    shippingAddressRequired: true,
                    callbackIntents: ["PAYMENT_AUTHORIZATION"],
                    }}
                    onLoadPaymentData={(paymentRequest) => {
                    console.log(paymentRequest);
                    }}
                    onPaymentAuthorized={paymentData =>{
                    console.log('paymentData ' + paymentData);
                    alert.success("Payment Received. Car Booked!");   
                    return { transactionState: 'SUCCESS'}
                    }}
                    existingPaymentMethodRequired='false'
                    buttonColor="black"
                    buttonType="pay"
                    buttonSizeMode='fill'
                ></GooglePayButton>
            </div>
        </div>
    );
}

export default RentalCars;


