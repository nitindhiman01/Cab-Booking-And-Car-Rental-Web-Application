import { 
    DRIVER_LOGIN_REQUEST,
    DRIVER_LOGIN_SUCCESS, 
    DRIVER_LOGIN_FAIL, 
    REGISTER_DRIVER_REQUEST,
    REGISTER_DRIVER_SUCCESS,
    REGISTER_DRIVER_FAIL,
    CLEAR_ERRORS 
} from "../constants/userConstants"


export const driverReducer = (state = {driver: {}}, action) => {
    switch (action.type) {
        case DRIVER_LOGIN_REQUEST:
        case REGISTER_DRIVER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case DRIVER_LOGIN_SUCCESS:
        case REGISTER_DRIVER_SUCCESS: 
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                driver: action.payload,
            };
        case DRIVER_LOGIN_FAIL:
        case REGISTER_DRIVER_FAIL: 
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                driver: null,
                error: action.payload,
            };
        case CLEAR_ERRORS: 
            return {
                ...state,
                error: null
            };
    
        default:
            return state;
    }
}