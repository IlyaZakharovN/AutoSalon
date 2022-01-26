import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import User from "../../components/Profile";
import { userSelector, retriveUserData } from "../../slices/userSlice";

const Profile = () => {
    const dispatch = useDispatch();
    const { user, isAuthenticated: userIsAuthenticated, loading: userLoading, hasErrors: userHasErrors } = useSelector(userSelector);

    useEffect(() => {
        dispatch(retriveUserData());
    }, [dispatch]);
    
    const renderProfile = () => {
        if (userLoading) return <p>Загрузка данных пользователя...</p>
        if (userHasErrors) return <p>Невозможно получить данные пользователя.</p>
        if (userIsAuthenticated) return <User/>
    };

    return (
        <section>
            {renderProfile()}
        </section>
    );
};

export default Profile;
