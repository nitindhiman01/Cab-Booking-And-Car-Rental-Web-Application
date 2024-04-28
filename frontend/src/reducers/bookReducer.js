import { loadUser } from "../actions/userActions";
import {CLEAR_ERRORS, RENT_REQUEST, RENT_SUCCESS, RENT_FAIL, MY_BOOKINGS_FAIL, MY_BOOKINGS_REQUEST, MY_BOOKINGS_SUCCESS, DELETE_BOOKING_FAIL, DELETE_BOOKING_REQUEST, DELETE_BOOKING_RESET, DELETE_BOOKING_SUCCESS} from "../constants/rentCarConstants";

export const bookReducer = (state = {}, action) => {

    switch (action.type) {
        case RENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case RENT_SUCCESS: 
            return {
                loading: false,
                bookCar: action.payload
            }
        case RENT_FAIL:
            return {
                loading: true,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};

export const myBookingsReducer = (state = {myBookings: []}, action) => {
    switch (action.type) {
        case MY_BOOKINGS_REQUEST:
            return {
                loading: true,
                myBookings: []
            }
        case MY_BOOKINGS_SUCCESS:
            return {
                loading: false,
                myBookings: action.payload
            }
        case MY_BOOKINGS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
    
        default:
            return state;
    }
}

export const deletebookReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_BOOKING_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case DELETE_BOOKING_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case DELETE_BOOKING_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_BOOKING_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

