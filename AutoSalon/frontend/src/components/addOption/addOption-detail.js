import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import { userSelector, retriveUserData } from "../../slices/userSlice";

const AddOptionDetail = ({ addOption }) => {
    return (
        <Fragment>
            <div style={{textAlign: "left"}}>
                <h5 className="mb-3" style={{textAlign: "center"}}>
                    {`${addOption.name}`}
                </h5>
                <div className="info">
                    <p>Цена вместе с установкой -
                        <span> {addOption.price} руб.</span>
                    </p>
                    <p>Описание:
                        <br/>
                        <span>{addOption.description}</span>
                    </p>
                </div>
            </div>
        </Fragment>
    );
};

export default AddOptionDetail;