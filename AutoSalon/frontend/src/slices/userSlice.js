import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Navigate, useNavigate } from "react-router-dom";

import httpCommon from "../http-common"; // axios instance

// const initialState = [];
const initialState = {
    // user: [],
    name: "",
    email: "",
    is_superuser: null,
    is_sales_director: null,
    is_sales_manager: null,
    is_puchase_manager: null,
    is_tech_inspector: null,

    isAuthenticated: null,
    loading: false, 
    hasErrors: false,
};

const userData = () => {
    return httpCommon.get("/me");
};

export const retriveUserData = createAsyncThunk(
    "user/retrieve",
    async () => {
        const res = await userData();
        console.log(res.data);
        return res.data;
    }
);

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
        getUser: state => {
            state.loading = true
        },
        getUserSuccess: (state, { payload }) => {
            // state.user = payload
            state.isAuthenticated = true
            state.loading = false
            state.hasErrors = false
            // console.log(payload);
            // state.loading = false;
            // state.hasErrors = false;
            // state.name = payload.name;
            // state.email = payload.email;
            // state.is_superuser = payload.is_superuser;
            // state.is_sales_director = payload.is_sales_director;
            // state.is_sales_manager = payload.is_sales_manager;
            // state.is_puchase_manager = payload.is_puchase_manager;
            // state.is_tech_inspector = payload.is_tech_inspector;
        },
        getUserFailure: state => {
            state.loading = false
            state.hasErrors = true
        },
    },
    extraReducers: {
        [retriveUserData.fulfilled]: (state, action) => { // pre:(state, action) |||||| (state, { payload })
            // return {...action.payload};
            console.log(action.payload);
            state.isAuthenticated = true;
            state.loading = false;
            state.hasErrors = false;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.is_superuser = action.payload.is_superuser;
            state.is_sales_director = action.payload.is_sales_director;
            state.is_sales_manager = action.payload.is_sales_manager;
            state.is_puchase_manager = action.payload.is_puchase_manager;
            state.is_tech_inspector = action.payload.is_tech_inspector;

            localStorage.setItem('isAuthenticated', state.isAuthenticated);
            localStorage.setItem('is_superuser', state.is_superuser);
            localStorage.setItem('is_sales_director', state.is_sales_director);
            localStorage.setItem('is_sales_manager', state.is_sales_manager);
            localStorage.setItem('is_puchase_manager', state.is_puchase_manager);
            localStorage.setItem('is_tech_inspector', state.is_tech_inspector);
            console.log('isAuthenticated - ', localStorage.getItem('isAuthenticated'));
            console.log('is_superuser - ', localStorage.getItem('is_superuser'));
            console.log('is_sales_director - ', localStorage.getItem('is_sales_director'));
            console.log('is_sales_manager - ', localStorage.getItem('is_sales_manager'));
            console.log('is_puchase_manager - ', localStorage.getItem('is_puchase_manager'));
            console.log('is_tech_inspector - ', localStorage.getItem('is_tech_inspector'));
            // return {...action.payload};
        },
        [UserLogout.fulfilled]: (state, action) => {
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
export const { getUser, getUserSuccess, getUserFailure } = userSlice.actions;
export const userSelector = state => state.user;
export default userSlice.reducer;    


























// const initialState = {
//     token: null,
//     loading: false,
//     userData: {}
// };

// export const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {},
//     extraReducers: {
//         [signOut.fulfilled]: (state, action) => {
//             state.loading = false;
//             state.userData = {};
//             state.token = null;
//         },
//         [login.pending]: (state, action) => {
//             state.loading = true;
//         },
//         [login.fulfilled]: (state, action) => {
//             const {accessToken, user} = action.payload;
//             state.token = accessToken;
//             state.userData = user;
//             state.loading = false;
//         },
//         [login.rejected]: (state, action) => {
//             state.loading = false;
//         },
//         [fetchUserData.pending]: (state, action) => {
//             state.loading = true;
//         },
//         [fetchUserData.fulfilled]: (state, action) => {
//             const {accessToken, user} = action.payload;
//             state.token = accessToken;
//             state.userData = user;
//             state.loading = false;
//         },
//         [fetchUserData.rejected]: (state, action) => {
//             state.loading = false;
//             state.userData = {};
//             state.token = null;
//         }
//     },
// })


// export const {} = authSlice.actions;

// export default authSlice.reducer;

// export const loginUser = createAsyncThunk(
//     'users/loginUser',
//     async ({ name, email, password, is_superuser, is_sales_director, is_sales_manager, is_puchase_manager, is_tech_inspector }, thunkAPI) => {
//         try {
//             const response = await axios.get(
//                 `http://127.0.0.1:8000/api/token/`,
//                 {
//                     method: 'GET',
//                     body: JSON.stringify({ 
//                         name,
//                         email, 
//                         password,
//                         is_superuser,
//                         is_sales_director,
//                         is_sales_manager,
//                         is_puchase_manager,
//                         is_tech_inspector,
//                     }),
//                     headers: {
//                         'Content-Type': 'application/json',
//                         accept: "application/json",
//                     }
//             });
//             let data = await response.json();
//             console.log('Got data: ', data);
//             if (response.status === 200) {
//                 localStorage.setItem('access_token', data.token);
//                 return data;
//             } else {
//                 return thunkAPI.rejectWithValue('111',data);
//             }
//         } catch (e) {
//             console('Error: ', e.response.data);
//             return thunkAPI.rejectWithValue('222',e.response.data);
//         }
//     }
// );

// export const userSlice = createSlice({
//     name: "user",
//     initialState: {
//         name: "",
//         email: "",
//         is_superuser: null,
//         is_active: null,
//         is_staff: null,
//         is_sales_director: null,
//         is_sales_manager: null,
//         is_puchase_manager: null,
//         is_tech_inspector: null,

//         isFetching: false,
//         isSuccess: false,
//         isError: false,
//         errorMessage: "",
//     },

//     reducers: {
//         clearState: (state) => {
//             state.isError = false;
//             state.isSuccess = false;
//             state.isFetching  = false;
//             return state;
//         },
//     },

//     extraReducers: {
//         [loginUser.fulfilled]: (state, { payload }) => {
//             state.email = payload.email;
//             state.name = payload.name;
//             state.is_superuser = payload.is_superuser;
//             state.is_sales_director = payload.is_sales_director;
//             state.is_sales_manager = payload.is_sales_manager;
//             state.is_puchase_manager = payload.is_puchase_manager;
//             state.is_tech_inspector = payload.is_tech_inspector;
//             state.isFetching = false;
//             state.isSuccess = true;
//             return state;
//         },
//         [loginUser.rejected]: (state, { payload }) => {
//             console.log('Payload - ', payload);
//             state.isFetching = false;
//             state.isError = false;
//             state.errorMessage = payload.message;
//         },
//         [loginUser.pending]: (state) => {
//             state.isFetching = true;
//         },
//     },
// });

// export const { clearState } = userSlice.actions;
// export const userSelector = state => state.user;
// export default userSlice.reducer;