import React, { Fragment } from "react";
// import { Breadcrumb } from "react-bootstrap"; // maybe add later
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import { userSelector, retriveUserData } from "../../slices/userSlice";

export const CarPage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { isAuthenticated, is_superuser, is_sales_director, is_puchase_manager } = useSelector(userSelector);

    const renderCar = () => {};

    const renderUpdateForm = () => {};

    const renderDeleteFeature = () => {};

    return ();
};