import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { axiosDefault } from "../http-common"; 

const initialState = {
    addOptions: [],
    // loading: false, 
    // hasErrors: false,
};

//// Get all add options ////
export const retriveAddOptions = createAsyncThunk(
    "addOption/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get("/addoptions/");
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while retriving add options.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Retrive an add option by ID /////
export const fetchAddOption = createAsyncThunk(
    "addOption/fetchAddOption",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get(`/addoptions/${id}/`);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while fetching an add option.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Add an add option /////
export const createAddOption = createAsyncThunk(
    "addOption/create",
    async (data, { rejectWithValue }) => {
        try {
            const res = axiosDefault.post("/addoptions/", data);
            // console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while creating an add option.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Patrial Update add option /////
export const updateAddOption = createAsyncThunk(
    "addOption/partial-update",
    async ({ id, data }) => {
        console.log('Initial data - ', data);
        const res = await axiosDefault.patch(`/addoptions/${id}/`, data);
        console.log('Updated data - ', res.data);
        return res.data;
    }
);

///// Delete add option /////
export const deleteAddOption = createAsyncThunk(
    "addOption/delete",
    async ({ id }) => {
        try {
            const res = await axiosDefault.delete(`/addoptions/${id}/`);
            return { id };
        } catch (err) {
            console.log("Error happened while deleting the add option.");
            console.log(err);
        }
    }
);


const addOptionSlice = createSlice({
    name: "addOption",
    initialState,
    reducers: {},
    extraReducers: {
        [retriveAddOptions.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [retriveAddOptions.rejected]: (state, action) => {
            return { ...initialState };
        },

        [fetchAddOption.fulfilled]: (state, action) => {
            return {...action.payload};
        },
        [fetchAddOption.rejected]: (state, action) => {
            return { ...initialState };
        },

        [createAddOption.fulfilled]: (state, action) => {
            // console.log(action.payload);
            // return { ...state };
            state.push(action.payload);
        },
        // [createStockRecord.fulfilled]: (state, action) => {
        //     ...state,
        // },
        [createAddOption.pending]: (state, action) => {
            console.log(action.meta.arg);
        },
        [createAddOption.rejected]: (state, action) => {
            if (action.payload) {
                state.error = action.payload.errorMessage;
                console.log(state.error);
            }
            return { ...state };
        },

        [updateAddOption.fulfilled]: (state, action) => {
            const index = state.findIndex(({stock}) => stock.id === action.payload.id);
            state[index] = {
                ...state[index],
                ...action.payload,
            };
        },
    },
});

const { reducer } = addOptionSlice;

// export const addOptionSelector = state => state.addOption;
export const addOptionSelector = ({ addOption }) => addOption;
export default reducer; 