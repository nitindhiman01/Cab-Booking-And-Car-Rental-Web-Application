import React from 'react'
import ErrorIcon from '@mui/icons-material/Error';
import "../stylesheets/error.css";
import {useNavigate} from 'react-router-dom';

const ErrorLog = () => {

  const navigate = useNavigate();

  function loginButton(e){
    e.preventDefault();
    navigate('/login');
  }

  return (
    <div className='error-container'>
        <div className='error-main'>
            <ErrorIcon sx={{height: "60px", width: "60px"}} />
            <p>Access Denied!</p>
            <p>You are not logged in.</p>
        </div>
        <button onClick={loginButton}>Log In</button>
    </div>
  )
}

export default ErrorLog;