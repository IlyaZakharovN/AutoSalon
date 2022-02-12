import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import { userSelector, retriveUserData } from "../../slices/userSlice";

const AddOptionDetail = ({ addOption }) => {
    const { isAuthenticated, is_superuser, is_sales_director, is_puchase_manager } = useSelector(userSelector);
    const dispatch = useDispatch();

    return (
        <Fragment>
            <div style={{textAlign: "left"}}>
                <h5 className="mb-3" style={{textAlign: "center"}}>
                    {`${addOption.name}`}
                </h5>
                <p>{`Цена вместе с установкой - ${addOption.price} руб.`}</p>
                <p>
                    {`Описание:`}
                    <br/>
                    <span>{`${addOption.description}`}</span>
                </p>
            </div>
        </Fragment>
    );
};

export default AddOptionDetail;