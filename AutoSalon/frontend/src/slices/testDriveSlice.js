import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { axiosDefault } from "../http-common"; 

const initialState = {
    testdrive: [],
};

//// Get all testdrive records ////
export const getAllTestDrives = createAsyncThunk(
    "testdrive/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get("/testdrives/testdrive/");
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while retriving testdrive records.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Retrive a testdrive record by ID /////
export const fetchTestDrive = createAsyncThunk(
    "testdrive/fetchOne",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get(`/testdrives/testdrive/${id}/`);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while fetching a testdrive record.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Add a testdrive record /////
export const createTestDrive = createAsyncThunk(
    "testdrive/create",
    async (data, { rejectWithValue }) => {
        try {
            const res = axiosDefault.post("/testdrives/testdrive/", data);
            console.log(data);
            return res.data;
        } catch (err) {
            console.log("Error happened while creating a testdrive record.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Patrial Update testdrive record /////
export const updateTestDrive = createAsyncThunk(
    "testdrive/partial-update",
    async ({ id, data }) => {
        console.log('Initial data - ', data);
        const res = await axiosDefault.patch(`/testdrives/testdrive/${id}/`, data);
        console.log('Updated data - ', res.data);
        return res.data;
    }
);

///// Delete testdrive record /////
export const deleteTestDrive = createAsyncThunk(
    "testdrive/delete",
    async ({ id }) => {
        try {
            const res = await axiosDefault.delete(`/testdrives/testdrive/${id}/`);
            return { id };
        } catch (err) {
            console.log("Error happened while deleting the testdrive record.");
            console.log(err);
        }
    }
);


const testDriveSlice = createSlice({
    name: "testdrive",
    initialState,
    reducers: {},
    extraReducers: {
        [getAllTestDrives.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [getAllTestDrives.rejected]: (state, action) => {
            return { ...initialState };
        },

        [fetchTestDrive.fulfilled]: (state, action) => {
            return {...action.payload};
        },
        [fetchTestDrive.rejected]: (state, action) => {
            return { ...initialState };
        },

        [createTestDrive.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.push(action.payload);
            // return { ...state };
        },
        // [createTestDrive.pending]: (state, action) => {
        //     console.log(action.meta.arg);
        // },
        [createTestDrive.rejected]: (state, action) => {
            if (action.payload) {
                state.error = action.payload.errorMessage;
                console.log(state.error);
            }
            return { ...state };
        },

        [updateTestDrive.fulfilled]: (state, action) => {
            const index = state.findIndex(({stock}) => stock.id === action.payload.id);
            state[index] = {
                ...state[index],
                ...action.payload,
            };
        },
    },
});

const { reducer } = testDriveSlice;

export const testDriveSelector = state => state.testdrive;
export default reducer; 