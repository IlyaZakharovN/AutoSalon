import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { axiosDefault, axiosMultipart } from "../http-common"; 

const initialState = {
    stockRecords: [],
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
            console.log("Error happened while retriving stock records.");
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
            console.log("Error happened while fetching a stock record.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Add a stock record /////
export const createStockRecord = createAsyncThunk(
    "stock/create",
    async (data, { rejectWithValue }) => {
        try {
            const res = axiosMultipart.post("/stock/stock/", data);
            console.log(res.data);
            return res.data; // return (await res).data;
        } catch (err) {
            console.log("Error happened while creating a stock record.");
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

///// Delete stock /////
export const deleteStock = createAsyncThunk(
    "stock/delete",
    async ({ id }) => {
        try {
            const res = await axiosDefault.delete(`/stock/stock/${id}/`);
            return { id };
        } catch (err) {
            console.log("Error happened while deleting the stock record.");
            console.log(err);
        }
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

        [createStockRecord.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.push(action.payload);
            // return { ...state };
        },
        // [createStockRecord.fulfilled]: (state, action) => {
        //     ...state,
        // },
        [createStockRecord.pending]: (state, action) => {
            console.log(action.meta.arg);
        },
        [createStockRecord.rejected]: (state, action) => {
            if (action.payload) {
                state.error = action.payload.errorMessage;
                console.log(state.error);
            }
            return { ...state };
        },

        [updateStock.fulfilled]: (state, action) => {
            const index = state.findIndex(({stock}) => stock.id === action.payload.id);
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

