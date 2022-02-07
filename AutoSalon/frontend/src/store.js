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

import carReducer from "./slices/carSlice";
import carModelReducer from "./slices/carModelsSlice";
import singleCarModeleReducer from "./slices/singleCarModelSlice";
import stockReducer from "./slices/stockSlice";
import userReducer from "./slices/userSlice";

const appReducer = combineReducers({
  carModels: carModelReducer,
  singleCarModel: singleCarModeleReducer,
  user: userReducer,
  car: carReducer,
  stock: stockReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'user/logout/fulfilled') {
    // const { routing } = state
    // state = { routing }
    console.log(storage.getItem('persist:root'))
    storage.removeItem('persist:root')
    console.log(storage.getItem('persist:root'))
    return appReducer(undefined, action)
  }

  return appReducer(state, action);
}

// redux persist:
const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['carModel'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

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

