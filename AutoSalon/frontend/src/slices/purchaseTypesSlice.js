import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { axiosDefault } from "../http-common"; 

const initialState = {
    purchaseTypes: [],
    // loading: false, 
    // hasErrors: false,
};

//// Get all purchase types ////
export const retrivePurchaseTypes = createAsyncThunk(
    "purchaseTypes/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get("/sales/purchase-types/");
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while retriving purchase types.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Retrive a purchase type by ID /////
export const fetchPurchaseType = createAsyncThunk(
    "purchaseTypes/fetchSaleRecord",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get(`/sales/purchase-types/${id}/`);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while fetching a purchase type.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);


const purchaseTypesSlice = createSlice({
    name: "purchaseTypes",
    initialState,
    reducers: {},
    extraReducers: {
        [retrivePurchaseTypes.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [retrivePurchaseTypes.rejected]: (state, action) => {
            return { ...initialState };
        },

        [fetchPurchaseType.fulfilled]: (state, action) => {
            return {...action.payload};
        },
        [fetchPurchaseType.rejected]: (state, action) => {
            return { ...initialState };
        },
    },
});

const { reducer } = purchaseTypesSlice;

export const purchaseTypesSelector = state => state.purchaseTypes;
export default reducer; 