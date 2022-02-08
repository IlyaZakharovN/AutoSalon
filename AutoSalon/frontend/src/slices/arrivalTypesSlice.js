import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { axiosDefault } from "../http-common"; 

const initialState = {
    arrivalTypes: [],
    // loading: false, 
    // hasErrors: false,
};

//// Get all arrival types ////
export const retriveArrivalTypes = createAsyncThunk(
    "arrivalTypes/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get("/stock/arrival-types/");
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Retrive an arrival type by ID /////
export const fetchArrivalType = createAsyncThunk(
    "arrivalTypes/fetchStockRecord",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get(`/stock/arrival-types/${id}/`);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Partial Update??? /////

const arrivalTypesSlice = createSlice({
    name: "arrivalTypes",
    initialState,
    reducers: {},
    extraReducers: {
        [retriveArrivalTypes.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [retriveArrivalTypes.rejected]: (state, action) => {
            return { ...initialState };
        },

        [fetchArrivalType.fulfilled]: (state, action) => {
            return {...action.payload};
        },
        [fetchArrivalType.rejected]: (state, action) => {
            return { ...initialState };
        },
    },
});

const { reducer } = arrivalTypesSlice;

export const arrivalTypesSelector = state => state.arrivalTypes;
export default reducer; 