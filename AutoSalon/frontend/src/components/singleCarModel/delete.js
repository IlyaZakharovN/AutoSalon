import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

import { deleteSingleCarModel } from "../../slices/singleCarModelSlice";

const SingleCarModelDelete = ({ singleCarModel }) => {
    const dispatch = useDispatch();
    // const params = useParams();
    const navigate = useNavigate();

    const id = singleCarModel.id;

    const removeCarModel = () => {
        dispatch(deleteSingleCarModel({ id: id }))
        .unwrap()
        .then(() => {
            navigate('/carmodels');
        })
        .catch(e => {
            console.log(e);
        });
    };

    return (
        <Fragment>
            <h5>Удалить модель автомобиля</h5>
            <div>
                <Button 
                    type="submit" 
                    variant="danger"
                    onClick={removeCarModel}
                >
                    Удалить модель
                </Button>
            </div>
        </Fragment>
    );
};

export default SingleCarModelDelete;