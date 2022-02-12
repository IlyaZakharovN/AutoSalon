import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

import { deleteAddOption } from "../../slices/addOptionSlice";

const AddOptionDelete = ({ addOption }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = addOption.id;

    const removeAddOption = () => {
        dispatch(deleteAddOption({ id: id }))
        .unwrap()
        .then(() => {
            navigate('/add-options');
        })
        .catch(e => {
            console.log("Error happened while running removeAddOption.");
            console.log(e);
        });
    };

    return (
        <Fragment>
            <h5>Удалить доп. оборудование из каталога</h5>
            <div>
                <Button 
                    type="submit" 
                    variant="danger"
                    onClick={removeAddOption}
                >
                    Удалить
                </Button>
            </div>
        </Fragment>
    );
};

export default AddOptionDelete;