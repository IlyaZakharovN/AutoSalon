import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

import { deleteSale } from "../../slices/saleSlice";

const SaleDelete = ({ sale }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = sale.id;

    const removeSale = () => {
        dispatch(deleteSale({ id: id }))
            .unwrap()
            .then(() => {
                navigate('/sales');
                alert("Запись акта продажи была удалена.");
            })
            .catch(e => {
                console.log("Error happened while running removeCar.");
                console.log(e);
            });;
    };

    return (
        <Fragment>
            <div>
                <Button 
                    type="submit" 
                    variant="danger"
                    onClick={removeSale}
                >
                    Удалить запись продажи
                </Button>
            </div>
        </Fragment>
    );
};

export default SaleDelete;