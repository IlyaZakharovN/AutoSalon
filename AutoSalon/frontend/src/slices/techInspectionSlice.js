import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { axiosDefault, axiosMultipart } from "../http-common"; 

const initialState = {
    techInspection: [],
};

//// Get all tech inspection records ////
export const getAllTechInspections = createAsyncThunk(
    "techInspection/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get("/techinspections/tech-inspections/");
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while retriving tech inspections records.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Retrive a tech inspection record by ID /////
export const fetchTechInspection = createAsyncThunk(
    "techInspection/fetchOne",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get(`/techinspections/tech-inspections/${id}/`);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while fetching a tech inspection record.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Add a tech inspection record /////
export const createTechInspection = createAsyncThunk(
    "techInspection/create",
    async (data, { rejectWithValue }) => {
        try {
            const res = axiosMultipart.post("/techinspections/tech-inspections/", data);
            console.log(data);
            return res.data;
        } catch (err) {
            console.log("Error happened while creating a tech inspection record.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Patrial Update tech inspection record /////
export const updateTechInspection = createAsyncThunk(
    "techInspection/partial-update",
    async ({ id, data, rejectWithValue }) => {
        try {
            // console.log('Initial data - ', data);
            const res = await axiosMultipart.patch(`/techinspections/tech-inspections/${id}/`, data);
            // console.log('Updated data - ', res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while patching a tech inspection record.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Delete tech inspection record /////
export const deleteTechInspection = createAsyncThunk(
    "techInspection/delete",
    async ({ id }) => {
        try {
            const res = await axiosDefault.delete(`/techinspections/tech-inspections/${id}/`);
            return { id };
        } catch (err) {
            console.log("Error happened while deleting the tech inspection record.");
            console.log(err);
        }
    }
);


const techInspectionSlice = createSlice({
    name: "techInspection",
    initialState,
    reducers: {},
    extraReducers: {
        [getAllTechInspections.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [getAllTechInspections.rejected]: (state, action) => {
            return { ...initialState };
        },

        [fetchTechInspection.fulfilled]: (state, action) => {
            return {...action.payload};
        },
        [fetchTechInspection.rejected]: (state, action) => {
            return { ...initialState };
        },

        [createTechInspection.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.push(action.payload);
            // return { ...state };
        },
        // [createTestDrive.pending]: (state, action) => {
        //     console.log(action.meta.arg);
        // },
        [createTechInspection.rejected]: (state, action) => {
            if (action.payload) {
                state.error = action.payload.errorMessage;
                console.log(state.error);
            }
            
            return { ...state };
        },

        [updateTechInspection.fulfilled]: (state, action) => {
            const index = state.findIndex(({techInspection}) => 
                techInspection.id === action.payload.id
            );

            state[index] = {
                ...state[index],
                ...action.payload,
            };
        },
    },
});

const { reducer } = techInspectionSlice;

export const techInspectionSelector = state => state.techInspection;
export default reducer; 