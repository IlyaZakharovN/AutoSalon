// Slice is a collection of Redux reducer logic and actions for a single feature

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { axiosMultipart, axiosDefault } from "../http-common"; // axios instance

// const initialState = [];
const initialState = {
    carModels: [],
    loading: false, 
    hasErrors: false,
};

///// Get all car models /////
export const retriveCarModels = createAsyncThunk(
    "carModels/retrieve",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get("/carmodels/");
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Create a car model /////
export const createCarModel = createAsyncThunk(
    "carModels/create",
    async (data, { rejectWithValue }) => {
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
        carModelAdd: (state, action) => {
            state.push(action.payload);
        },
    },
    extraReducers: {
        [createCarModel.fulfilled]: (state, action) => {
            state.push(action.payload);
            return { ...state };
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
            // state.carModels = action.payload.carModels;
            return [...action.payload];
            // state.carModels.push(action.payload);
        },
        [retriveCarModels.rejected]: (state, action) => {
            return {
                ...initialState
            }
        },
    },
});

const { reducer } = carModelSlice; // 'reducer' name is a must

export const { getCarModels, getCarModelsSuccess, getCarModelsFailure, carModelAdd } = carModelSlice.actions;
export const carModelsSelector = state => state.carModels;
export default reducer;    