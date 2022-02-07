import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { axiosDefault } from "../http-common"; 

const initialState = {
    cars: [],
    // loading: false, 
    // hasErrors: false,
};

//// Access stock info ////
export const retriveStock = createAsyncThunk(
    "stock/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get("/stock/stock/");
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Retrive a stock record by ID /////
export const fetchStockRecord = createAsyncThunk(
    "stock/fetchStockRecord",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get(`/stock/stock/${id}/`);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Patrial Update record /////
export const updateStock = createAsyncThunk(
    "stock/partial-update",
    async ({ id, data }) => {
        console.log('Initial data - ', data);
        const res = await axiosDefault.patch(`/stock/stock/${id}/`, data);
        console.log('Updated data - ', res.data);
        return res.data;
    }
);

const stockSlice = createSlice({
    name: "stock",
    initialState,
    reducers: {},
    extraReducers: {
        [retriveStock.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [retriveStock.rejected]: (state, action) => {
            return { ...initialState };
        },

        [fetchStockRecord.fulfilled]: (state, action) => {
            return {...action.payload};
        },
        [fetchStockRecord.rejected]: (state, action) => {
            return { ...initialState };
        },

        [updateStock.fulfilled]: (state, action) => {
            const index = state.findIndex(stock => stock.id === action.payload.id);
            state[index] = {
                ...state[index],
                ...action.payload,
            };
        },
    },
});

const { reducer } = stockSlice;

export const stockSelector = state => state.stock;
export default reducer; 

