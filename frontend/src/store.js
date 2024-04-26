import { createStore, combineReducers, applyMiddleware} from 'redux';

import { thunk }  from 'redux-thunk';

import { composeWithDevTools } from "redux-devtools-extension";
import { forgotPasswordReducer, profileReducer, userReducer } from './reducers/userReducer';
import { driverProfileReducer, driverReducer, driverforgotPasswordReducer } from './reducers/driverReducer';
import { rentReducer } from './reducers/rentReducer';
import { bookReducer, myBookingsReducer } from './reducers/bookReducer';

const reducer = combineReducers({
    user: userReducer,
    driver: driverReducer,
    rentCars: rentReducer,
    bookCar: bookReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    myBookings: myBookingsReducer,
    driverProfile: driverProfileReducer,
    driverforgotPassword: driverforgotPasswordReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware)) 
);

export default store;

