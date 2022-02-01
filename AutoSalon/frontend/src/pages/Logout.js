import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate  } from 'react-router-dom';

import axiosDefault from '../http-common';
import { UserLogout } from '../slices/userSlice';


const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    dispatch(UserLogout());
    useEffect(() => {
        navigate('/login');
    })

    // useEffect(() => {
    //     localStorage.removeItem('is_superuser');
    //     localStorage.removeItem('is_sales_director');
    //     localStorage.removeItem('is_sales_manager');
    //     localStorage.removeItem('is_puchase_manager');
    //     localStorage.removeItem('is_tech_inspector');

    //     localStorage.removeItem('access_token');
    //     localStorage.removeItem('refresh_token');
    //     httpCommon.defaults.headers['Authorization'] = null;
    //     navigate('/login');
    //     window.location.reload();

    //     console.log("access_token after logout - ", localStorage.getItem('access_token'));

    //     console.log('is_superuser - ', localStorage.getItem('is_superuser'));
    //     console.log('is_sales_director - ', localStorage.getItem('is_sales_director'));
    //     console.log('is_sales_manager - ', localStorage.getItem('is_sales_manager'));
    //     console.log('is_tech_inspector - ', localStorage.getItem('is_tech_inspector'));
    //     console.log('is_puchase_manager - ', localStorage.getItem('is_puchase_manager'));
    // });
    return <div>Logout</div>;
};

export default Logout;