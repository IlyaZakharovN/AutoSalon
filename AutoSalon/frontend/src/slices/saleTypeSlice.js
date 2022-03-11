import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { axiosDefault, axiosMultipart } from "../http-common"; 

const initialState = {
    saleType: [],
};

//// Get all sale types ////
export const getAllSaleTypes = createAsyncThunk(
    "saleType/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get("/sales/sale-types/");
            // console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while retriving sale types.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Retrive a sale type by ID /////
export const fetchSaleType = createAsyncThunk(
    "saleType/fetchSaleType",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get(`/sales/sale-types/${id}/`);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while fetching a sale type.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);


const saleTypeSlice = createSlice({
    name: "saleType",
    initialState,
    reducers: {},
    extraReducers: {
        [getAllSaleTypes.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [getAllSaleTypes.rejected]: (state, action) => {
            return { ...initialState };
        },

        [fetchSaleType.fulfilled]: (state, action) => {
            return {...action.payload};
        },
        [fetchSaleType.rejected]: (state, action) => {
            return { ...initialState };
        },
    },
});

const { reducer } = saleTypeSlice;

export const saleTypeSelector = state => state.saleType;
export default reducer; 