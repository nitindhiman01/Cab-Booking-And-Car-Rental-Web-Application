import React, { useEffect, useState } from "react";
// import "./stylesheets/index.css";
import { Routes, Route } from 'react-router-dom';
import IndexHomePage from './components/index-homepage.js';
import RentalHome from './components/rentalHome.js';
import Booking from "./components/booking.js";
import {useNavigate} from 'react-router-dom';
import { socket } from "./socket.js";
import LoginSignup from './components/User/loginSignup.js';
import DriverLoginSignup from "./components/User/driverLoginSignUp.js";
import UserRequest from "./components/userRequest.js";


function App(){

  const navigate = useNavigate();
  const [data, setData] = useState({
    location_value: "",
    dest_value: "",
    button_value: ""
  });

  const [coordinates, setCoordinates] = useState([78,26]);
  const [destCoordinates, setDestCoordinates] = useState([81,28]);

  const handleCallBack = (Data) => {
    setData({
      location_value: Data.location_value,
      dest_value: Data.dest_value,
      button_Value: Data.button_value
    });
  }

  // useEffect(() => {
  //   console.log(data);
  // }, [data])

  function handleConfirm(){
    if(window.confirm(`A nearby user is requesting a ride.`)){
      navigate("/userRequest", {state: {coordinates, destCoordinates}});
    } else {
      console.log("no");
    }
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected!", socket.id);
    });

    socket.on("welcome", (data) => {
      console.log(data);
    });

    socket.on("requestTriggered", () => {
      console.log("function triggered");

      handleConfirm();
      
    });

    return () => {
      socket.disconnect();
    };
    
  }, [socket]);

  return(
      <div>
          <Routes>
            <Route path="/" index element={<IndexHomePage  />}></Route>"
            <Route path='/rental' element={<RentalHome />}></Route>
            <Route path='/cabBooking' element={<Booking parentCallBack={handleCallBack} />}></Route>
            <Route path ='/login' element={<LoginSignup />}></Route>
            <Route path ='/driver/login' element={<DriverLoginSignup />}></Route>
            <Route path ='/userRequest' element={<UserRequest />}></Route>
          </Routes>
      </div>
  );
}

export default App;

