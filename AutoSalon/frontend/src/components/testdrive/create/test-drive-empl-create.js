import React, { Fragment, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { createTestDrive, getAllTestDrives } from "../../../slices/testDriveSlice";
import { retriveUserData } from "../../../slices/userSlice";

export const CreateTestDriveEmpl = ({
    cars, carModels, testDriveStatuses, 
    empls, user
}) => {
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
        // console.log(event.target.name, " - ", event.target.value);
        setNewTestDrive({ ...newTestDrive, [event.target.name]: event.target.value });
        // console.log(newTestDrive);
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

        // for (var value of newTdData.values()) {
        //     await console.log(value);
        // };

        const timeCheckHour = new Date(newTestDrive.date_time).getHours();
        const timeCheckMinutes = new Date(newTestDrive.date_time).getMinutes()

        if (
            newTestDrive.VIN !== null && 
            newTestDrive.seller !== null &&
            newTestDrive.status !== null
        ) {
            if (
                timeCheckHour < 22 && timeCheckHour > 8 &&
                (timeCheckHour < 22 && timeCheckMinutes < 31)
            ) {
                await dispatch(createTestDrive(newTdData))
                .unwrap()
                .catch(e => {
                    console.log('Error happened while running saveTD');
                    console.log(e);
                });
    
                await alert("Запись тест-драйва была добавлена.");
                await dispatch(getAllTestDrives());
                window.location.reload();
            } else (
                await alert("Выберите дату и время в пределах 9:00 - 21:30.")
            );
        }
        else {
            await alert("Проверьте заполненность полей.");
        }
    };

    return (
        <Fragment>
            <h4>Добавить запись тестдрайва</h4>

            <Form onSubmit={handleSubmit(saveTD)} className="form-required">
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="VIN">Автомобиль для тест-драйва</Form.Label>
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
                                    car.model_id === carModel.id
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
                {errors.VIN && <p>Выберите модель автомобиля, которую клиент хочет протестировать.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="date_time">Дата и время проведения тест-драйва</Form.Label>
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
                {errors.date_time && <p>Необходимо указать дату и время в пределах 9:00 - 21:30.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="seller">
                        Отвественный за проведение тест-драйва
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
                        {(user.is_sales_director || user.is_superuser) ? (
                            Array.isArray(empls) && empls
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
                        ) : (
                            Array.isArray(empls) && empls
                            .filter(empl => empl.id === user.id)
                            .map((empl, index) => (
                                <option value={empl.id} key={empl.id}>
                                    {`${empl.name} - 
                                    ${empl.is_sales_director ? 
                                        (`директор по продажам`) : (`менеджер по продажам`)
                                    } 
                                    ${empl.email}`}
                                </option>
                        )))
                        
                        }
                    </Form.Select>
                </Form.Group>
                {errors.seller && <p>Необходимо указать ответственного за проведение тест-драйва.</p>}

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
                {errors.client_name && <p>Необходимо указать имя клиента.</p>}

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
                {errors.client_phone && <p>Необходимо указать контактный номер клиента.</p>}

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
                {errors.status && <p>Необходимо указать статус тест-драйва.</p>}
                
                <div>
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block"
                    >
                        Добавить запись тест-драйва
                    </button>
                </div>
            </Form>
        </Fragment>
    );
};