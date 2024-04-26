import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { clearErrors, driverforgotPassword } from '../actions/driverActions'; 
import { useAlert } from "react-alert";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import "../stylesheets/updateUser.css"

const DriverForgotPass = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {error, loading, message} = useSelector((state) => state.driverforgotPassword);

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("email", email);
        dispatch(driverforgotPassword(myForm));
    };

    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (message) {
          alert.success(message);
        }
    }, [dispatch, error, alert, message]);

  return (
    <div>
        <div className = "updateSignUp">
            <div className = "updateUserBox">
                <h2>Forgot Password</h2>

                <form className='updateUserForm' encType='multipart/form-data' onSubmit={forgotPasswordSubmit}>
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
    </div>
  )
}

export default DriverForgotPass