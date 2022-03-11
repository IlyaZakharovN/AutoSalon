import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { axiosDefault, axiosMultipart } from "../http-common"; 

const initialState = {
    saleStatus: [],
};

//// Get all sale statuses ////
export const getAllSaleStatuses = createAsyncThunk(
    "saleStatus/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get("/sales/sale-statuses/");
            // console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while retriving sale statuses.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Retrive a sale status by ID /////
export const fetchSaleStatus = createAsyncThunk(
    "saleStatus/fetchSaleStatus",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get(`/sales/sale-statuses/${id}/`);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while fetching a sale status.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);


const saleStatusSlice = createSlice({
    name: "saleStatus",
    initialState,
    reducers: {},
    extraReducers: {
        [getAllSaleStatuses.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [getAllSaleStatuses.rejected]: (state, action) => {
            return { ...initialState };
        },

        [fetchSaleStatus.fulfilled]: (state, action) => {
            return {...action.payload};
        },
        [fetchSaleStatus.rejected]: (state, action) => {
            return { ...initialState };
        },
    },
});

const { reducer } = saleStatusSlice;

export const saleStatusSelector = state => state.saleStatus;
export default reducer; 