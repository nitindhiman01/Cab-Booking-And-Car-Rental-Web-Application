import { 
    DRIVER_LOGIN_REQUEST,
    DRIVER_LOGIN_SUCCESS, 
    DRIVER_LOGIN_FAIL, 
    REGISTER_DRIVER_REQUEST,
    REGISTER_DRIVER_SUCCESS,
    REGISTER_DRIVER_FAIL,
    UPDATE_DRIVER_PROFILE_SUCCESS,
    UPDATE_DRIVER_PROFILE_REQUEST,
    UPDATE_DRIVER_PROFILE_FAIL,
    UPDATE_DRIVER_PROFILE_RESET,
    UPDATE_DRIVER_PASSWORD_SUCCESS,
    UPDATE_DRIVER_PASSWORD_RESET,
    UPDATE_DRIVER_PASSWORD_REQUEST,
    UPDATE_DRIVER_PASSWORD_FAIL,
    UPDATE_DRIVER_REQUEST,
    UPDATE_DRIVER_SUCCESS,
    UPDATE_DRIVER_FAIL,
    UPDATE_DRIVER_RESET,
    DELETE_DRIVER_FAIL,
    DELETE_DRIVER_REQUEST,
    DELETE_DRIVER_RESET,
    DELETE_DRIVER_SUCCESS,
    DRIVER_LOGOUT_SUCCESS,
    DRIVER_LOGOUT_FAIL,
    CLEAR_ERRORS, 
    DRIVER_FORGOT_PASSWORD_REQUEST,
    DRIVER_FORGOT_PASSWORD_SUCCESS,
    DRIVER_FORGOT_PASSWORD_FAIL,
    DRIVER_RESET_PASSWORD_REQUEST,
    DRIVER_RESET_PASSWORD_SUCCESS,
    DRIVER_RESET_PASSWORD_FAIL,
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
        case DRIVER_LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false
            }
        case DRIVER_LOGOUT_FAIL: 
            return {
                ...state,
                loading: false,
            error: action.payload
            }
        case CLEAR_ERRORS: 
            return {
                ...state,
                error: null
            };
    
        default:
            return state;
    }
};

export const driverProfileReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_DRIVER_PROFILE_REQUEST:
      case UPDATE_DRIVER_PASSWORD_REQUEST:
      case UPDATE_DRIVER_REQUEST:
      case DELETE_DRIVER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_DRIVER_PROFILE_SUCCESS:
      case UPDATE_DRIVER_PASSWORD_SUCCESS:
      case UPDATE_DRIVER_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
          alertUser: true
        };
  
      case DELETE_DRIVER_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload.success,
          message: action.payload.message,
        };
  
      case UPDATE_DRIVER_PROFILE_FAIL:
      case UPDATE_DRIVER_PASSWORD_FAIL:
      case UPDATE_DRIVER_FAIL:
      case DELETE_DRIVER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case UPDATE_DRIVER_PROFILE_RESET:
      case UPDATE_DRIVER_PASSWORD_RESET:
      case UPDATE_DRIVER_RESET:
        return {
          ...state,
          isUpdated: false,
        };
  
      case DELETE_DRIVER_RESET:
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

  export const driverforgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
      case DRIVER_FORGOT_PASSWORD_REQUEST:
      case DRIVER_RESET_PASSWORD_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case DRIVER_FORGOT_PASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
  
      case DRIVER_RESET_PASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          success: action.payload,
        };
  
      case DRIVER_FORGOT_PASSWORD_FAIL:
      case DRIVER_RESET_PASSWORD_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
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