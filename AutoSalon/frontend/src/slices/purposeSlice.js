import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { axiosDefault } from "../http-common"; 

const initialState = {
    purpose: [],
};

//// Get all car purpose types  ////
export const getAllPurposes = createAsyncThunk(
    "puprose/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get("/cars/purpose/");
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while retriving car purpose types.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Retrive a car purpose type by ID /////
export const fetchPurpose = createAsyncThunk(
    "purpose/fetchOne",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get(`/cars/purpose/${id}/`);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while fetching a car purpose type.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);


const purposeSlice = createSlice({
    name: "puprose",
    initialState,
    reducers: {},
    extraReducers: {
        [getAllPurposes.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [getAllPurposes.rejected]: (state, action) => {
            return { ...initialState };
        },

        [fetchPurpose.fulfilled]: (state, action) => {
            return {...action.payload};
        },
        [fetchPurpose.rejected]: (state, action) => {
            return { ...initialState };
        },
    },
});

const { reducer } = purposeSlice;

export const purposeSelector = state => state.purpose;
export default reducer; 