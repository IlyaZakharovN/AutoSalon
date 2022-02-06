// The Store brings Actions and Reducers together and hold the Application state

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from "redux-persist/lib/storage";

import carModelReducer from "./slices/carModelsSlice";
import singleCarModeleReducer from "./slices/singleCarModelSlice";
import userReducer from "./slices/userSlice";
import carReducer from "./slices/carSlice";

const reducer = combineReducers({
  carModels: carModelReducer,
  singleCarModel: singleCarModeleReducer,
  user: userReducer,
  car: carReducer,
})

// redux persist:
const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: true,
});

export default store;

// export default () => {
//     let store = configureStore({
//         reducer: persistedReducer,
//         devTools: true,
//     })

//     let persistor = persistStore(store)
//     return { store, persistor }
// }

// const store = configureStore({
//     reducer: reducer,
//     devTools: true,
// })

// export default store;

