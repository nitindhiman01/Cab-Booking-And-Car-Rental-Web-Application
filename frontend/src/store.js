import { createStore, combineReducers, applyMiddleware} from 'redux';

import { thunk }  from 'redux-thunk';

import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from './reducers/userReducer';
import { driverReducer } from './reducers/driverReducer';

const reducer = combineReducers({
    user: userReducer,
    driver: driverReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware)) 
);

export default store;

