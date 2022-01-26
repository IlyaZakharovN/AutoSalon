// The Store brings Actions and Reducers together and hold the Application state

import { configureStore } from "@reduxjs/toolkit";

import carModelReducer from "./slices/carModelsSlice";
import singleCarModeleReducer from "./slices/singleCarModelSlice";
import userReducer from "./slices/userSlice";
// import authReducer from "./slices/userSlice"

const reducer = {
    carModels: carModelReducer,
    singleCarModel: singleCarModeleReducer,
    user: userReducer,
    // auth: authReducer
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
})

export default store;

// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from "redux-thunk";
// import rootReducer from "./reducers";

// const initialState = {};
// const middleware = [thunk]; 

// const store = createStore(
//     rootReducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;