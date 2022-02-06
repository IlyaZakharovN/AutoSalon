import React, { Fragment, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { unwrapResult } from '@reduxjs/toolkit'

import { createCarModel, carModelAdd, retriveCarModels } from "../../slices/carModelsSlice";

// Add notifications on creation, wrong data input...
const CreateCarModel = () => {
    const initialCarModelState = Object.freeze({
        // id: null,
        brand: "",
        model: "",
        year: null,
        body: null,
        engine_volume: null,
        engine_power: null,
        fuel_type: null,
        transmission_type: null,
        drive_unit: null,
        package_name: "",
        package_descr: "",
        base_price: null,
        // main_photo: "",
        model_descr: "",
    });

    const [carModel, setCarmodel] = useState(initialCarModelState);
    const [carModelImage, setCarModelImage] = useState(null);
    const dispatch = useDispatch();

    const handleInputChange = event => {
        console.log(event.target.name, " - ", event.target.value);

        if ([event.target.name] == 'main_photo') {
            setCarModelImage({
                image: event.target.files,
            });
            console.log(event.target.files);
        } else {
            setCarmodel({ ...carModel, [event.target.name]: event.target.value });
        }
    };

    const saveCarModel = async (event) => {
        console.log(JSON.stringify(carModel));
        console.log(carModel);
        event.preventDefault();

        let newCarModelData = new FormData();
        newCarModelData.append('brand', carModel.brand);
        newCarModelData.append('model', carModel.model);
        newCarModelData.append('year', carModel.year);
        newCarModelData.append('body', carModel.body);
        newCarModelData.append('engine_volume', carModel.engine_volume);
        newCarModelData.append('engine_power', carModel.engine_power);
        newCarModelData.append('fuel_type', carModel.fuel_type);
        newCarModelData.append('transmission_type', carModel.transmission_type);
        newCarModelData.append('drive_unit', carModel.drive_unit);
        newCarModelData.append('package_name', carModel.package_name);
        newCarModelData.append('package_descr', carModel.package_descr);
        newCarModelData.append('base_price', carModel.base_price);
        newCarModelData.append('main_photo', carModelImage.image[0]);
        newCarModelData.append('model_descr', carModel.model_descr);

        // const {
        //     brand, 
        //     model,
        //     year,
        //     body,
        //     engine_volume, 
        //     engine_power, 
        //     fuel_type, 
        //     transmission_type,
        //     drive_unit,
        //     package_name, 
        //     package_descr,
        //     base_price,
        //     main_photo,
        //     model_descr
        // } = carModel;

        await dispatch(createCarModel(newCarModelData))
            // .then(unwrapResult)
            .unwrap()
            .then(data => {
                console.log(data);
                setCarmodel({
                    id: data.id,
                    brand: data.brand, 
                    model: data.model,
                    year: data.year,
                    body: data.body,
                    engine_volume: data.engine_volume, 
                    engine_power: data.engine_power, 
                    fuel_type: data.fuel_type, 
                    transmission_type: data.transmission_type,
                    drive_unit: data.drive_unit,
                    package_name: data.package_name, 
                    package_descr: data.package_descr,
                    base_price: data.base_price,
                    main_photo: data.main_photo,
                    model_descr: data.model_descr
                });
            })
            // .then(dispatch(retriveCarModels()))
            .catch(e => {
                console.log(e);
            });
        window.location.reload();
        dispatch(retriveCarModels());
    };

    return (
        <Fragment>
            <h4>Добавить модель автомобиля</h4>
            <Form>
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="brand">Производитель</Form.Label>
                    <Form.Control
                        size="md"
                        required
                        type="text"
                        id="brand"
                        name="brand"
                        value={carModel.brand}
                        onChange={handleInputChange}    
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="model">Модель</Form.Label>
                    <Form.Control
                        size="md"
                        required
                        type="text"
                        id="model"
                        name="model"
                        value={carModel.model}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className='mb-3'> 
                    <Form.Label className='mb-1' htmlFor="model_descr">Описание модели</Form.Label>
                    <textarea
                        className="form-control"
                        rows="5"
                        size="md"
                        required
                        type="text"
                        id="model_descr"
                        name="model_descr"
                        // defaultValue="Подробное описание модели не найдено."
                        value={carModel.model_descr}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="base_price">Базовая цена (руб.)</Form.Label>
                    <Form.Text><br/>Цена должна находиться в пределах 1 - 999999999,99 рублей.</Form.Text>
                    <Form.Control
                        size="md"
                        required
                        type="number"
                        step="0.01"
                        min={0}
                        max={999999999.99}
                        id="base_price"
                        name="base_price"
                        value={carModel.base_price}
                        onChange={handleInputChange}
                        // pattern="^\d{1,9}(\,\d{0,2})$"
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="year">Год</Form.Label>
                    <Form.Control
                        size="md"
                        required
                        type="number"
                        step="1"
                        max={(new Date().getFullYear() + 2)}
                        min={0}
                        id="year"
                        name="year"
                        value={carModel.year}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>  
                    <Form.Label className='mb-1' htmlFor="body">Кузов</Form.Label>
                    <Form.Select 
                        size="md"
                        required
                        id="body"
                        name="body"
                        value={carModel.body}
                        onChange={handleInputChange}
                    > {/* Get options from query?.. */}
                        {/* Options match django choices?.. */}
                        <option key='blankChoice' hidden value />
                        <option value="Седан">Седан</option>
                        <option value="Хэтчбек 3 дв.">Хэтчбек 3 дв.</option>
                        <option value="Хэтчбек 5 дв.">Хэтчбек 5 дв.</option>
                        <option value="Лифтбек">Лифтбек</option>
                        <option value="Внедорожник 3 дв.">Внедорожник 3 дв.</option>
                        <option value="Внедорожник 5 дв.">Внедорожник 5 дв.</option>
                        <option value="Универсал">Универсал</option>
                        <option value="Купе">Купе</option>
                        <option value="Минивэн">Минивэн</option>
                        <option value="Пикап">Пикап</option>
                        <option value="Лимузин">Лимузин</option>
                        <option value="Фургон">Фургон</option>
                        <option value="Кабриолет">Кабриолет</option>
                        <option value="Неизвестно">Неизвестно</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="engine_volume">Объем двигателя</Form.Label>
                    <Form.Control
                        size="md"
                        required
                        type="number"
                        step="0.01"
                        min={0}
                        id="engine_volume"
                        name="engine_volume"
                        value={carModel.engine_volume}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="engine_power">Мощность двигателя</Form.Label>
                    <Form.Control
                        size="md"
                        required
                        type="number"
                        min={0}
                        id="engine_power"
                        name="engine_power"
                        value={carModel.engine_power}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="fuel_type">Вид топлива</Form.Label>
                    <Form.Select
                        size="md"
                        required
                        id="fuel_type"
                        name="fuel_type"
                        value={carModel.fuel_type}
                        onChange={handleInputChange}
                    >
                        <option key='blankChoice' hidden value />
                        <option value="Бензин">Бензин</option>
                        <option value="Дизель">Дизель</option>
                        <option value="Гибрид">Гибрид</option>
                        <option value="Электро">Электро</option>
                        <option value="Неизвестно">Неизвестно</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="transmission_type">Коробка передач</Form.Label>
                    <Form.Select
                        size="md"
                        required
                        id="transmission_type"
                        name="transmission_type"
                        value={carModel.transmission_type}
                        onChange={handleInputChange}
                    >
                        <option key='blankChoice' hidden value />
                        <option value="Автоматическая">Автоматическая</option>
                        <option value="Робот">Робот</option>
                        <option value="Вариатор">Вариатор</option>
                        <option value="Механическая">Механическая</option>
                        <option value="Неизвестно">Неизвестно</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="drive_unit">Привод</Form.Label>
                    <Form.Select
                        size="md"
                        required
                        id="drive_unit"
                        name="drive_unit"
                        value={carModel.drive_unit}
                        onChange={handleInputChange}
                    >
                        <option key='blankChoice' hidden value />
                        <option value="Передний">Передний</option>
                        <option value="Задний">Задний</option>
                        <option value="Полный">Полный</option>
                        <option value="Неизвестно">Неизвестно</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="package_name">Комплектация</Form.Label>
                    <Form.Control
                        size="md"
                        required
                        type="text"
                        id="package_name"
                        name="package_name"
                        value={carModel.package_name}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className='mb-3'> 
                    <Form.Label className='mb-1' htmlFor="package_descr">Спецификация комплектации</Form.Label>
                    <textarea
                        className="form-control"
                        rows="5"
                        size="md"
                        required
                        type="text"
                        id="package_descr"
                        name="package_descr"
                        value={carModel.package_descr}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>  {/* add type validation */}
                    <Form.Label className='mb-1' htmlFor="main_photo">Изображение модели</Form.Label>
                    <Form.Control
                        className="form-control"
                        size="md"
                        type="file"
                        accept="image/*"
                        required
                        id="main_photo"
                        name="main_photo"
                        value={carModel.main_photo}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                {/* multiple images */}
                <div>
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block"
                        onClick={saveCarModel}
                    >
                        Добавить в каталог
                    </button>
                </div>
            </Form>
        </Fragment>
    );
};

export default CreateCarModel;