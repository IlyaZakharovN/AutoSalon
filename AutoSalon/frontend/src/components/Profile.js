import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { userSelector, retriveUserData, getUserDetails } from "../slices/userSlice";

const User = () => {
    const dispatch = useDispatch();

    const { 
        user,
        // name, 
        // email,
        // is_superuser,
        // is_sales_director,
        // is_sales_manager,
        // is_puchase_manager,
        // is_tech_inspector,
        isAuthenticated, 
        // loading: userLoading, 
        // hasErrors: userHasErrors 
    } = useSelector(userSelector);

    // console.log(user.user);

    const initFetch = useCallback(async() => {
        await dispatch(getUserDetails());
    }, [dispatch]);

    useEffect(() =>{
        initFetch();
    }, [initFetch]);

    return (
        (user ? (
            <div>            
                <h4>{user.user.name}</h4>
                <p>{user.user.email}</p>
                <p>is_superuser - {user.user.is_superuser ? 'true' : 'false'}</p>
                <p>is_sales_director - {user.user.is_sales_director ? 'true' : 'false'}</p>
                <p>is_sales_manager - {user.user.is_sales_manager ? 'true' : 'false'}</p>
                <p>is_puchase_manager - {user.user.is_puchase_manager ? 'true' : 'false'}</p>
                <p>is_tech_inspector - {user.user.is_tech_inspector ? 'true' : 'false'}</p> 
            </div>
        ) : (
            <></>
        ))
    );
};

export default User;