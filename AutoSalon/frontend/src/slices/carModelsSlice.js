// Slice is a collection of Redux reducer logic and actions for a single feature

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosMultipart, axiosDefault } from "../http-common"; // axios instance

// const initialState = [];
const initialState = {
    carModels: {},
    loading: false, 
    hasErrors: false,
};

///// Create a car model /////
const createCM = data => {
    return axiosMultipart.post("/carmodels/", data)
        .then(res => {
            console.log(res.request.status);
            console.log(res);
        })
        .catch(err => console.log(err));
};

export const createCarModel = createAsyncThunk(
    "carModels/create",
    async (
        data,
        { rejectWithValue }
    ) => {
        try {
            const res = axiosMultipart.post("/carmodels/", data);
            console.log(res);
            return res.data;
        } catch (err) {
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Get all car models /////
const getAllCarModels = () => {
    return axiosDefault.get("/carmodels/");
};

export const retriveCarModels = createAsyncThunk(
    "carModels/retrieve",
    async () => {
        const res = await getAllCarModels();
        console.log(res.data);
        return res.data;
    }
);

///// Find by Brand, Model, Year, Body (...) /////

const carModelSlice = createSlice({
    name: "carModel",
    initialState,
    reducers: {
        getCarModels: state => {
            state.loading = true
        },
        getCarModelsSuccess: (state, { payload }) => {
            state.carModels = payload
            state.loading = false
            state.hasErrors = false
        },
        getCarModelsFailure: state => {
            state.loading = false
            state.hasErrors = true
        },
        carModelAdded(state, action) {
            state.push(action.payload);
        },
    },
    extraReducers: {
        [createCarModel.fulfilled]: (state, action) => {
            state.push(action.payload);
        },
        [createCarModel.pending]: (state, action) => {
            console.log(action.meta.arg);
        },
        [createCarModel.rejected]: (state, action) => {
            if (action.payload) {
                state.error = action.payload.errorMessage;
                console.log(state.error);
            } 
            // else {
            //     state.error = action.error.message
            // }
            return { ...state };
        },
        [retriveCarModels.fulfilled]: (state, action) => {
            return [...action.payload];
        },
    },
});

const { reducer } = carModelSlice; // 'reducer' name is a must

export const { getCarModels, getCarModelsSuccess, getCarModelsFailure, carModelAdded } = carModelSlice.actions;
export const carModelsSelector = state => state.carModels;
export default reducer;    