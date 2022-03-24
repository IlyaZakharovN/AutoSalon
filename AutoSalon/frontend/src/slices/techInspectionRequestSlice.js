import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { axiosDefault } from "../http-common"; 

const initialState = {
    techInspectionRequest: [],
};

//// Get all tech inspection requests ////
export const getAllTechInspectionRequests = createAsyncThunk(
    "techInspectionRequest/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get("/techinspections/requests/");
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while retriving tech inspection requests.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Retrive a tech inspection request by ID /////
export const fetchTechInspectionRequest = createAsyncThunk(
    "techInspectionRequest/fetchOne",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get(`/techinspections/requests/${id}/`);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while fetching a tech inspection request.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Add a tech inspection request /////
export const createTechInspectionRequest = createAsyncThunk(
    "techInspectionRequest/create",
    async (data, { rejectWithValue }) => {
        try {
            const res = axiosDefault.post("/techinspections/requests/", data);
            return res.data;
        } catch (err) {
            console.log("Error happened while creating a tech inspection request.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Patrial Update tech inspection record /////
export const updateTechInspectionRequest = createAsyncThunk(
    "techInspectionRequest/partial-update",
    async ({ id, data, rejectWithValue }) => {
        try {
            console.log('Initial data - ', data);
            const res = await axiosDefault.patch(`/techinspections/requests/${id}/`, data);
            console.log('Updated data - ', res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while patching a tech inspection request.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Delete tech inspection request /////
export const deleteTestDrive = createAsyncThunk(
    "techInspectionRequest/delete",
    async ({ id }) => {
        try {
            const res = await axiosDefault.delete(`/techinspections/requests/${id}/`);
            return { id };
        } catch (err) {
            console.log("Error happened while deleting the tech inspection request.");
            console.log(err);
        }
    }
);


const techInspectionRequestSlice = createSlice({
    name: "techInspectionRequest",
    initialState,
    reducers: {},
    extraReducers: {
        [getAllTechInspectionRequests.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [getAllTechInspectionRequests.rejected]: (state, action) => {
            return { ...initialState };
        },

        [fetchTechInspectionRequest.fulfilled]: (state, action) => {
            return {...action.payload};
        },
        [fetchTechInspectionRequest.rejected]: (state, action) => {
            return { ...initialState };
        },

        [createTechInspectionRequest.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.push(action.payload);
        },
        [createTechInspectionRequest.rejected]: (state, action) => {
            if (action.payload) {
                state.error = action.payload.errorMessage;
                console.log(state.error);
            }

            return { ...state };
        },

        [updateTechInspectionRequest.fulfilled]: (state, action) => {
            const index = state.findIndex(({techInspectionRequest}) => 
                techInspectionRequest.id === action.payload.id
            );
            
            state[index] = {
                ...state[index],
                ...action.payload,
            };
        },
    },
});

const { reducer } = techInspectionRequestSlice;

export const techInspectionRequestSelector = state => state.techInspectionRequest;
export default reducer; 