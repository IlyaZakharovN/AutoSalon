import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { axiosMultipart, axiosDefault } from "../http-common"; 

const initialState = {
    cars: [],
    // loading: false, 
    // hasErrors: false,
};

///// Get all cars /////
export const retriveCars = createAsyncThunk(
    "cars/retrieve",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get("/cars/");
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Add car /////
export const createCar = createAsyncThunk(
    "car/create",
    async (data, { rejectWithValue }) => {
        try {
            const res = axiosDefault.post("/cars/", data);
            console.log(res);
            return res.data; // return (await res).data;
        } catch (err) {
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

const carSlice = createSlice({
    name: "car",
    initialState,
    reducers: {},
    extraReducers: {
        [retriveCars.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [retriveCars.rejected]: (state, action) => {
            return { ...initialState };
        },
        [createCar.fulfilled]: (state, action) => {
            state.push(action.payload);
            // return { ...state };
        },
        [createCar.pending]: (state, action) => {
            console.log(action.meta.arg);
        },
        [createCar.rejected]: (state, action) => {
            if (action.payload) {
                state.error = action.payload.errorMessage;
                console.log(state.error);
            }
            return { ...state };
        },
    },
});

const { reducer } = carSlice;

export const carsSelector = state => state.cars;
export default reducer; 