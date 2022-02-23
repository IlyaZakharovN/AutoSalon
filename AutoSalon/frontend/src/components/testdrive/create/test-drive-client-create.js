import React, { Fragment, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { createTestDrive, getAllTestDrives } from "../../../slices/testDriveSlice";

export const CreateTestDriveClient = ({cars, carModels, puproses, testDriveStatuses }) => {
    // const initialStatus = Array.isArray(testDriveStatuses) 
    // && testDriveStatuses
    //     .filter(tds => tds.id === 1);
    // console.log(testDriveStatuses[1].id);
    
    const initialTDState = Object.freeze({
        VIN: null,
        date_time: null,
        seller: "",
        client_name: "",
        client_phone: null,
        status: testDriveStatuses[1].id,
    });

    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',}); 
    const [newTestDrive, setNewTestDrive] = useState(initialTDState);
    const dispatch = useDispatch(); 

    const handleTdChange = event => {
        console.log(event.target.name, " - ", event.target.value);
        setNewTestDrive({ ...newTestDrive, [event.target.name]: event.target.value });
        console.log(newTestDrive);
    };

    const saveTD = async (data, event) => {
        event.preventDefault();
        let newTdData = new FormData();
        newTdData.append('VIN', newTestDrive.VIN);
        newTdData.append('date_time', newTestDrive.date_time);
        newTdData.append('seller', newTestDrive.seller);
        newTdData.append('client_name', newTestDrive.client_name);
        newTdData.append('client_phone', newTestDrive.client_phone);
        newTdData.append('status', newTestDrive.status);

        for (var value of newTdData.values()) {
            await console.log(value);
        };

        await dispatch(createTestDrive(newTdData))
            .unwrap()
            .catch(e => {
                console.log('Error happened while running saveTD');
                console.log(e);
            });

        await dispatch(getAllTestDrives());
        // window.location.reload();
    };

    return (
        <Fragment>
            <h4>Записаться на тест-драйв</h4>
            <p>Оставьте заявку и в ближайшее время наши сотрудники свяжутся с вами, чтобы уточнить подробности.</p>

            <Form onSubmit={handleSubmit(saveTD)}>
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="VIN">Выберите модель автомобиля</Form.Label>
                    <Form.Select
                        {...register("VIN", { required: true })}
                        size="md"
                        id="VIN"
                        name="VIN"
                        value={newTestDrive.VIN}
                        onChange={handleTdChange}
                    >
                        <option key='blankChoice' hidden value />
                        {Array.isArray(carModels) && carModels
                            .map((carModel, index) => (
                            Array.isArray(cars) && cars
                                .filter(car => (
                                    car.model_id === carModel.id && 
                                    car.purpose === 3
                                ))
                                .map((car, index) => (
                                    <option value={car.VIN} key={car.VIN}>
                                        {`${carModel.brand} ${carModel.model} ${carModel.year}
                                        в комплектации  ${carModel.package_name}`}
                                    </option>
                                ))
                            ))
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="date_time">Выберите предпочитаемую дату и время проведения тестдрайва</Form.Label>
                    <Form.Control
                        {...register("date_time", { required: true })}
                        size="md"
                        type="datetime-local"
                        id="date_time"
                        name="date_time"
                        value={newTestDrive.date_time}
                        onChange={handleTdChange}
                    />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="client_name">Как к Вам обращаться?</Form.Label>
                    <Form.Control
                        {...register("client_name", { required: true })}
                        size="md"
                        type="text"
                        id="client_name"
                        name="client_name"
                        value={newTestDrive.client_name}
                        onChange={handleTdChange}
                    />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="client_phone">Укажите ваш номер телефона</Form.Label>
                    <Form.Control
                        {...register("client_phone", { 
                            required: true ,
                            pattern: /^\+{1}7{1}\d{10}$/
                        })}
                        size="md"
                        type="tel"
                        minLength={12}
                        maxLength={12}
                        placeholder="+7..."
                        id="client_phone"
                        name="client_phone"
                        value={newTestDrive.client_phone}
                        onChange={handleTdChange}
                    />
                </Form.Group>

                <div>
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block"
                    >
                        Оставить заявку
                    </button>
                </div>
            </Form>
        </Fragment>
    );
};