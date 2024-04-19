import { DRIVER_LOGIN_FAIL, DRIVER_LOGIN_REQUEST, DRIVER_LOGIN_SUCCESS, CLEAR_ERRORS, REGISTER_DRIVER_REQUEST, REGISTER_DRIVER_SUCCESS, REGISTER_DRIVER_FAIL } from "../constants/userConstants";
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

        dispatch({type: DRIVER_LOGIN_SUCCESS, payload: data.user});

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

        dispatch({type: REGISTER_DRIVER_SUCCESS, payload: data.user});
    } catch (error) {
        dispatch({
            type: REGISTER_DRIVER_FAIL,
            payload: error.response.data
        });
    }
};

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
};