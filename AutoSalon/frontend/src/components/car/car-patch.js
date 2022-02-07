import React, { Fragment, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { updateCar } from "../../slices/carSlice";

const CarUpdate = () => {
    const initialCarState = {
        VIN: car.VIN,
        model_id: car.model_id,
        price: car.price,
        purpose: car.purpose,
        note: car.note,
        // multiple images
    };

    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',}); 

    let patchData = new FormData();

    const handleInputChange = event => {
        const {name, value} = event.target;
        console.log("handleChange -> " + name + ":" + value);
        // setCurrentCarModel({ ...currentCarModel, [name]: value});
        patchData.append(`${name}`, value);
        console.log(JSON.stringify(patchData));
        // console.log(patchData);
    };

    const updateContent = (event) => { // add notification/popups on success and on failure 
        // event.preventDefault();
        
        dispatch(updateCar({ id: car.id, data: patchData }))
        .unwrap()
        .then(response => {
            console.log('response - ', response);
        })
        .catch(e => {
            console.log(e);
        });
    };

    return (
        <Fragment>
            <h4>Изменить данные автомобиля</h4>
        </Fragment>
    );
};

export default CarUpdate;