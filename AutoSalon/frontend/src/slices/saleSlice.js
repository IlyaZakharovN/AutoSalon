import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { axiosDefault, axiosMultipart } from "../http-common"; 

const initialState = {
    sale: [],
};

//// Get all sale records ////
export const retriveSaleRecords = createAsyncThunk(
    "sale/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get("/sales/sales/");
            // console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while retriving sale records.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Retrive a sale record by ID /////
export const fetchSaleRecord = createAsyncThunk(
    "sale/fetchSaleRecord",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get(`/sales/sales/${id}/`);
            // console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while fetching a sale record.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Add a sale record /////
export const createSaleRecord = createAsyncThunk(
    "sale/create",
    async (data, { rejectWithValue }) => {
        try {
            const res = axiosMultipart.post("/sales/sales/", data);
            console.log(data);
            return res.data;
        } catch (err) {
            console.log("Error happened while creating a sale record.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Patrial Update sale record /////
export const updateSale = createAsyncThunk(
    "sale/partial-update",
    async ({ id, data }) => {
        console.log('Initial data - ', data);
        const res = await axiosMultipart.patch(`/sales/sales/${id}/`, data);
        console.log('Updated data - ', res.data);
        return res.data;
    }
);

///// Delete sale record /////
export const deleteSale = createAsyncThunk(
    "sale/delete",
    async ({ id }) => {
        try {
            const res = await axiosDefault.delete(`/sales/sales/${id}/`);
            return { id };
        } catch (err) {
            console.log("Error happened while deleting the sale record.");
            console.log(err);
        }
    }
);


const saleSlice = createSlice({
    name: "sale",
    initialState,
    reducers: {},
    extraReducers: {
        [retriveSaleRecords.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [retriveSaleRecords.rejected]: (state, action) => {
            return { ...initialState };
        },

        [fetchSaleRecord.fulfilled]: (state, action) => {
            return {...action.payload};
        },
        [fetchSaleRecord.rejected]: (state, action) => {
            return { ...initialState };
        },

        [createSaleRecord.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.push(action.payload);
            // return { ...state };
        },
        // [createStockRecord.fulfilled]: (state, action) => {
        //     ...state,
        // },
        [createSaleRecord.pending]: (state, action) => {
            console.log(action.meta.arg);
        },
        [createSaleRecord.rejected]: (state, action) => {
            if (action.payload) {
                state.error = action.payload.errorMessage;
                console.log(state.error);
            }
            return { ...state };
        },

        [updateSale.fulfilled]: (state, action) => {
            const index = state.findIndex(({sale}) => sale.id === action.payload.id);
            state[index] = {
                ...state[index],
                ...action.payload,
            };
        },
    },
});

const { reducer } = saleSlice;

export const saleSelector = state => state.sale;
export default reducer; 