import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DriverLoginSignup from './User/driverLoginSignUp';
import ResponsiveAppBar from './navbar';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';
import { driverlogout } from '../actions/driverActions';
import { useAlert } from 'react-alert';
import "../stylesheets/account.css";

const DriverDash = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, loading, isAuthenticated, driver } = useSelector((state) => state.driver);

    function handleEdit(e){
      e.preventDefault();
      navigate("/driver/account/update");
    }

    function handlePass(e){
      e.preventDefault();
      navigate("/driver/password/update");
    }

    function handleLogout(e){
      e.preventDefault();
      dispatch(driverlogout());
      alert.success("Log Out Successfully!");
    }

  return (
    <div>
        {isAuthenticated ? (
            <div>
            <ResponsiveAppBar />

              <div className='account-main-container'>
                  <div className='img-box' style={{height: "75%"}}>
                      <img src={driver.avatar.url ? driver.avatar.url : "/profile.png"} alt='profile-pic'></img>
                      <button className='editButton account-button' onClick={handleEdit}>Edit Profile</button>
                      <button className='account-button details-button' onClick={handlePass}>Change Password</button>
                      <button className='account-button details-button' onClick={handleLogout}>LogOut</button>
                  </div>
                  <div className='driver-details'>
                      <div className='name-box'>
                          <h4>Name: </h4>
                          <p>{driver.name}</p>
                      </div>
                      <div className='email-box'>
                          <h4>E-mail: </h4>
                          <p>{driver.email}</p>
                      </div>
                      <div className='email-box'>
                          <h4>Registered Car Name: </h4>
                          <p>{driver.carName}</p>
                      </div>
                      <div className='email-box'>
                          <h4>Car Registration No. : </h4>
                          <p>{driver.plate_no}</p>
                      </div>
                      <div className='email-box'>
                          <h4>Car Category: </h4>
                          <p>{driver.car_category}</p>
                      </div>
                         
                  </div>
              </div>

              <Footer />

            </div>
        ) : <DriverLoginSignup />}
    </div>
  )
}

export default DriverDash