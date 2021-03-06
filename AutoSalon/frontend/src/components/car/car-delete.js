import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

import { deleteCar } from "../../slices/carSlice";
import { deleteStock } from "../../slices/stockSlice";

const CarDelete = ({ car, stock }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const vin = car.VIN;
    const stockId = stock.id;

    const removeData = async (event) => {
        await Promise.all([removeStock(),removeCar() ]);
        console.log('Car and stock record are deleted.')
        navigate('/cars');
        alert("Автомобиль удален из каталога.");
    };

    const removeCar = () => {
        dispatch(deleteCar({ vin: vin }))
            .unwrap()
            .catch(e => {
                console.log(e);
            });
    };

    const removeStock = () => {
        dispatch(deleteStock({ id: stockId }))
            .unwrap()
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <Fragment>
            <h5>Удалить автомобиль из каталога</h5>
            <div>
                <Button 
                    type="submit" 
                    variant="danger"
                    onClick={removeData}
                >
                    Удалить авто
                </Button>
            </div>
        </Fragment>
    );
};

export default CarDelete;