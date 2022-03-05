import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { axiosMultipart, axiosDefault } from "../http-common";

const initialState = {
    carModelPhotos: [],
};

///// Get all car models photos /////
export const getAllCarModelPhotos = createAsyncThunk(
    "carModelPhotos/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get("/carmodels/photos");
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while getting all car model photos.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Retrive a car model by id /////
export const fetchCarModelPhoto = createAsyncThunk(
    "carModelPhotos/fetchOne",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get(`/carmodels/photos/${id}/`);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while fetching a car model photo.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

///// Upload a car model photo /////
export const uploadCarModelPhoto = createAsyncThunk(
    "carModelPhotos/upload",
    async (data, { rejectWithValue }) => {
        try {
            const res = axiosMultipart.post("/carmodels/photos/", data);
            console.log(res);
            return res.data;
        } catch (err) {
            console.log("Error happened while uploading a car model photo.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);


const carModelPhotosSlice = createSlice({
    name: "carModelPhotos",
    initialState,
    reducers: {},
    extraReducers: {
        [getAllCarModelPhotos.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [getAllCarModelPhotos.rejected]: (state, action) => {
            return {
                ...initialState
            }
        },

        [fetchCarModelPhoto.fulfilled]: (state, action) => {
            return {...action.payload};
        },
        [fetchCarModelPhoto.rejected]: (state, action) => {
            return { ...initialState };
        },

        [uploadCarModelPhoto.fulfilled]: (state, action) => {
            state.push(action.payload);
            return { ...state };
        },
        [uploadCarModelPhoto.rejected]: (state, action) => {
            if (action.payload) {
                state.error = action.payload.errorMessage;
                console.log(state.error);
            } 
            return { ...state };
        },

        // [deleteSingleCarModel.fulfilled]: (state,action) => {
        //     let index = state.findIndex(({ id }) => id === action.payload.id);
        //     state.splice(index, 1);
        // },
    },
});

const { reducer } = carModelPhotosSlice; // 'reducer' name is a must

export const carModelPhotosSelector = state => state.carModelPhotos;
export default reducer;    