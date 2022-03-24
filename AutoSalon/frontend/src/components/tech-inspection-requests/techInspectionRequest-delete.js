import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

import { deleteTechInspectionRequest } from "../../slices/techInspectionRequestSlice";

export const DeleteTechInspectionRequest = ({
    techInspRequest, techInspection,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = techInspRequest.id;

    const removeTechInspRequest = () => {
        dispatch(deleteTechInspectionRequest({ id: id }))
            .unwrap()
            .then(() => {
                navigate('/tech-inspection-requests/');
                alert("Заявка на тех. осмотр была удалена.");
            })
            .catch(e => {
                console.log("Error happened while running removeTechInspRequest.");
                console.log(e);
            });
    };
    return (
        <Fragment>
            <fieldset
                disabled={(
                    (!techInspection.length) ? false : true
                )}
            >
                <Button 
                    type="submit" 
                    variant="danger"
                    onClick={removeTechInspRequest}
                >
                    Удалить заявку на тех. осмотр
                </Button>
            </fieldset>
        </Fragment>
    );
};