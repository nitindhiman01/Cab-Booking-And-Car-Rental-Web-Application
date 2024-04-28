import axios from "axios";

import {ALL_RENT_FAIL, ALL_RENT_REQUEST, ALL_RENT_SUCCESS, CLEAR_ERRORS, RENT_FAIL, RENT_REQUEST, RENT_SUCCESS, DELETE_BOOKING_FAIL, DELETE_BOOKING_REQUEST, DELETE_BOOKING_SUCCESS} from "../constants/rentCarConstants";

export const getrentCars = () => async (dispatch) => {
    try {
        dispatch({type: ALL_RENT_REQUEST});

        const {data} = await axios.get(
            'http://localhost:3000/rent/allcars'
        );

        dispatch({
            type: ALL_RENT_SUCCESS,
            payload: data,
        })

    } catch (error){
        dispatch({
            type: ALL_RENT_FAIL,
            payload: error.response.data,
        })
    }
};

export const bookRentCar = (carData) => async (dispatch) => {
    try{
        dispatch({type: RENT_REQUEST});

        const config = {headers: { "Content-Type": "multipart/form-data"}};

        const {data} = await axios.post(
            `http://localhost:3000/rent/newbooking`,
            carData,
            config
        );

        dispatch({type: RENT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: RENT_FAIL,
            payload: error.response.data
        });
    }
}

//DeleteBooking
export const deleteBooking = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_BOOKING_REQUEST });
        console.log("working");
      const { data } = await axios.delete(`http://localhost:3000/admin/deletebooking/${id}`);
        console.log("working");
      dispatch({ type: DELETE_BOOKING_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: DELETE_BOOKING_FAIL,
        payload: error.message,
      });
    }
};

export const clearErrors = () => async(dispatch) => {
    dispatch({type: CLEAR_ERRORS});
};