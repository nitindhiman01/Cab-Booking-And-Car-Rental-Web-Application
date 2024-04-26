import React, {useEffect, useState} from 'react';
import ErrorLog from './errorLog';
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from "@mui/icons-material/Face";
import {useDispatch, useSelector} from "react-redux";
import { clearErrors, updateDriverProfile } from '../actions/driverActions'; 
import { useAlert } from "react-alert";
import { UPDATE_DRIVER_PROFILE_RESET } from '../constants/userConstants';
import "../stylesheets/updateUser.css";

const DriverAccountUpdate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const {isAuthenticated, driver} = useSelector((state) => state.driver);
    const {error, isUpdated, loading} = useSelector((state) => state.driverProfile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const driverid = driver._id;

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("driverid", driverid);

        dispatch(updateDriverProfile(myForm));
        
    }

    useEffect(() => {

        if(driver){
            setName(driver.name);
            setEmail(driver.email);
        }

        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isUpdated){
            alert.success("Profile Updated Successfully");
            navigate('/driver/dashboard');

            dispatch({
                type: UPDATE_DRIVER_PROFILE_RESET,
            });
        }
 
    }, [isUpdated, dispatch, error, alert, driver, navigate]);

  return (
    <div>
        {isAuthenticated ? (
            <div className = "updateSignUp">
                <div className = "updateUserBox">
                    <h2>Update Profile</h2>

                    <form className='updateUserForm' encType='multipart/form-data' onSubmit={updateProfileSubmit}>
                        <div className='updateName'>
                            <FaceIcon />
                            <input 
                                type="text"
                                placeholder='Name'
                                required
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='updateEmail'>
                            <MailOutlineIcon />
                            <input 
                                type = "email"
                                placeholder = "Email"
                                required
                                name='email'
                                value = {email}
                                onChange = {(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <input 
                            type='submit'
                            value="Update"
                            className='updateButton'
                            disabled={loading ? true : false}
                        />
                        
                    </form>
                </div>
            </div>
            ) : <ErrorLog />}
    </div>
  );
}

export default DriverAccountUpdate