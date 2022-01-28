import React from "react";
import { useDispatch, useSelector } from "react-redux";

// import SingleCarModelUpdate from "./crud";
import { userSelector, retriveUserData } from "../../slices/userSlice";


const SingleCarModel = ({ singleCarModel }) => {
    const { isAuthenticated, is_superuser, is_sales_director, is_puchase_manager } = useSelector(userSelector);

    return (
        <div>
            <h2>{singleCarModel.brand + " " + singleCarModel.model}</h2>
            {/* { isAuthenticated && (is_superuser || is_sales_director || is_puchase_manager) &&
            <div>
                {SingleCarModelUpdate()}
            </div> } */}
        </div>
    );
};

export default SingleCarModel;