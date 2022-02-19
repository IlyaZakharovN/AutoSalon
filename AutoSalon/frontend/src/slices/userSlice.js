import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Navigate, useNavigate } from "react-router-dom";

import { axiosDefault } from "../http-common"; // axios instance

// const initialState = [];
const initialState = {
    users: [],
    user: {},
    // id: null,
    // name: "",
    // email: "",
    // is_superuser: null,
    // is_sales_director: null,
    // is_sales_manager: null,
    // is_puchase_manager: null,
    // is_tech_inspector: null,

    isAuthenticated: null,
    loading: false, 
    hasErrors: false,
};

//// Get all users ////
const userData = () => {
    return axiosDefault.get("/users");
};

export const retriveUserData = createAsyncThunk(
    "user/retrieve",
    async (_, { rejectWithValue }) => {
        try {
            const res = await userData();
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while fetching users data.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const getUserDetails = createAsyncThunk(
    "user/getDetails",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosDefault.get("/users/current-user");
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error happened while fetching user details.");
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

/// Retrive user by ID /////
// export const fetchUserData = createAsyncThunk(
//     "user/fetch",
//     async (id, { rejectWithValue }) => {
//         try {
//             const res = await axiosDefault.get(`/users/${id}/`);
//             console.log(res.data);
//             return res.data;
//         } catch (err) {
//             console.log("Error happened while fetching a user data.");
//             console.log(err);
//             return rejectWithValue(err.response.data);
//         }
//     }
// );

//// Logout user /////
export const UserLogout = createAsyncThunk(
    "user/logout",
    async () => {
        const navigate = useNavigate();

        const logout = () => {
            localStorage.removeItem('is_superuser');
            localStorage.removeItem('is_sales_director');
            localStorage.removeItem('is_sales_manager');
            localStorage.removeItem('is_puchase_manager');
            localStorage.removeItem('is_tech_inspector');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        };
        
        await logout();
        // try {
        // } catch (e) {
        //     console.log(e);
        // }
        navigate('/login');
    }
);


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
    //     getUser: state => {
    //         state.loading = true
    //     },
    //     getUserSuccess: (state, { payload }) => {
    //         // state.user = payload
    //         state.isAuthenticated = true
    //         state.loading = false
    //         state.hasErrors = false
    //         // console.log(payload);
    //         // state.loading = false;
    //         // state.hasErrors = false;
    //         // state.name = payload.name;
    //         // state.email = payload.email;
    //         // state.is_superuser = payload.is_superuser;
    //         // state.is_sales_director = payload.is_sales_director;
    //         // state.is_sales_manager = payload.is_sales_manager;
    //         // state.is_puchase_manager = payload.is_puchase_manager;
    //         // state.is_tech_inspector = payload.is_tech_inspector;
    //     },
    //     getUserFailure: state => {
    //         state.loading = false
    //         state.hasErrors = true
    //     },
    //     userIsLoggedOut: state => {
    //         state.isAuthenticated = false
    //         state.loading = false
    //         state.hasErrors = false
    //     },
    },
    extraReducers: {
        [retriveUserData.fulfilled]: (state, action) => { // pre:(state, action) |||||| (state, { payload })
            console.log(action.payload);
            // state.isAuthenticated = true;
            // state.loading = false;
            // state.hasErrors = false;
            // return {...initialState.users, ...action.payload};
            return {
                isAuthenticated: true,
                users: {...initialState.users, ...action.payload},
                // ...initialState.users, ...action.payload
            };
            // return {...action.payload};
            // return [...action.payload];

            // state.id = action.payload.id;
            // state.name = action.payload.name;
            // state.email = action.payload.email;
            // state.is_superuser = action.payload.is_superuser;
            // state.is_sales_director = action.payload.is_sales_director;
            // state.is_sales_manager = action.payload.is_sales_manager;
            // state.is_puchase_manager = action.payload.is_puchase_manager;
            // state.is_tech_inspector = action.payload.is_tech_inspector;

            // localStorage.setItem('isAuthenticated', state.isAuthenticated);
            // localStorage.setItem('is_superuser', state.is_superuser);
            // localStorage.setItem('is_sales_director', state.is_sales_director);
            // localStorage.setItem('is_sales_manager', state.is_sales_manager);
            // localStorage.setItem('is_puchase_manager', state.is_puchase_manager);
            // localStorage.setItem('is_tech_inspector', state.is_tech_inspector);
            // console.log('isAuthenticated - ', localStorage.getItem('isAuthenticated'));
            // console.log('is_superuser - ', localStorage.getItem('is_superuser'));
            // console.log('is_sales_director - ', localStorage.getItem('is_sales_director'));
            // console.log('is_sales_manager - ', localStorage.getItem('is_sales_manager'));
            // console.log('is_puchase_manager - ', localStorage.getItem('is_puchase_manager'));
            // console.log('is_tech_inspector - ', localStorage.getItem('is_tech_inspector'));
            // return {...action.payload};
        },

        [getUserDetails.fulfilled]:(state, action) => {
            console.log(action.payload);
            // state.isAuthenticated = true;
            // state.loading = false;
            // state.hasErrors = false;
            // state.id = action.payload.id;
            // state.name = action.payload.name;
            // state.email = action.payload.email;
            // state.is_superuser = action.payload.is_superuser;
            // state.is_sales_director = action.payload.is_sales_director;
            // state.is_sales_manager = action.payload.is_sales_manager;
            // state.is_puchase_manager = action.payload.is_puchase_manager;
            // state.is_tech_inspector = action.payload.is_tech_inspector;
            return {
                isAuthenticated: true,
                user: {...initialState.user, ...action.payload},
            };
        },

        // [fetchUserData.fulfilled]: (state, action) => {
        //     // return {...action.payload};
        //     return {...initialState.user, ...action.payload};
        //     // return [...state.user, state.user.push(action.payload)];
        //     // state.isAuthenticated = true;
        //     // state.id = action.payload.id;
        //     // state.name = action.payload.name;
        //     // state.email = action.payload.email;
        //     // state.is_superuser = action.payload.is_superuser;
        //     // state.is_sales_director = action.payload.is_sales_director;
        //     // state.is_sales_manager = action.payload.is_sales_manager;
        //     // state.is_puchase_manager = action.payload.is_puchase_manager;
        //     // state.is_tech_inspector = action.payload.is_tech_inspector;
        // },
        // [fetchUserData.rejected]: (state, action) => {
        //     return { ...initialState };
        // },
        
        [UserLogout.fulfilled]: (state, action) => {
            state.id = null;
            state.name = null;
            state.email = null;
            state.isAuthenticated = null;
            state.is_superuser = null;
            state.is_sales_director = null;
            state.is_sales_manager = null;
            state.is_puchase_manager = null;
            state.is_tech_inspector = null;
            // return initialState;
        },
    },
});

// const { reducer } = userSlice; // 'reducer' name is a must
// export const { getUser, getUserSuccess, getUserFailure, userIsLoggedOut } = userSlice.actions;
export const { userIsLoggedOut } = userSlice.actions;
export const userSelector = state => state.user;
export default userSlice.reducer;    