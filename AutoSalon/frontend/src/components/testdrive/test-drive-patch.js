import React, { Fragment, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

import { updateTestDrive } from "../../slices/testDriveSlice";

export const TestDriveUpdate = ({ testdrives, testDriveStatuses, cars, carModels, empls, purposes, user }) => {
    const initialTdState = {
        VIN: testdrives.VIN,
        date_time: testdrives.date_time,
        seller: testdrives.seller,
        client_name: testdrives.client_name,
        client_phone: testdrives.client_phone,
        status: testdrives.status,
    };

    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',}); 

    let tdPatchData = new FormData();

    const handleTdChange = (event) => {
        const {name, value} = event.target;
        // console.log("handleChange -> " + name + ":" + value);
        tdPatchData.append(`${name}`, value);
        // console.log(JSON.stringify(patchData));
        // console.log(patchData);
    };

    const patchData = async (event) => { // add notification/popups on success and on failure 
        dispatch(updateTestDrive({ id: testdrives.id, data: tdPatchData }))
            .unwrap()
            .then(response => {
                console.log('response - ', response);
            })
            .catch(e => {
                console.log(e);
            });

        window.location.reload();
    };

    return (
        <Fragment>
            <h4>Изменить информацию о тест-драйве</h4>

            <Form onSubmit={handleSubmit(patchData)}>
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="VIN">Автомобиль</Form.Label>
                    <Form.Select
                        {...register("VIN", { required: true })}
                        size="md"
                        id="VIN"
                        name="VIN"
                        defaultValue={testdrives.VIN}
                        onChange={handleTdChange}
                    >
                        <option key='blankChoice' hidden value />
                        {(user.is_sales_director || user.is_superuser || (user.id === testdrives.seller) || (testdrives.seller === 1)) ? (
                            Array.isArray(carModels) && carModels
                                .map((carModel, index) => (
                                Array.isArray(cars) && cars
                                    .filter(car => (
                                        car.model_id === carModel.id && 
                                        car.purpose === 3
                                    ))
                                    .map((car, index) => (
                                        <option value={car.VIN} key={car.VIN}>
                                            {`${car.VIN} - ${car.price} руб., ${carModel.model} ${carModel.year}
                                            в комплектации  ${carModel.package_name}`}
                                        </option>
                                    )
                                )))
                        ) : (
                            Array.isArray(carModels) && carModels
                                .map((carModel, index) => (
                                Array.isArray(cars) && cars
                                    .filter(car => (
                                        car.VIN === testdrives.VIN &&
                                        car.model_id === carModel.id
                                    ))
                                    .map((car, index) => (
                                        <option value={car.VIN} key={car.VIN}>
                                            {`${car.VIN} - ${car.price}  руб.,  ${carModel.model} ${carModel.year}
                                            в комплектации  ${carModel.package_name}`}
                                        </option>
                                    )
                                )))
                        )}
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
                        defaultValue={testdrives.date_time}
                        // value={testdrives.date_time}
                        onChange={handleTdChange}
                    />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="">
                        Отвественный за проведение тестдрайва
                    </Form.Label>
                    <Form.Select
                        {...register("seller", { required: true })}
                        size="md"
                        id="seller"
                        name="seller"
                        defaultValue={testdrives.seller}
                        onChange={handleTdChange}
                    >
                        {testdrives.seller === 1 ? (
                            <Fragment>
                                <option value={testdrives.seller} key={testdrives.seller}>
                                    {`Отвественный не назначен`}
                                </option>
                                    {user.is_sales_manager ? (
                                        <option value={user.id} key={user.id}>
                                            {`${user.name}`}
                                         </option>
                                    ) : (
                                        Array.isArray(empls) && empls
                                            .map((empl, index) =>(
                                                <option value={empl.id} key={empl.id}>
                                                    {`${empl.name}`}
                                                </option>
                                            ))
                                    )}
                            </Fragment>
                        ) : (
                            user.is_sales_manager ? (
                                Array.isArray(empls) && empls
                                    .filter(empl => empl.id === testdrives.seller)
                                    .map((empl, index) => (
                                        <option value={testdrives.seller} key={testdrives.seller}>
                                            {`${empl.name}`}
                                        </option>
                                    ))
                            ) : (
                                Array.isArray(empls) && empls
                                    .map((empl, index) =>(
                                        <option value={empl.id} key={empl.id}>
                                            {`${empl.name}`}
                                        </option>
                                    ))
                            )
                        )}
                    </Form.Select>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="client_name">Имя клиента</Form.Label>
                    {/* user.is_sales_manager && user.id === testdrives.seller */}
                    {(user.is_sales_director || user.is_superuser || (user.id === testdrives.seller) || (testdrives.seller === 1)) ? (
                        <Form.Control
                            {...register("client_name", { required: true })}
                            size="md"
                            type="text"
                            id="client_name"
                            name="client_name"
                            defaultValue={testdrives.client_name}
                            onChange={handleTdChange}
                        />
                    ) : (
                        <Form.Control
                            {...register("client_name", { required: true })}
                            size="md"
                            type="text"
                            readOnly
                            id="client_name"
                            name="client_name"
                            defaultValue={testdrives.client_name}
                            onChange={handleTdChange}
                        />
                    )}
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="client_phone">Номер телефона клиента</Form.Label>
                    {(user.is_sales_director || user.is_superuser || (user.id === testdrives.seller) || testdrives.seller === 1) ? (
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
                            defaultValue={testdrives.client_phone}
                            onChange={handleTdChange}
                        />
                    ) : (
                        <Form.Control
                            {...register("client_phone", { 
                                required: true ,
                                pattern: /^\+{1}7{1}\d{10}$/
                            })}
                            size="md"
                            type="tel"
                            readOnly
                            minLength={12}
                            maxLength={12}
                            placeholder="+7..."
                            id="client_phone"
                            name="client_phone"
                            defaultValue={testdrives.client_phone}
                            onChange={handleTdChange}
                        />
                    )}
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="status">Статус тестдрайва</Form.Label>
                    <Form.Select
                        {...register("status", { required: true })}
                        size="md"
                        id="status"
                        name="status"
                        defaultValue={testdrives.status}
                        onChange={handleTdChange}
                    >
                        <option key='blankChoice' hidden value />
                        {(user.is_sales_director || user.is_superuser || (user.id === testdrives.seller) || testdrives.seller === 1) ? (
                            Array.isArray(testDriveStatuses) && testDriveStatuses
                                .map((tds, index) => (
                                    <option value={tds.id} key={tds.id}>
                                        {`${tds.id} - ${tds.name}`}
                                    </option>
                                ))
                        ) : (
                            Array.isArray(testDriveStatuses) && testDriveStatuses
                                .filter(tds => tds.id === testdrives.status)
                                .map((tds, index) => (
                                    <option value={testdrives.status} key={tds.id}>
                                        {`${tds.id} - ${tds.name}`}
                                    </option>
                                ))
                        )}
                    </Form.Select>
                </Form.Group>

                <div>
                    {(user.is_sales_director || user.is_superuser || (user.id === testdrives.seller) || testdrives.seller === 1) ? (
                        <button 
                            type="submit" 
                            className="btn btn-primary btn-block"
                        >
                            Изменить запись тест-драйва
                        </button>
                    ) : (
                        <button 
                            type="submit" 
                            disabled
                            className="btn btn-secondary btn-block"
                        >
                            Изменить запись тест-драйва
                        </button>
                    )}
                </div>
            </Form>
        </Fragment>
    );
};