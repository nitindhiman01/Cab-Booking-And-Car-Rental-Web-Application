import React from 'react';
import {useNavigate} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../stylesheets/index.css";

const GoBackButton = () => {
  const navigate = useNavigate();
  return (
    <div>
        <div className='backward_button'>
            <button className='back-button' onClick={() => navigate(-1)} ><ArrowBackIcon /></button>
        </div>
    </div>
  )
}

export default GoBackButton;