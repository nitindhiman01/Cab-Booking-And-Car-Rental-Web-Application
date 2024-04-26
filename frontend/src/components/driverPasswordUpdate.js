import React, {useState, useEffect} from 'react';
import "../stylesheets/updatePassword.css";
import {useDispatch, useSelector} from 'react-redux';
import { clearErrors, updateDriverPassword } from '../actions/driverActions';
import { useAlert } from 'react-alert';
import {useNavigate} from 'react-router-dom';
import { UPDATE_DRIVER_PASSWORD_RESET } from '../constants/userConstants';
import ErrorLog from './errorLog';
import MetaData from './layout/MetaData';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';

const DriverPasswordUpdate = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();

    const {isAuthenticated, driver} = useSelector((state) => state.driver);
    const {error, isUpdated, loading} = useSelector((state) => state.driverProfile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const driverid = driver._id;

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        myForm.set("driverid", driverid);
    
        dispatch(updateDriverPassword(myForm));
      };
    
      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (isUpdated) {
          alert.success("Profile Updated Successfully");
    
          navigate("/driver/dashboard");
    
          dispatch({
            type: UPDATE_DRIVER_PASSWORD_RESET,
          });
        }
      }, [dispatch, isUpdated, error, alert, navigate]);

  return (
    <div>
        {isAuthenticated ? (
            <div>
            <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
          </div>
            
        ) : <ErrorLog />}
    </div>
  );
}

export default DriverPasswordUpdate