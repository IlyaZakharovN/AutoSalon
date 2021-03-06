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

import addOptionReducer from "./slices/addOptionSlice";
import arrivalTypesReducer from "./slices/arrivalTypesSlice";
import carReducer from "./slices/carSlice";
import carModelReducer from "./slices/carModelsSlice";
import employeeReducer from "./slices/employeeSlice";
import purchaseTypesReducer from "./slices/purchaseTypesSlice"
import purposeReducer from "./slices/purposeSlice";
import saleReducer from "./slices/saleSlice";
import saleStatusReducer from "./slices/saleStatusSlice";
import saleTypeReducer from "./slices/saleTypeSlice";
import singleCarModeleReducer from "./slices/singleCarModelSlice";
import stockReducer from "./slices/stockSlice";
import userReducer from "./slices/userSlice";
import testDriveReducer from "./slices/testDriveSlice";
import testDriveStatusReducer from "./slices/testDriveStatusSlice";
import carModelPhotosReducer from "./slices/carModelPhotosSlice";
import carStatusReducer from "./slices/carStatusSlice";
import carPhotosReducer from "./slices/carPhotosSlice";
import techInspectionReducer from "./slices/techInspectionSlice";
import techInspectionRequestReducer from "./slices/techInspectionRequestSlice";

const appReducer = combineReducers({
  carModels: carModelReducer,
  singleCarModel: singleCarModeleReducer,
  user: userReducer,
  car: carReducer,
  stock: stockReducer,
  arrivalTypes: arrivalTypesReducer,
  sale: saleReducer,
  purchaseTypes: purchaseTypesReducer,
  addOption: addOptionReducer,
  employee: employeeReducer,
  testdrive: testDriveReducer,
  testDriveStatus: testDriveStatusReducer,
  purpose: purposeReducer,
  carModelPhotos: carModelPhotosReducer,
  carStatus: carStatusReducer,
  carPhotos: carPhotosReducer,
  saleStatus: saleStatusReducer,
  saleType: saleTypeReducer,
  techInspection: techInspectionReducer,
  techInspectionRequest: techInspectionRequestReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'user/logout/fulfilled' || action.type === 'user/retrieve/pending') {
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
    // serializableCheck: false,
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

