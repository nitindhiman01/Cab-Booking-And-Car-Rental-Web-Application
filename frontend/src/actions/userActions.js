import { MY_BOOKINGS_FAIL, MY_BOOKINGS_REQUEST, MY_BOOKINGS_SUCCESS } from "../constants/rentCarConstants";
import { 
    LOGIN_FAIL, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    CLEAR_ERRORS, 
    REGISTER_USER_REQUEST, 
    REGISTER_USER_SUCCESS, 
    REGISTER_USER_FAIL, 
    LOAD_USER_REQUEST, 
    LOAD_USER_SUCCESS, 
    LOAD_USER_FAIL, 
    LOGOUT_SUCCESS, 
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    ADMIN_BOOKINGS_FAIL,
    ADMIN_BOOKINGS_REQUEST,
    ADMIN_BOOKINGS_SUCCESS,
    ALL_USERS_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    DELETE_USER_REQUEST,
    DELETE_USER_FAIL,
    DELETE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_REQUEST,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS
 } from "../constants/userConstants";
import axios from "axios";

//Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: LOGIN_REQUEST});

        const config = { 
            headers: { 
                "Content-Type": "application/json" 
            },
        };

        const {data} = await axios.post(
            `http://localhost:3000/login`,
            {email, password},
            config,
        );

        dispatch({type: LOGIN_SUCCESS, payload: data.user});

    } catch (error) {
        dispatch({type: LOGIN_FAIL, payload: error.message});
    }
};

//REGISTER
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({type: REGISTER_USER_REQUEST});

        const config = {headers: { "Content-Type": "multipart/form-data"}};

        const {data} = await axios.post(
            `http://localhost:3000/register`,
            userData,
            config
        );

        dispatch({type: REGISTER_USER_SUCCESS, payload: data.user});
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data
        });
    }
};

//LOAD USER
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({type: LOAD_USER_REQUEST});

        const {data} = await axios.get(
            `http://localhost:3000/account`
        );

        dispatch({type: LOAD_USER_SUCCESS, payload: data.user});

    } catch (error) {
        dispatch({type: LOAD_USER_FAIL, payload: error.message});
    }
};

//logout
export const logout = () => async (dispatch) => {
    try {

        await axios.get(
            `http://localhost:3000/logout`
        );

        dispatch({type: LOGOUT_SUCCESS});

    } catch (error) {
        dispatch({type: LOGOUT_FAIL, payload: error.message});
    }
};

//Update Profile
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_PROFILE_REQUEST});

        const config = {headers: { "Content-Type": "multipart/form-data"}};

        const {data} = await axios.put(
            `http://localhost:3000/account/update`,
            userData,
            config
        );

        dispatch({type: UPDATE_PROFILE_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data
        });
    }
};

//Update Password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_PASSWORD_REQUEST});

        const config = {headers: { "Content-Type": "application/json"}};

        const {data} = await axios.put(
            `http://localhost:3000/password/update`,
            passwords,
            config
        );

        dispatch({type: UPDATE_PASSWORD_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data
        });
    }
};

//Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.post(`http://localhost:3000/password/forgot`, email, config);
  
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: error.response.data,
      });
    }
  };


// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(
        `http://localhost:3000/password/reset/${token}`,
        passwords,
        config
      );
  
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data,
      });
    }
  };

//All Bookings
export const getAllUserBookings = (userData) => async (dispatch) => {
    try {
        dispatch({type: MY_BOOKINGS_REQUEST});

        const config = {headers: { "Content-Type": "multipart/form-data"}};

        const {data} = await axios.post(
            'http://localhost:3000/rent/bookings/me',
            userData,
            config
        );

        dispatch({
            type: MY_BOOKINGS_SUCCESS,
            payload: data.bookings,
        })

    } catch (error){
        dispatch({
            type: MY_BOOKINGS_FAIL,
            payload: error.response.data,
        })
    }
}

//All Bookings -- admin
export const getAllAdminBookings = (userData) => async (dispatch) => {
    try {
        dispatch({type: ADMIN_BOOKINGS_REQUEST});

        const config = {headers: { "Content-Type": "multipart/form-data"}};

        const {data} = await axios.post(
            'http://localhost:3000/admin/rent/allbookings',
            userData,
            config
        );

        dispatch({
            type: ADMIN_BOOKINGS_SUCCESS,
            payload: data.adminbookings,
        })

    } catch (error){
        dispatch({
            type: ADMIN_BOOKINGS_FAIL,
            payload: error.response.data,
        })
    }
};


// get All Users -- admin
export const getAllUsers = (userRole) => async (dispatch) => {
    try {
      dispatch({ type: ALL_USERS_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };
      
      const { data } = await axios.post(`http://localhost:3000/admin/users`, {userRole}, config);
  
      dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
      dispatch({ type: ALL_USERS_FAIL, payload: error.response.data });
    }
  };

  // Delete User
export const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST });
  
      const { data } = await axios.delete(`http://localhost:3000/admin/user/${id}`);
  
      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: error.response.data,
      });
    }
  };

// get  User Details
export const getUserDetails = (id, userRole) => async (dispatch) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`http://localhost:3000/admin/user/${id}`, {userRole}, config);
  
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
    }
  };

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(
        `http://localhost:3000/admin/user/${id}`,
        userData,
        config
      );
  
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response.data,
      });
    }
  };

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
};