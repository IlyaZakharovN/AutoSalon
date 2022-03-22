import React, { Fragment, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

import { updateTestDrive } from "../../slices/testDriveSlice";

export const TestDriveUpdate = ({ 
    testdrives, testDriveStatuses, cars, 
    carModels, empls, user 
}) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',}); 

    let tdPatchData = new FormData();

    const handleTdChange = (event) => {
        const {name, value} = event.target;
        console.log("handleChange -> " + name + ":" + value);
        if (name === 'date_time') {
            tdPatchData.delete(`${name}`);
            tdPatchData.append(`${name}`, value)
        } else {
            tdPatchData.append(`${name}`, value)
        }
    };

    const patchData = async (event) => { // add notification/popups on success and on failure 
        const timeCheckHour = tdPatchData.get('date_time') ? 
            new Date(new Date(tdPatchData.get('date_time'))
                .setHours(new Date(tdPatchData.get('date_time')).getHours())).getHours() : 
            new Date(new Date(testdrives[0].date_time)
                .setHours(new Date(testdrives[0].date_time).getHours())).getHours();

        const timeCheckMinutes = tdPatchData.date_time ? 
            new Date(tdPatchData.date_time).getMinutes() : 
            new Date(testdrives[0].date_time).getMinutes();

        if (
            timeCheckHour < 22 && timeCheckHour > 8 &&
            (timeCheckHour < 22 && timeCheckMinutes < 31)
        ) {
            await dispatch(updateTestDrive({ id: testdrives[0].id, data: tdPatchData }))
                .unwrap()
                .catch(e => {
                    console.log('Error happened while running patchData');
                    console.log(e);
                });

            await alert("Запись тест-драйва была обновлена.");
            window.location.reload();
        } else {
            await alert("Выберите дату и время в пределах 9:00 - 21:30.")
        };
    };

    return (
        <Fragment>
            <h4>Изменить информацию о тест-драйве</h4>

            {Array.isArray(testdrives) && testdrives.map(testdrive => (
                <Form onSubmit={handleSubmit(patchData)} className="form-required">
                    <fieldset 
                        disabled={(
                        //     ((user.is_sales_manager && user.id !== testdrive.seller) ||
                        //     (user.is_sales_manager && testdrive.seller !== 1)) 
                        //     ? true : false
                            (user.is_sales_director || user.is_superuser || 
                            (user.id === testdrive.seller) || 
                            (testdrive.seller === 1)) ? false : true
                        )}
                    >
                        <Form.Group className='mb-3'>
                            <Form.Label className='mb-1' htmlFor="VIN">
                                Автомобиль
                            </Form.Label>
                            <Form.Select
                                {...register("VIN", { required: true })}
                                size="md"
                                id="VIN"
                                name="VIN"
                                defaultValue={testdrive.VIN}
                                onChange={handleTdChange}
                            >
                                <option key='blankChoice' hidden value />
                                {Array.isArray(carModels) && carModels
                                    .map((carModel, index) => (
                                    Array.isArray(cars) && cars
                                        .filter(car => car.model_id === carModel.id)
                                        .map(car => (
                                            <option value={car.VIN} key={car.VIN}>
                                                {`${car.VIN} - ${car.price} руб., ${carModel.model} ${carModel.year}
                                                в комплектации  ${carModel.package_name}`}
                                            </option>
                                        ))
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        {errors.VIN && <p>Выберите модель автомобиля, которую клиент хочет протестировать.</p>}

                        <Form.Group className='mb-3'>
                            <Form.Label className='mb-1' htmlFor="date_time">
                                Дата и время проведения тестдрайва
                            </Form.Label>
                            <Form.Control
                                {...register("date_time", { required: true })}
                                size="md"
                                type="datetime-local"
                                id="date_time"
                                name="date_time"
                                // autoComplete="on"
                                defaultValue={new Date(
                                    new Date(testdrive.date_time)
                                        .setHours(
                                            new Date(testdrive.date_time).getHours()+3)
                                        )
                                        .toISOString()
                                        .slice(0,-8)
                                }
                                onChange={handleTdChange}
                            />
                        </Form.Group>
                        {errors.date_time && <p>Необходимо указать дату и время в пределах 9:00 - 21:30.</p>}

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
                                {testdrive.seller === 1 ? (
                                    <Fragment>
                                        <option value={testdrive.seller} key={testdrive.seller}>
                                            {`Отвественный не назначен`}
                                        </option>
                                            {user.is_sales_manager ? (
                                                <option value={user.id} key={user.id}>
                                                    {`${user.name}`}
                                                </option>
                                            ) : (
                                                Array.isArray(empls) && empls
                                                    .map(empl => (
                                                        <option value={empl.id} key={empl.id}>
                                                            {`${empl.name}`}
                                                        </option>
                                                    ))
                                            )}
                                    </Fragment>
                                ) : (
                                    user.is_sales_manager ? (
                                        Array.isArray(empls) && empls
                                            .filter(empl => empl.id === testdrive.seller)
                                            .map(empl => (
                                                <option value={testdrive.seller} key={testdrive.seller}>
                                                    {`${empl.name}`}
                                                </option>
                                            ))
                                    ) : (
                                        Array.isArray(empls) && empls
                                            .map(empl => (
                                                <option value={empl.id} key={empl.id}>
                                                    {`${empl.name}`}
                                                </option>
                                            ))
                                    )
                                )}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label className='mb-1' htmlFor="client_name">
                                Имя клиента
                            </Form.Label>
                            {(user.is_sales_director || 
                            user.is_superuser || 
                            (user.id === testdrive.seller) || 
                            (testdrive.seller === 1)) ? (
                                <Form.Control
                                    {...register("client_name", { required: true })}
                                    size="md"
                                    type="text"
                                    id="client_name"
                                    name="client_name"
                                    defaultValue={testdrive.client_name}
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
                                    defaultValue={testdrive.client_name}
                                    onChange={handleTdChange}
                                />
                            )}
                        </Form.Group>
                        {errors.client_name && <p>Необходимо указать имя клиента.</p>}

                        <Form.Group className='mb-3'>
                            <Form.Label className='mb-1' htmlFor="client_phone">
                                Номер телефона клиента
                            </Form.Label>
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
                                    defaultValue={testdrive.client_phone}
                                    onChange={handleTdChange}
                            />
                        </Form.Group>
                        {errors.client_phone && <p>Необходимо указать контактный номер клиента.</p>}

                        <Form.Group className='mb-3'>
                            <Form.Label className='mb-1' htmlFor="status">
                                Статус тестдрайва
                            </Form.Label>
                            <Form.Select
                                {...register("status", { required: true })}
                                size="md"
                                id="status"
                                name="status"
                                defaultValue={testdrive.status}
                                onChange={handleTdChange}
                            >
                                <option key='blankChoice' hidden value />
                                {(user.is_sales_director || 
                                user.is_superuser || 
                                (user.id === testdrive.seller) || 
                                (testdrive.seller === 1)) ? (
                                    Array.isArray(testDriveStatuses) && testDriveStatuses
                                        .map((tds, index) => (
                                            <option value={tds.id} key={tds.id}>
                                                {`${tds.id} - ${tds.name}`}
                                            </option>
                                        ))
                                ) : (
                                    Array.isArray(testDriveStatuses) && testDriveStatuses
                                        .filter(tds => tds.id === testdrive.status)
                                        .map((tds, index) => (
                                            <option value={tds.id} key={tds.id}>
                                                {`${tds.id} - ${tds.name}`}
                                            </option>
                                        ))
                                )}
                            </Form.Select>
                        </Form.Group>
                        {errors.status && <p>Необходимо указать статус тест-драйва.</p>}

                        <div>
                            {(user.is_sales_director || 
                            user.is_superuser || 
                            (user.id === testdrive.seller) || 
                            (testdrive.seller === 1)) ? (
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
                    </fieldset>
                </Form>
            ))}
        </Fragment>
    );
};