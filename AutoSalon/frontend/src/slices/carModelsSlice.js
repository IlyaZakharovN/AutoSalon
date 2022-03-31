// Slice is a collection of Redux reducer logic and actions for a single feature

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { axiosMultipart, axiosDefault } from "../http-common"; // axios instance

// const initialState = [];
const initialState = {
    carModels: [],
    // loading: false, 
    // hasErrors: false,
};

///// Get all car models /////
export const getAllCarModels = createAsyncThunk(
    "carModels/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get("/carmodels/models");
            // console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while getting all car models.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Retrive a car model by id /////
export const fetchCarModel = createAsyncThunk(
    "carModels/fetchOne",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get(`/carmodels/models/${id}/`);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while fetching a car model.");
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
            const res = axiosMultipart.post("/carmodels/models/", data);
            console.log(res);
            return res.data;
        } catch (err) {
            console.log("Error happened while creating a car model.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Partial Update car model /////
export const updateCarModel = createAsyncThunk(
    "carModels/partial-update",
    async ({ id, data }) => {
        console.log('Initial data - ', data);
        const res = await axiosDefault.patch(`/carmodels/models/${id}/`, data);
        console.log('Updated data - ', res.data);
        return res.data;
    }
);

///// Delete single car model /////
export const deleteCarModel = createAsyncThunk(
    "carModels/delete",
    async ({ id }) => {
        const res = await axiosDefault.delete(`/carmodels/models/${id}/`);
        return { id };
    }
);

///// Search car model by query /////
export const searchCarModels = createAsyncThunk(
    "carModels/filter",
    async (term, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get(`/carmodels/models/?search=${term}`);
            console.log(res);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while getting searched car models.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);


const carModelSlice = createSlice({
    name: "carModel",
    initialState,
    reducers: {},
    extraReducers: {
        [getAllCarModels.fulfilled]: (state, action) => {
            // state.carModels = action.payload.carModels;
            return [...action.payload];
            // state.carModels.push(action.payload);
        },
        [getAllCarModels.rejected]: (state, action) => {
            return {
                ...initialState
            }
        },

        [searchCarModels.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [searchCarModels.rejected]: (state, action) => {
            return {
                ...initialState
            }
        },

        [fetchCarModel.fulfilled]: (state, action) => {
            return {...action.payload};
        },
        [fetchCarModel.rejected]: (state, action) => {
            return { ...initialState };
        },

        [createCarModel.fulfilled]: (state, action) => {
            state.push(action.payload);
            return { ...state };
        },
        [createCarModel.rejected]: (state, action) => {
            if (action.payload) {
                state.error = action.payload.errorMessage;
                console.log(state.error);
            } 
            return { ...state };
        },

        [updateCarModel.fulfilled]: (state, action) => {
            const index = state.findIndex(carModels => carModels.id === action.payload.id);
            state[index] = {
                ...state[index],
                ...action.payload,
            };
        },
        // [deleteSingleCarModel.fulfilled]: (state,action) => {
        //     let index = state.findIndex(({ id }) => id === action.payload.id);
        //     state.splice(index, 1);
        // },
    },
});

const { reducer } = carModelSlice; // 'reducer' name is a must

export const carModelsSelector = state => state.carModels;
export default reducer;    