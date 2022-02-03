import React, { Fragment, useState } from "react";
import { Form} from "react-bootstrap";
import { useDispatch} from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { updateSingleCarModel } from "../../slices/singleCarModelSlice";

// add notification
const SingleCarModelUpdate = ({ singleCarModel }) => {
    // const { singleCarModel, loading: singleCarModelLoading, hasErrors: singleCarModelHasErrors } = useSelector(singleCarModelSelector);
    
    const initialSingleCarModelState = {
        // id: singleCarModel.id,
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
        base_price: singleCarModel.base_price,
        main_photo: singleCarModel.main_photo,
        model_descr: singleCarModel.model_descr,
        // multiple images
    };

    // const [currentCarModel, setCurrentCarModel] = useState(initialSingleCarModelState);
    // const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    let patchData = new FormData();

    const handleInputChange = event => {
        const {name, value} = event.target;
        console.log("handleChange -> " + name + ":" + value);
        // setCurrentCarModel({ ...currentCarModel, [name]: value});
        patchData.append(`${name}`, value);
        console.log(JSON.stringify(patchData));
        // console.log(patchData);
    };

    ///// Update single car model /////
    /// Form Validation ///
    // const [showMessage, setShowMessage] = useState(false);
    // const [formErrors, setFormErrors] = useState({});

    // const validateForm = () => {
    //     let errors = {};

    //     // Price field:
    //     if (!initialSingleCarModelState.base_price) {
    //         errors.base_price = "Необходимо указать цену."
    //     } else if (!/^\d{1,9}(\,\d{0,2})$/.test(initialSingleCarModelState.base_price)) {
    //         errors.base_price = "Цена должна находиться в пределах 1 - 999999999,99 рублей."
    //     }

    //     // Year field:
    //     if (!initialSingleCarModelState.year) {
    //         errors.year = "Необходимо указать год выпуска."
    //     } else if ((initialSingleCarModelState.year > (new Date().getFullYear() + 2))) {
    //         errors.year = "Год выпуска не может превышать текущий более чем на два."
    //     }

    //     setFormErrors(errors);

    //     if (Object.keys(errors).length === 0) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // };
    /// End Form Validation ///

    const updateContent = (event) => { // add notification/popups on success and on failure 
        // event.preventDefault();
        
        dispatch(updateSingleCarModel({ id: singleCarModel.id, data: patchData }))
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
                        defaultValue={singleCarModel.brand}
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
                        defaultValue={singleCarModel.model}
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
                        defaultValue={singleCarModel.model_descr}
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
                        defaultValue={singleCarModel.base_price}
                        onChange={handleInputChange}
                        // pattern="^\d{1,9}(\,\d{0,2})$"
                    />
                    {/* {formErrors.base_price && (
                        <p className="text-danger">{formErrors.base_price}</p>
                    )} */}
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
                        defaultValue={singleCarModel.year}
                        onChange={handleInputChange}
                    />
                    {/* {formErrors.year && (
                        <p className="text-danger">{formErrors.year}</p>
                    )} */}
                </Form.Group>
                <Form.Group className='mb-3'>  
                    <Form.Label className='mb-1' htmlFor="body">Кузов</Form.Label>
                    <Form.Select 
                        size="md"
                        required
                        id="body"
                        name="body"
                        defaultValue={singleCarModel.body}
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
                        defaultValue={singleCarModel.engine_volume}
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
                        defaultValue={singleCarModel.engine_power}
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
                        defaultValue={singleCarModel.fuel_type}
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
                        defaultValue={singleCarModel.transmission_type}
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
                        defaultValue={singleCarModel.drive_unit}
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
                        defaultValue={singleCarModel.package_name}
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
                        defaultValue={singleCarModel.package_descr}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>  {/* add type validation */}
                    <Form.Label className='mb-1' htmlFor="main_photo">Изображение модели</Form.Label>
                    <Form.Control
                        className="form-control"
                        size="md"
                        accept="image/*"
                        type="file"
                        id="main_photo"
                        name="main_photo"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                {/* multiple images */}
                <div>
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block"
                        onClick={updateContent}
                    >
                        Внести изменения
                    </button>
                </div>
            </Form>
        </Fragment>
        // </div>
    );
};

export default SingleCarModelUpdate;