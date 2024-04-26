import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { clearErrors, forgotPassword } from '../actions/userActions'; 
import { useAlert } from "react-alert";
import ErrorLog from './errorLog';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import "../stylesheets/updateUser.css"

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {isAuthenticated, user} = useSelector((state) => state.user);
    const {error, loading, message} = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
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

export default ForgotPassword