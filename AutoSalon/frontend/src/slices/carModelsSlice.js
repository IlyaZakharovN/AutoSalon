// Slice is a collection of Redux reducer logic and actions for a single feature

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import CarModelDataService from "../services/CarModelService";

const initialState = [];

export const retriveCarModels = createAsyncThunk(
    "carModels/retrieve",
    async () => {
        const res = await CarModelDataService.getAllCarModels();
        console.log(res.data);
        return res.data;
    }
);

const carModelSlice = createSlice({
    name: "carModel",
    initialState,
    extraReducers: {
        [retriveCarModels.fulfilled]: (state, action) => {
            return [...action.payload];
        },
    },
});

const { reducer } = carModelSlice; // 'reducer' name is a must

export default reducer;    