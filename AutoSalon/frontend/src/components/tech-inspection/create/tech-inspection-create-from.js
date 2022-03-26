import React, { Fragment, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { 
    createTechInspection, 
    getAllTechInspections
} from "../../../slices/techInspectionSlice";

export const CreateTechInpectionFrom = ({
    techInspRequest, techInspections, 
    user
}) => {
    const tiExists = Array.isArray(techInspections) && techInspections
        .filter(ti => ti.request === techInspRequest.id);

    const { 
        register, handleSubmit, formState: { errors } 
    } = useForm({reValidateMode: 'onChange',}); 
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const saveTI = async (data, event) => {
        event.preventDefault(); 

        const date = new Date();
        const today = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();

        let newTiData = new FormData();
        newTiData.append('inspector', user.id);
        newTiData.append('VIN', techInspRequest.VIN);
        newTiData.append('request', techInspRequest.id);
        newTiData.append('start_date', today);

        // console.log(' ----- ');
        // for (var pair of newTiData.entries()) {
        //     console.log(pair[0]+ ' - '+ pair[1]);
        // };

        if (newTiData.VIN !== null || newTiData.request !== null) {    
            await dispatch(createTechInspection(newTiData))
                .unwrap()
                .catch(e => {
                    console.log('Error happened while running saveTI');
                    console.log(e);
                })
                .then(alert("Запись тех. осмотра была добавлена."))
                .then(dispatch(getAllTechInspections()))
                .then(navigate(`/tech-inspections/${techInspRequest.id}`));
        } else {
            await alert("Что-то пошло не так.");
        };
    };

    return (
        tiExists.length ? (
            <></>
        ) : (
            <Fragment>
                <h5 className="mt-5">Создать тех. осмотр</h5>

                <Form onSubmit={handleSubmit(saveTI)} className="form-required">
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block"
                    >
                        Добавить запись на тех. осмотра
                    </button>
                </Form>
            </Fragment>
        )
    );
};