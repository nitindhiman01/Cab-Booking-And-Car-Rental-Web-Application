import { createStore, combineReducers, applyMiddleware} from 'redux';

import { thunk }  from 'redux-thunk';

import { composeWithDevTools } from "redux-devtools-extension";
import { AdminBookingsReducer, allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from './reducers/userReducer';
import { allDriversReducer, driverDetailsReducer, driverProfileReducer, driverReducer, driverforgotPasswordReducer } from './reducers/driverReducer';
import { rentReducer } from './reducers/rentReducer';
import { bookReducer, deletebookReducer, myBookingsReducer } from './reducers/bookReducer';

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
    adminBookings: AdminBookingsReducer,
    deleteBooking: deletebookReducer,
    users: allUsersReducer,
    userDetails: userDetailsReducer,
    driverDetails: driverDetailsReducer,
    drivers: allDriversReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware)) 
);

export default store;

