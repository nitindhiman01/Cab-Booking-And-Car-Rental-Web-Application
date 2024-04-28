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
    DRIVER_RESET_PASSWORD_FAIL,
    DRIVER_DETAILS_FAIL,
    DRIVER_DETAILS_REQUEST,
    DRIVER_DETAILS_SUCCESS,
    UPDATE_DRIVER_FAIL,
    UPDATE_DRIVER_REQUEST,
    UPDATE_DRIVER_SUCCESS,
    DELETE_DRIVER_FAIL,
    DELETE_DRIVER_REQUEST,
    DELETE_DRIVER_SUCCESS,
    ALL_DRIVERS_FAIL,
    ALL_DRIVERS_REQUEST,
    ALL_DRIVERS_SUCCESS
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

// get All Drivers -- admin
export const getAllDrivers = (userRole) => async (dispatch) => {
    try {
      dispatch({ type: ALL_DRIVERS_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };
      
      const { data } = await axios.post(`http://localhost:3000/admin/alldrivers`, {userRole}, config);
  
      dispatch({ type: ALL_DRIVERS_SUCCESS, payload: data.drivers });
    } catch (error) {
      dispatch({ type: ALL_DRIVERS_FAIL, payload: error.response.data });
    }
  };

  // Delete User
export const deleteDriver = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_DRIVER_REQUEST });
  
      const { data } = await axios.delete(`http://localhost:3000/admin/driver/${id}`);
  
      dispatch({ type: DELETE_DRIVER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_DRIVER_FAIL,
        payload: error.response.data,
      });
    }
  };

// get  User Details
export const getDriverDetails = (id, userRole) => async (dispatch) => {
    try {
      dispatch({ type: DRIVER_DETAILS_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`http://localhost:3000/admin/driver/${id}`, {userRole}, config);
  
      dispatch({ type: DRIVER_DETAILS_SUCCESS, payload: data.driver });
    } catch (error) {
      dispatch({ type: DRIVER_DETAILS_FAIL, payload: error.response.data.message });
    }
  };

// Update User
export const updateDriver = (id, userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_DRIVER_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(
        `http://localhost:3000/admin/driver/${id}`,
        userData,
        config
      );
  
      dispatch({ type: UPDATE_DRIVER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_DRIVER_FAIL,
        payload: error.response.data,
      });
    }
  };



//Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
};