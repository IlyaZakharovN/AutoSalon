import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { axiosMultipart, axiosDefault } from "../http-common";

const initialState = {
    carPhotos: [],
};

///// Get all car photos /////
export const getAllCarPhotos = createAsyncThunk(
    "carPhotos/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get("/cars/photos");
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while getting all car photos.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Retrive a car by id /////
export const fetchCarPhoto = createAsyncThunk(
    "carPhotos/fetchOne",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get(`/cars/photos/${id}/`);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while fetching a car photo.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Upload a car photo /////
export const uploadCarPhoto = createAsyncThunk(
    "carPhotos/upload",
    async (data, { rejectWithValue }) => {
        try {
            const res = axiosMultipart.post("/cars/photos/", data);
            console.log(res);
            return res.data;
        } catch (err) {
            console.log("Error happened while uploading a car photo.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);


const carPhotosSlice = createSlice({
    name: "carPhotos",
    initialState,
    reducers: {},
    extraReducers: {
        [getAllCarPhotos.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [getAllCarPhotos.rejected]: (state, action) => {
            return {
                ...initialState
            };
        },

        [fetchCarPhoto.fulfilled]: (state, action) => {
            return {...action.payload};
        },
        [fetchCarPhoto.rejected]: (state, action) => {
            return { ...initialState };
        },

        [uploadCarPhoto.fulfilled]: (state, action) => {
            state.push(action.payload);
            return { ...state };
        },
        [uploadCarPhoto.rejected]: (state, action) => {
            if (action.payload) {
                state.error = action.payload.errorMessage;
                console.log(state.error);
            } 
            return { ...state };
        },
    },
});

const { reducer } = carPhotosSlice; 

export const carPhotosSelector = state => state.carPhotos;
export default reducer;    