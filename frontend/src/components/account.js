import React from 'react';
import {useSelector} from 'react-redux';
import ResponsiveAppBar from './navbar';
import Footer from './footer';
import "../stylesheets/account.css";
import ErrorLog from './errorLog';
import {useNavigate} from "react-router-dom";

const Account = () => {

    const {isAuthenticated, user} = useSelector((state) => state.user);
    const navigate = useNavigate();

    function handleEdit(e){
        e.preventDefault();
        navigate("/account/update");
    }

    function handleBookings(e){
        e.preventDefault();
        navigate("/account/mybookings");
    }

    function handlePass(e){
        e.preventDefault();
        navigate("/password/update");
    }

  return (
    <div>
    {isAuthenticated ? (<div>
        <ResponsiveAppBar />

        <div className='account-main-container'>
            <div className='img-box'>
                <img src={user.avatar.url ? user.avatar.url : "/profile.png"} alt='profile-pic'></img>
                <button className='editButton account-button' onClick={handleEdit}>Edit Profile</button>
            </div>
            <div className='user-details'>
                <div className='name-box'>
                    <h4>Name: </h4>
                    <p>{user.name}</p>
                </div>
                <div className='email-box'>
                    <h4>E-mail: </h4>
                    <p>{user.email}</p>
                </div>
                <div className='button'>
                    <button className='account-button details-button' onClick={handleBookings}>My Bookings</button>
                    <button className='account-button details-button' onClick={handlePass}>Change Password</button>
                </div>    
            </div>
        </div>

        <Footer />
    </div>) : <ErrorLog />}
    </div>
  )
}

export default Account