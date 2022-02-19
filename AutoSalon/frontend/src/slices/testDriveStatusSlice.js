import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { axiosDefault } from "../http-common"; 

const initialState = {
    testDriveStatus: [],
};

//// Get all testdrive statuses  ////
export const getAllTestDriveStatuses = createAsyncThunk(
    "testDriveStatus/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get("/testdrives/testdrive-status/");
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while retriving testdrive statuses.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Retrive a testdrive status record by ID /////
export const fetchTestDriveStatus = createAsyncThunk(
    "testDriveStatus/fetchOne",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get(`/testdrives/testdrive-status/${id}/`);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while fetching a testdrive status record.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);


const testDriveStatusSlice = createSlice({
    name: "testDriveStatus",
    initialState,
    reducers: {},
    extraReducers: {
        [getAllTestDriveStatuses.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [getAllTestDriveStatuses.rejected]: (state, action) => {
            return { ...initialState };
        },

        [fetchTestDriveStatus.fulfilled]: (state, action) => {
            return {...action.payload};
        },
        [fetchTestDriveStatus.rejected]: (state, action) => {
            return { ...initialState };
        },
    },
});

const { reducer } = testDriveStatusSlice;

export const testDriveStatusSelector = state => state.testDriveStatus;
export default reducer; 