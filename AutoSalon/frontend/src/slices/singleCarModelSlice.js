import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    singleCarModel: {},
    loading: false, 
    hasErrors: false,
}

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
});

export const { getCarModel, getCarModelSuccess, getCarModelFailure } = singleCarModelSlice.actions;
export const singleCarModelSelector = state => state.singleCarModel;
export default singleCarModelSlice.reducer;

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