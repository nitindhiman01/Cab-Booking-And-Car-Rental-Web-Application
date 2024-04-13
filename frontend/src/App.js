import React, { useEffect } from "react";
// import "./stylesheets/index.css";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import IndexHomePage from './components/index-homepage.js';
import RentalHome from './components/rentalHome.js';
import Booking from "./components/booking.js";
import {io} from "socket.io-client";
import LoginSignup from './components/User/loginSignup.js';


function App(){

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("connected!", socket.id);
    });

    socket.on("welcome", (data) => {
      console.log(data);
    });
    
  }, []);

  return(
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<IndexHomePage  />}></Route>"
            <Route path='/rental' element={<RentalHome />}></Route>
            <Route path='/cabBooking' element={<Booking />}></Route>
            <Route path ='/login' element={<LoginSignup />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
