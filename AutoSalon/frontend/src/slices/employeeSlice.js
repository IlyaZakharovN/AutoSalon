import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Navigate, useNavigate } from "react-router-dom";

import { axiosDefault } from "../http-common"; // axios instance

const initialState = {
    employees: [],
    // employee: {},
};

//// Get all employees ////
const userData = () => {
    return axiosDefault.get("/users");
};

export const retriveEmplData = createAsyncThunk(
    "employees/getAll",
    async () => {
        const res = await userData();
        // console.log(res.data);
        return res.data;
    }
);

/// Retrive employee by ID /////
export const fetchEmplData = createAsyncThunk(
    "employee/fetchEmployee",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get(`/users/${id}/`);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while fetching an employee data.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);


const employeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {},
    extraReducers: {
        [retriveEmplData.fulfilled]: (state, action) => {
            return [...action.payload];
            // return {...initialState.employees, ...action.payload};
        },
        [retriveEmplData.rejected]: (state, action) => {
            return { ...initialState.employees };
        },

        [fetchEmplData.fulfilled]: (state, action) => {
            // return {...initialState.employee, ...action.payload};
            return {...action.payload};
        },
        [fetchEmplData.rejected]: (state, action) => {
            return { ...initialState };
        },
    },
});

const { reducer } = employeeSlice;

export const employeeSelector = state => state.employee;
export default reducer; 