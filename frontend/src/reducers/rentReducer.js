import {ALL_RENT_REQUEST, ALL_RENT_SUCCESS, ALL_RENT_FAIL, CLEAR_ERRORS, RENT_REQUEST, RENT_SUCCESS, RENT_FAIL} from "../constants/rentCarConstants";

export const rentReducer = (state = {rentCars: [], bookCar: {}}, action) => {

    switch (action.type) {
        case ALL_RENT_REQUEST:
            return {
                loading: true,
                rentCars: []
            }
        case ALL_RENT_SUCCESS:
            return {
                loading: false,
                rentCars: action.payload.rentCars
            }
        case ALL_RENT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        // case RENT_REQUEST:
        //     return {
        //         loading: true,
        //         bookCar: {}
        //     }
        // case RENT_SUCCESS: 
        //     return {
        //         loading: false,
        //         bookCar: action.payload
        //     }
        // case RENT_FAIL:
        //     return {
        //         loading: false,
        //         error: action.payload
        //     }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }

};
