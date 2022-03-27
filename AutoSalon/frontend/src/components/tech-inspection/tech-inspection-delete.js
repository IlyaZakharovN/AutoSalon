import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

import { deleteTechInspection } from "../../slices/techInspectionSlice";
import { updateCar } from "../../slices/carSlice";

export const DeleteTechInspection = ({
    techInspection, techInspRequest, car
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = techInspection.id;

    const executeTechInspection = async (data, event) => {
        if (event && event.preventDefault) { 
            event.preventDefault(); 
        };

        await removeTechInspection()
            .then(
                returnCarToStock()
                    .catch(e => {
                        console.log("Error happened while running returnCarToStock.");
                        console.log(e)
                    })
            )
            .then(navigate('/tech-inspections/'))
            .catch(e => {
                console.log('Error happened while running deleteTechInspection in removeTechInspection');
                console.log(e);
            });
    };

    const removeTechInspection = async (data, event) => {
        await dispatch(deleteTechInspection({ id: id }))
            .unwrap()
            .then(alert("Запись тех. осмотра была удалена."))
            .catch(e => {
                console.log("Error happened while running removeTechInspection.");
                console.log(e);
            });
    };

    const returnCarToStock = async (data, event) => {
        let carPatchData = new FormData();
        carPatchData.append('status', 1);

        await dispatch(updateCar({ 
            id: techInspection.VIN, 
            data: carPatchData 
        }))
            .unwrap()
            .then(alert('Статус автомобиля изменен на "В наличии".'))
            .catch(e => {
                console.log("Error happened while running returnCarToStock.");
                console.log(e);
            });
    };

    return (
        <Fragment>
            <Button 
                type="submit" 
                variant="danger"
                onClick={executeTechInspection}
            >
                Удалить тех. осмотр
            </Button>
        </Fragment>
    );
};