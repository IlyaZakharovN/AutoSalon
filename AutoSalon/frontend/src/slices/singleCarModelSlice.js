import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosDefault } from "../http-common";

export const initialState = {
    singleCarModel: {},
    loading: false, 
    hasErrors: false,
}
///// Create single car model /////
// maybe transfer it later

///// Get single car model /////
export function fetchCarModel(id) {
    return async dispatch => {
        dispatch(getCarModel());

        try {
            const response = await fetch(`http://127.0.0.1:8000/carmodels/${id}`, {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            dispatch(getCarModelSuccess(data));
        } catch (error) {
            console.log(error);
            dispatch(getCarModelFailure());
        }
    }
};

///// Update single car model /////
const partialUpdate = (id, data) => {
    return axiosDefault.patch(`/carmodels/${id}/`, data);
};

export const updateSingleCarModel = createAsyncThunk(
    "singleCarModel/partial-update",
    async ({ id, data }) => {
        console.log('Initial data - ', data);
        const res = await partialUpdate(id, data);
        console.log('Updated data - ', res.data);
        return res.data;
    }
);

///// Delete single car model /////

const singleCarModelSlice = createSlice({ // a slice automatically generates reducers, action types, action creators
    name: 'singleCarModel',
    initialState,
    reducers: { 
        getCarModel: state => {
            state.loading = true
        },
        getCarModelSuccess: (state, { payload }) => {
            state.singleCarModel = payload
            state.loading = false
            state.hasErrors = false
        },
        getCarModelFailure: state => {
            state.loading = false
            state.hasErrors = true
        },
    },
    extraReducers: {
        [updateSingleCarModel.fulfilled]: (state, action) => {
            const index = state.findIndex(singleCarModel => singleCarModel.id === action.payload.id);
            state[index] = {
                ...state[index],
                ...action.payload,
            };
        },
    },
});

export const { getCarModel, getCarModelSuccess, getCarModelFailure } = singleCarModelSlice.actions;
export const singleCarModelSelector = state => state.singleCarModel;
export default singleCarModelSlice.reducer;