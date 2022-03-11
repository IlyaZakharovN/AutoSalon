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
            const res = await axiosDefault.get("/cars/cars/");
            // console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while retriving cars.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Retrive a car by VIN /////
export const fetchCar = createAsyncThunk(
    "cars/fetchCar",
    async (vin, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get(`/cars/cars/${vin}/`);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while fetching the car.");
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
            const res = axiosDefault.post("/cars/cars/", data);
            console.log(res);
            return res.data; // return (await res).data;
        } catch (err) {
            console.log("Error happened while creating a car.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Patrial Update car /////
export const updateCar = createAsyncThunk(
    "car/partial-update",
    async ({ id, data }) => {
        console.log('Initial data - ', data);
        const res = await axiosDefault.patch(`/cars/cars/${id}/`, data);
        console.log('Updated data - ', res.data);
        return res.data;
    }
);

///// Delete car /////
export const deleteCar = createAsyncThunk(
    "car/delete",
    async ({ vin }) => {
        try {
            const res = await axiosDefault.delete(`/cars/cars/${vin}/`);
            return { vin };
        } catch (err) {
            console.log("Error happened while deleting the car.");
            console.log(err);
        }
    }
);


const carSlice = createSlice({
    name: "car",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCar.fulfilled]: (state, action) => {
            return {...action.payload};
        },
        [fetchCar.rejected]: (state, action) => {
            return { ...initialState };
        },

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

        [updateCar.fulfilled]: (state, action) => {
            const index = state.findIndex(cars => cars.id === action.payload.id);
            state[index] = {
                ...state[index],
                ...action.payload,
            };
        },
    },
});

const { reducer } = carSlice;

export const carsSelector = state => state.car;
export default reducer; 