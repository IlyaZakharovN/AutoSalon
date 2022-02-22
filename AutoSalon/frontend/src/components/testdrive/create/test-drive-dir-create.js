import React, { Fragment, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { createTestDrive, getAllTestDrives } from "../../../slices/testDriveSlice";
import { retriveUserData } from "../../../slices/userSlice";

export const CreateTestDriveDirector = ({cars, carModels, testDriveStatuses, empls, puproses }) => {
    const initialTDState = Object.freeze({
        VIN: null,
        date_time: null,
        seller: null,
        client_name: "",
        client_phone: null,
        status: null,
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
        }

        await dispatch(createTestDrive(newTdData))
            .unwrap()
            .catch(e => {
                console.log('Error happened while running saveTD');
                console.log(e);
            });

        await dispatch(getAllTestDrives());
        window.location.reload();
    };

    return (
        <Fragment>
            <h4>Добавить запись тестдрайва</h4>

            <Form onSubmit={handleSubmit(saveTD)}>
            <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="VIN">Автомобиль</Form.Label>
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
                                        {`${car.VIN} - ${car.price}  руб.,  ${carModel.model} ${carModel.year}
                                        в комплектации  ${carModel.package_name}`}
                                    </option>
                                ))
                            ))
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="date_time">Дата и время проведения тестдрайва</Form.Label>
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
                    <Form.Label className='mb-1' htmlFor="seller">
                        Отвественный за проведение тестдрайва
                    </Form.Label>
                    <Form.Select
                        {...register("seller", { required: true })}
                        size="md"
                        id="seller"
                        name="seller"
                        value={newTestDrive.seller}
                        onChange={handleTdChange}
                    >
                        <option key='blankChoice' hidden value />
                        {Array.isArray(empls) && empls
                            .filter(empl => empl.is_sales_director || empl.is_sales_manager)
                            .map((empl, index) => (
                                <option value={empl.id} key={empl.id}>
                                    {`${empl.name} - 
                                    ${empl.is_sales_director ? 
                                        (`директор по продажам`) : (`менеджер по продажам`)
                                    } 
                                    ${empl.email}`}
                                </option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="client_name">Имя клиента</Form.Label>
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
                    <Form.Label className='mb-1' htmlFor="client_phone">Номер телефона клиента</Form.Label>
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

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="status">Статус тестдрайва</Form.Label>
                    <Form.Select
                        {...register("status", { required: true })}
                        size="md"
                        id="status"
                        name="status"
                        value={newTestDrive.status}
                        onChange={handleTdChange}
                    >
                        <option key='blankChoice' hidden value />
                        {Array.isArray(testDriveStatuses) && testDriveStatuses
                            .map((tds, index) => (
                                <option value={tds.id} key={tds.id}>
                                    {`${tds.id} - ${tds.name}`}
                                </option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                
                <div>
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block"
                    >
                        Добавить запись тестдрайва
                    </button>
                </div>
            </Form>
        </Fragment>
    );
};