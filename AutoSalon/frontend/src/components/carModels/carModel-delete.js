import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { deleteCarModel } from "../../slices/carModelsSlice";

const CarModelDelete = ({ carModel }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const id = carModel.id;

    const removeCarModel = () => {
        dispatch(deleteCarModel({ id: id }))
        .unwrap()
        .then(() => {
            navigate('/carmodels');
        })
        .catch(e => {
            console.log('Error happened while running removeCarModel');
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

export default CarModelDelete;