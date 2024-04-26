import { 
    DRIVER_LOGIN_FAIL, 
    DRIVER_LOGIN_REQUEST, 
    DRIVER_LOGIN_SUCCESS, 
    CLEAR_ERRORS, 
    REGISTER_DRIVER_REQUEST, 
    REGISTER_DRIVER_SUCCESS, 
    REGISTER_DRIVER_FAIL, 
    UPDATE_DRIVER_PROFILE_REQUEST,
    UPDATE_DRIVER_PROFILE_FAIL,
    UPDATE_DRIVER_PROFILE_SUCCESS,
    UPDATE_DRIVER_PASSWORD_SUCCESS,
    UPDATE_DRIVER_PASSWORD_FAIL,
    UPDATE_DRIVER_PASSWORD_REQUEST,
    DRIVER_LOGOUT_SUCCESS,
    DRIVER_LOGOUT_FAIL,
    DRIVER_FORGOT_PASSWORD_FAIL,
    DRIVER_FORGOT_PASSWORD_REQUEST,
    DRIVER_FORGOT_PASSWORD_SUCCESS,
    DRIVER_RESET_PASSWORD_REQUEST,
    DRIVER_RESET_PASSWORD_SUCCESS,
    DRIVER_RESET_PASSWORD_FAIL
 } from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: DRIVER_LOGIN_REQUEST});

        const config = { 
            headers: { 
                "Content-Type": "application/json" 
            } 
        };

        const {data} = await axios.post(
            `http://localhost:3000/driver/login`,
            {email, password},
            config,
        );

        dispatch({type: DRIVER_LOGIN_SUCCESS, payload: data.driver});

    } catch (error) {
        dispatch({type: DRIVER_LOGIN_FAIL, payload: error.message});
    }
};

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({type: REGISTER_DRIVER_REQUEST});

        const config = {headers: { "Content-Type": "multipart/form-data"}};

        const {data} = await axios.post(
            `http://localhost:3000/driver/register`,
            userData,
            config
        );

        dispatch({type: REGISTER_DRIVER_SUCCESS, payload: data.driver});
    } catch (error) {
        dispatch({
            type: REGISTER_DRIVER_FAIL,
            payload: error.response.data
        });
    }
};

//Update Profile
export const updateDriverProfile = (userData) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_DRIVER_PROFILE_REQUEST});

        const config = {headers: { "Content-Type": "multipart/form-data"}};

        const {data} = await axios.put(
            `http://localhost:3000/driver/account/update`,
            userData,
            config
        );

        dispatch({type: UPDATE_DRIVER_PROFILE_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({
            type: UPDATE_DRIVER_PROFILE_FAIL,
            payload: error.response.data
        });
    }
};

//Update Password
export const updateDriverPassword = (passwords) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_DRIVER_PASSWORD_REQUEST});

        const config = {headers: { "Content-Type": "application/json"}};

        const {data} = await axios.put(
            `http://localhost:3000/driver/password/update`,
            passwords,
            config
        );

        dispatch({type: UPDATE_DRIVER_PASSWORD_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({
            type: UPDATE_DRIVER_PASSWORD_FAIL,
            payload: error.response.data
        });
    }
};

export const driverlogout = () => async (dispatch) => {
    try {

        await axios.get(
            `http://localhost:3000/driver/logout`
        );

        dispatch({type: DRIVER_LOGOUT_SUCCESS});

    } catch (error) {
        dispatch({type: DRIVER_LOGOUT_FAIL, payload: error.message});
    }
};

//Forgot Password
export const driverforgotPassword = (email) => async (dispatch) => {
    try {
      dispatch({ type: DRIVER_FORGOT_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.post(`http://localhost:3000/driver/password/forgot`, email, config);
  
      dispatch({ type: DRIVER_FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: DRIVER_FORGOT_PASSWORD_FAIL,
        payload: error.response.data,
      });
    }
};

//Reset Password
export const driverResetPassword = (token, passwords) => async (dispatch) => {
    try {
      dispatch({ type: DRIVER_RESET_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(
        `http://localhost:3000/driver/password/reset/${token}`,
        passwords,
        config
      );
  
      dispatch({ type: DRIVER_RESET_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: DRIVER_RESET_PASSWORD_FAIL,
        payload: error.response.data,
      });
    }
};



//Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
};