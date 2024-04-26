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
import Account from "./components/account.js";
import UpdateProfile from "./components/updateAccount.js";
import UpdatePassword from "./components/updatePassword.js";
import ForgotPassword from "./components/forgotPassword.js";
import ResetPassword from "./components/resetPassword.js";
import MyBookings from "./components/myBookings.js";
import DriverDash from "./components/driverDash.js";
import DriverAccountUpdate from "./components/driverAccountUpdate.js";
import DriverPasswordUpdate from "./components/driverPasswordUpdate.js";
import DriverForgotPass from "./components/driverForgotPass.js";
import DriverResetPassword from "./components/driverResetPass.js";


function App(){

  const navigate = useNavigate();
  const [data, setData] = useState({
    location_value: "",
    dest_value: "",
    button_value: ""
  });

  var price = 0;

  const [coordinates, setCoordinates] = useState([78,26]);
  const [destCoordinates, setDestCoordinates] = useState([81,28]);

  const handleCallBack = (Data) => {
    setData({
      location_value: Data.location_value,
      dest_value: Data.dest_value,
      button_Value: Data.button_value,
      dist: Data.distance,
    });
  }

  const priceCall = (data) => {
    price = data;
  }

  // useEffect(() => {
  //   console.log(data);
  // }, [data])

  function handleConfirm(){
    if(window.confirm(`A nearby user is requesting a ride.`)){
      navigate("/userRequest", {state: {coordinates, destCoordinates, price}});
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
            <Route path='/cabBooking' element={<Booking parentCallBack={handleCallBack} priceCallBack={priceCall} />}></Route>
            <Route path ='/login' element={<LoginSignup />}></Route>
            <Route path ='/driver/login' element={<DriverLoginSignup />}></Route>
            <Route path ='/userRequest' element={<UserRequest />}></Route>
            <Route path='/account' element={<Account />}></Route>
            <Route path='/account/update' element={<UpdateProfile />}></Route>
            <Route path="/password/update" element={<UpdatePassword />}></Route>
            <Route path="/password/forgot" element={<ForgotPassword />}></Route>
            <Route path="/password/reset/:token" element={<ResetPassword />}></Route>
            <Route path="/account/mybookings" element={<MyBookings />}></Route>
            <Route path="/driver/dashboard" element={<DriverDash />}></Route>
            <Route path="/driver/account/update" element={<DriverAccountUpdate />}></Route>
            <Route path="/driver/password/update" element={<DriverPasswordUpdate />}></Route>
            <Route path="/driver/password/forgot" element={<DriverForgotPass />}></Route>
            <Route path="/driver/password/reset/:token" element={<DriverResetPassword />}></Route>
          </Routes>
      </div>
  );
}

export default App;

