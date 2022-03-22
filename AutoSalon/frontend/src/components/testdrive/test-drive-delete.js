import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

import { deleteTestDrive } from "../../slices/testDriveSlice";

export const TestDriveDelete = ({ testdrive }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = testdrive[0].id;

    const removeTestDrive = () => {
        dispatch(deleteTestDrive({ id: id }))
            .unwrap()
            .then(() => {
                navigate('/testdrives');
                alert("Запись тест-драйва была удалена.");
            })
            .catch(e => {
                console.log("Error happened while running removeTestDrive.");
                console.log(e);
            });;
    };

    return (
        <Fragment>
            <div>
                <Button 
                    type="submit" 
                    variant="danger"
                    onClick={removeTestDrive}
                >
                    Удалить запись тестдрайва
                </Button>
            </div>
        </Fragment>
    );
};