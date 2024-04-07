import React from "react";
// import "./stylesheets/index.css";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import IndexHomePage from './components/index-homepage.js';
import RentalHome from './components/rentalHome.js';


function App(){
  return(
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<IndexHomePage  />}></Route>"
            <Route path='/rental' element={<RentalHome />}></Route>
          </Routes>
        </BrowserRouter>
      </div>

  );
}

export default App;
