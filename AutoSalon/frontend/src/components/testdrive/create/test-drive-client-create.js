import React, { Fragment, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { createTestDrive, getAllTestDrives } from "../../../slices/testDriveSlice";

export const CreateTestDriveClient = ({
    cars, carModels, puproses 
}) => {
    const initialTDState = Object.freeze({
        VIN: null,
        date_time: null,
        seller: "",
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
        newTdData.append('seller', 1);
        newTdData.append('client_name', newTestDrive.client_name);
        newTdData.append('client_phone', newTestDrive.client_phone);
        newTdData.append('status', 2);

        // for (var value of newTdData.values()) {
        //     await console.log(value);
        // };

        const timeCheckHour = new Date(newTestDrive.date_time).getHours();
        const timeCheckMinutes = new Date(newTestDrive.date_time).getMinutes()

        if (newTestDrive.VIN !== null) {
            if (timeCheckHour < 22 && (timeCheckHour < 22 && timeCheckMinutes < 31)) {
                await dispatch(createTestDrive(newTdData))
                .unwrap()
                .catch(e => {
                    console.log('Error happened while running saveTD');
                    console.log(e);
                });
    
                await alert("Ваша заявка была зарегистрирована. Наш сотрудник свяжится в Вами в ближайшее время.");
                window.location.reload();
            } else (
                await alert("Пожайлуйста, выберите удобную Вам дату и время в пределах 9:00 - 21:30.")
            );
        }
        else {
            await alert("Пожайлуйста, выберите модель автомобиля, которую Вы хотете протестировать.");
        }
    };

    return (
        <Fragment>
            <h4>Записаться на тест-драйв</h4>
            <p>Оставьте заявку и в ближайшее время наши сотрудники свяжутся с Вами, чтобы уточнить подробности.</p>

            <Form onSubmit={handleSubmit(saveTD)} className="form-required">
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
                        <option key='blankChoice' hidden value/>
                        {Array.isArray(carModels) && carModels
                            .map((carModel, index) => (
                            Array.isArray(cars) && cars
                                .filter(car => (
                                    car.model_id === carModel.id
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
                {errors.VIN && <p>Пожайлуйста, выберите модель автомобиля, которую Вы хотете протестировать.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="date_time">Выберите предпочитаемую дату и время проведения тестдрайва</Form.Label>
                    <Form.Control
                        {...register("date_time", { required: true })}
                        size="md"
                        type="datetime-local"
                        id="date_time"
                        name="date_time"
                        min={new Date().toISOString().slice(0, -8)}
                        value={newTestDrive.date_time}
                        onChange={handleTdChange}
                    />
                </Form.Group>
                {errors.date_time && <p>Пожайлуйста, выберите удобную Вам дату и время в пределах 9:00 - 21:30.</p>}

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
                {errors.date_time && <p>Пожайлуйста, укажите как мы можем к Вам обращаться.</p>}

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
                {errors.date_time && <p>Пожайлуйста, укажите Ваш контактный номер телефона, чтобы наш сотрудник мог связяться с вами.</p>}

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