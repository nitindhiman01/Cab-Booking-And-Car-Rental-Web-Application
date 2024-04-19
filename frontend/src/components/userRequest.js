import React, {useEffect, useState} from 'react';
import Map from './map';
import {useLocation} from 'react-router-dom';
import { socket } from '../socket';
import "../stylesheets/userRequest.css";

const UserRequest = () => {

    const [coordinates, setCoordinates] = useState([78,26]);
    const [destCoordinates, setDestCoordinates] = useState([81,28]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [socketid, setSocketid] = useState([]);

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
    })

    return (
        <div className='user-request'>
            {/* <Map lati={location.state.coordinates[1]} lngi={location.state.coordinates[0]} destLati={location.state.destCoordinates[1]} destLngi={location.state.destCoordinates[0]} /> */}
            <div className='map-container'>
                <Map lati={coordinates[1]} lngi={coordinates[0]} destLati={destCoordinates[1]} destLngi={destCoordinates[0]} />
            </div>
            <div className='function-container'>
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
                            <input value={message} onChange={(e) => {setMessage(e.target.value)}} placeholder='Enter Message'></input>
                            <button type='submit'>Send</button>
                        </form>
                    </div>
                </div>
                <div className='buttons'>
                    <div className='end-button'>
                        <button className='payment-button'>Complete Payment</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default UserRequest