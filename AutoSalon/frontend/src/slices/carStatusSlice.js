import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { axiosDefault } from "../http-common"; 

const initialState = {
    carStatus: [],
};

//// Get all car statuses  ////
export const getAllCarStatuses = createAsyncThunk(
    "carStatus/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get("/cars/statuses/");
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while retriving car statuses.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Retrive a car status by ID /////
export const fetchCarStatus = createAsyncThunk(
    "carStatus/fetchOne",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get(`/cars/statuses/${id}/`);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while fetching a car status.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

const carStatusSlice = createSlice({
    name: "carStatus",
    initialState,
    reducers: {},
    extraReducers: {
        [getAllCarStatuses.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [getAllCarStatuses.rejected]: (state, action) => {
            return { ...initialState };
        },

        [fetchCarStatus.fulfilled]: (state, action) => {
            return {...action.payload};
        },
        [fetchCarStatus.rejected]: (state, action) => {
            return { ...initialState };
        },
    },
});

const { reducer } = carStatusSlice;

export const carStatusSelector = state => state.carStatus;
export default reducer; 