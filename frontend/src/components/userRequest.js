import React, {useEffect, useState} from 'react';
import Map from './map';
import {useLocation} from 'react-router-dom';
import { socket } from '../socket';
import "../stylesheets/userRequest.css";
import GooglePayButton from '@google-pay/button-react';
import {useAlert} from 'react-alert';

const UserRequest = () => {

    const [coordinates, setCoordinates] = useState([78,26]);
    const [destCoordinates, setDestCoordinates] = useState([81,28]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [socketid, setSocketid] = useState([]);
    const alert = useAlert();

    const location = useLocation();

    function handleSubmit(event){
        event.preventDefault();
        const id = socket.id;
        socket.emit("message", {id,message});
        setMessage("");
    }

    useEffect(() => {
        socket.on("recieve-message", (data) => {
            setSocketid([...socketid, data.id]);
            setMessages([...messages, data.message]);
        })
    });

    return (
        <div className='user-request'>
            {/* <Map lati={location.state.coordinates[1]} lngi={location.state.coordinates[0]} destLati={location.state.destCoordinates[1]} destLngi={location.state.destCoordinates[0]} /> */}
            <div className='map-container'>
                <Map lati={coordinates[1]} lngi={coordinates[0]} destLati={destCoordinates[1]} destLngi={destCoordinates[0]} />
            </div>
            <div className='function-container'>
              <h4>Chat with driver</h4>
                <div className='chat-box'>
                    <div className='message-container'>
                        {messages.map((m,i) => (
                            <div>
                                <p style={{fontSize: "8px"}}>{socketid[i]}</p>
                                <h5 key={i}>{m}</h5>
                            </div>
                        ))}
                    </div>
                    <div className='text-message'>
                        <form onSubmit={handleSubmit}>
                            <input className='message-input' value={message} onChange={(e) => {setMessage(e.target.value)}} placeholder='Enter Message'></input>
                            <button className='message-send' type='submit'>Send</button>
                        </form>
                    </div>
                </div>
                <div className='buttons'>
                    <div className='end-button'>
                    <GooglePayButton
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
                        totalPrice: `600`,
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
                    alert.success("Payment Received. Ride Completed!");   
                    return { transactionState: 'SUCCESS'}
                    }}
                    existingPaymentMethodRequired='false'
                    buttonColor="black"
                    buttonType="buy"
                ></GooglePayButton>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default UserRequest