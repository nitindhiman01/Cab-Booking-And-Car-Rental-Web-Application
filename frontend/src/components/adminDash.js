import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "../stylesheets/index.css";



const AdminDash = () => {

    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    function handleAllBookings(e){
        e.preventDefault();
        navigate("/admin/allbookings");
    }

    function handleAllUsers(e){
        e.preventDefault();
        navigate("/admin/allusers");
    }

    function handleAllDrivers(e){
        e.preventDefault();
        navigate('/admin/alldrivers');
    }

    function handleRentCars(e){
        e.preventDefault();
        navigate('/admin/allcars');
    }
  return (
    <div>
        { user.role === "admin" ? (
            <div className='admin-dash'>

                <div className='buttons'>

                    <button onClick={handleAllBookings}>All Bookings</button>
                    <button onClick={handleAllUsers}>Users</button>
                    <button onClick={handleAllDrivers}>Drivers</button>
                    <button onClick={handleRentCars}>Cars</button>
                </div>

            </div>
            ) : (<p>You are not an admin</p>) }
    </div>
    
  )
}

export default AdminDash