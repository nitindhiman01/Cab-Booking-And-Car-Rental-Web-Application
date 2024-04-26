import React, {useState, useEffect} from 'react';
import "../stylesheets/updatePassword.css";
import {useDispatch, useSelector} from 'react-redux';
import { clearErrors, driverResetPassword } from '../actions/driverActions';
import { useAlert } from 'react-alert';
import {useNavigate, useParams} from 'react-router-dom';
import MetaData from './layout/MetaData';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import "../stylesheets/updatePassword.css"

const ResetPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const params = useParams();

    const { error, success, loading } = useSelector(
        (state) => state.driverforgotPassword
    );

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(driverResetPassword(params.token, myForm));
    };

    useEffect(() => {
        if (error) {
        alert.error(error);
        dispatch(clearErrors());
        }

        if (success) {
        alert.success("Password Updated Successfully");

        navigate("/driver/login");
        }
    }, [dispatch, error, alert, success, navigate]);

  return (
    <div>
        <MetaData title="Reset Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>

              <form
                className="updatePasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  value="Update"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
          </div>
  )
}

export default ResetPassword