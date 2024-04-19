import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, CLEAR_ERRORS, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL } from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: LOGIN_REQUEST});

        const config = { 
            headers: { 
                "Content-Type": "application/json" 
            } 
        };

        console.log("start");

        const {data} = await axios.post(
            `http://localhost:3000/login`,
            {email, password},
            config,
        );

        console.log(data);

        dispatch({type: LOGIN_SUCCESS, payload: data.user});

    } catch (error) {
        dispatch({type: LOGIN_FAIL, payload: error.message});
    }
};

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

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
};