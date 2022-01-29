import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { fetchCarModel, updateSingleCarModel, singleCarModelSelector } from "../../slices/singleCarModelSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const SingleCarModelCrud = () => {
    const { singleCarModel, loading: singleCarModelLoading, hasErrors: singleCarModelHasErrors } = useSelector(singleCarModelSelector);
    
    const initialSingleCarModelState = {
        id: singleCarModel.id,
        brand: singleCarModel.brand,
        model: singleCarModel.model,
        year: singleCarModel.year,
        body: singleCarModel.body,
        engine_volume: singleCarModel.engine_volume,
        engine_power: singleCarModel.engine_power,
        fuel_type: singleCarModel.fuel_type,
        transmission_type: singleCarModel.transmission_type,
        drive_unit: singleCarModel.drive_unit,
        package_name: singleCarModel.package_name,
        package_descr: singleCarModel.package_descr,
        price: singleCarModel.price,
        // main_photo: singleCarModel.main_photo,
        model_descr: singleCarModel.model_descr,
        // multiple images
    };

    const [currentCarModel, setCurrentCarModel] = useState(initialSingleCarModelState);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const handleInputChange = event => {
        const {name, value} = event.target;
        console.log("handleChange -> " + name + ":" + value);
        setCurrentCarModel({ ...currentCarModel, [name]: value});
    };

    // const handleSelect = event => {
    //     const {name, value} = event.target;
    // };

    ///// Update single car model /////
    /// Form Validation ///
    const [showMessage, setShowMessage] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        let errors = {};

        if (!/^\d{1,9}(\.\d{0,2})$/.test(initialSingleCarModelState.price)) {
            errors.price = "Цена должна находиться в пределах 1 - 999999999.99 рублей."
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            return true;
        } else {
            return false;
        }
    };

    const updateContent = (event) => {
        const data = {
            id: singleCarModel.id,
            brand: singleCarModel.brand,
            model: singleCarModel.model,
        };

        // if (event) event.preventDefault();
        // console.log('currentCarModel.id - ', singleCarModel.id);
        // console.log('currentCarModel.brand - ', currentCarModel.brand);
        // console.log('currentCarModel.model - ', currentCarModel.model);
        // console.log('currentCarModel.body - ', currentCarModel.body);
        
        dispatch(updateSingleCarModel({ id: singleCarModel.id, data: currentCarModel }))
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
            <h4>Изменить модель автомобиля</h4>
            <Form>
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="brand">Производитель</Form.Label>
                    <Form.Control
                        size="md"
                        required
                        type="text"
                        id="brand"
                        name="brand"
                        value={currentCarModel.brand}
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
                        value={currentCarModel.model}
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
                        value={currentCarModel.model_descr}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>   {/* add validation */}
                    <Form.Label className='mb-1' htmlFor="price">Цена (руб.)</Form.Label>
                    <Form.Text><br/>Цена должна находиться в пределах 1 - 999999999.99 рублей.</Form.Text>
                    <Form.Control
                        // controlId="validationCustom01"
                        size="md"
                        required
                        type="number"
                        step="0.01"
                        max="99999999999"
                        id="price"
                        name="price"
                        value={currentCarModel.price}
                        onChange={handleInputChange}
                    />
                    {formErrors.price && (
                        <p className="text-danger">{formErrors.price}</p>
                    )}
                </Form.Group>
                <Form.Group className='mb-3'> {/* add validation */}
                    <Form.Label className='mb-1' htmlFor="year">Год</Form.Label>
                    <Form.Control
                        size="md"
                        required
                        type="text"
                        id="year"
                        name="year"
                        value={currentCarModel.year}
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
                        defaultValue={currentCarModel.body}
                        onChange={handleInputChange}
                    > {/* Get options from query?.. */}
                        {/* Options match django choices?.. */}
                        <option value="Седан">Седан</option>
                        <option value="Хэтчбек 3 дв.">Хэтчбек 3 дв.</option>
                        <option value="Хэтчбек 5 дв.">Хэтчбек 5 дв.</option>
                        <option value="Лифтбек">Лифтбек</option>
                        <option value="Внедорожник 3 дв.">Внедорожник 3 дв.</option>
                        <option value="Внедорожник 5 дв.">Внедорожник 5 дв.</option>
                        <option value="Универсал">Универсал</option>
                        <option value="Минивэн">Минивэн</option>
                        <option value="Пикап">Пикап</option>
                        <option value="Лимузин">Лимузин</option>
                        <option value="Фургон">Фургон</option>
                        <option value="Кабриолет">Кабриолет</option>
                        <option value="Неизвестно">Неизвестно</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className='mb-3'> {/* add validation */}
                    <Form.Label className='mb-1' htmlFor="engine_volume">Объем двигателя</Form.Label>
                    <Form.Control
                        size="md"
                        required
                        type="text"
                        id="engine_volume"
                        name="engine_volume"
                        value={currentCarModel.engine_volume}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>  {/* add validation */}
                    <Form.Label className='mb-1' htmlFor="engine_power">Мощность двигателя</Form.Label>
                    <Form.Control
                        size="md"
                        required
                        type="text"
                        id="engine_power"
                        name="engine_power"
                        value={currentCarModel.engine_power}
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
                        value={currentCarModel.fuel_type}
                        onChange={handleInputChange}
                    >
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
                        value={currentCarModel.transmission_type}
                        onChange={handleInputChange}
                    >
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
                        value={currentCarModel.drive_unit}
                        onChange={handleInputChange}
                    >
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
                        value={currentCarModel.package_name}
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
                        value={currentCarModel.package_descr}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                {/* main_photo */}
                <div>
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block"
                        onClick={updateContent}
                    >
                        Внести изменения
                    </button>
                </div>
                <div>
                    <br/>
                    <button 
                        type="submit" 
                        className="btn btn-secondary btn-block"
                        // onClick={handleSubmit}
                    >
                        Удалить модель
                    </button>
                </div>
            </Form>
        </Fragment>
        // </div>
    );
};

export default SingleCarModelCrud;