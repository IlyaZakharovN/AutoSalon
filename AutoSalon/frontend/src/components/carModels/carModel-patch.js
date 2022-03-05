import React, { Fragment, useState } from "react";
import { Form, Toast } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { updateCarModel } from "../../slices/carModelsSlice";

// add notification
const CarModelUpdate = ({ carModel }) => {
    const initialSingleCarModelState = {
        // id: singleCarModel.id,
        brand: carModel.brand,
        model: carModel.model,
        year: carModel.year,
        body: carModel.body,
        engine_volume: carModel.engine_volume,
        engine_power: carModel.engine_power,
        fuel_type: carModel.fuel_type,
        transmission_type: carModel.transmission_type,
        drive_unit: carModel.drive_unit,
        package_name: carModel.package_name,
        package_descr: carModel.package_descr,
        base_price: carModel.base_price,
        main_photo: carModel.main_photo,
        model_descr: carModel.model_descr,
        // multiple images
    };

    // const [showToast, setShowToast] = useState(false);

    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',}); 

    let patchData = new FormData();

    const handleInputChange = event => {
        const {name, value} = event.target;
        console.log("handleChange -> " + name + ":" + value);
        // setCurrentCarModel({ ...currentCarModel, [name]: value});
        patchData.append(`${name}`, value);
        // console.log(JSON.stringify(patchData));
        // console.log(patchData);
    };

    const updateContent = (event) => { // add notification/popups on success and on failure 
        dispatch(updateCarModel({ id: carModel.id, data: patchData }))
        .unwrap()
        .then(response => {
            console.log('response - ', response);
        })
        .catch(e => {
            console.log(e);
        });

        window.location.reload();

        // return (
        //     <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
        //         <Toast.Header>
        //             <strong className="me-auto">Информация обновлена</strong>
        //         </Toast.Header>
        //         <Toast.Body>Информация о моделе автомобиля была успешно обновлена.</Toast.Body>
        //     </Toast>
        // );
    };

    return (
        <Fragment>
            <h4>Изменить модель автомобиля</h4>
            <Form onSubmit={handleSubmit(updateContent)}>
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="brand">Производитель</Form.Label>
                    <Form.Control
                        {...register("brand", { required: true })}
                        size="md"
                        type="text"
                        id="brand"
                        name="brand"
                        defaultValue={carModel.brand}
                        onChange={handleInputChange}    
                    />
                </Form.Group>
                {errors.brand && <p>Необходимо указать производителя.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="model">Модель</Form.Label>
                    <Form.Control
                        {...register("model", { required: true })}
                        size="md"
                        type="text"
                        id="model"
                        name="model"
                        defaultValue={carModel.model}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                {errors.model && <p>Необходимо указать название модели.</p>}

                <Form.Group className='mb-3'> 
                    <Form.Label className='mb-1' htmlFor="model_descr">Описание модели</Form.Label>
                    <textarea
                        {...register("model_descr", { required: true })}
                        className="form-control"
                        rows="5"
                        size="md"
                        type="text"
                        id="model_descr"
                        name="model_descr"
                        defaultValue={carModel.model_descr}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                {errors.model_descr && <p>Необходимо указать описание модели.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="base_price">Базовая цена (руб.)</Form.Label>
                    <Form.Text><br/>Цена должна находиться в пределах 1 - 999999999,99 рублей.</Form.Text>
                    <Form.Control
                        {...register("base_price", { required: true })}
                        size="md"
                        type="number"
                        step="0.01"
                        min={0}
                        max={999999999.99}
                        id="base_price"
                        name="base_price"
                        defaultValue={carModel.base_price}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                {errors.base_price && <p>Необходимо указать базовую цену модели.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="year">Год</Form.Label>
                    <Form.Control
                        {...register("year", { required: true })}
                        size="md"
                        type="number"
                        step="1"
                        max={(new Date().getFullYear() + 2)}
                        min={0}
                        id="year"
                        name="year"
                        defaultValue={carModel.year}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                {errors.year && <p>Необходимо указать базовую год производства модели.</p>}

                <Form.Group className='mb-3'>  
                    <Form.Label className='mb-1' htmlFor="body">Кузов</Form.Label>
                    <Form.Select 
                        {...register("body", { required: true })}
                        size="md"
                        id="body"
                        name="body"
                        defaultValue={carModel.body}
                        onChange={handleInputChange}
                    >
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
                {errors.body && <p>Необходимо выбрать кузов модели.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="engine_volume">Объем двигателя</Form.Label>
                    <Form.Control
                        {...register("engine_volume", { required: true })}
                        size="md"
                        type="number"
                        step="0.01"
                        min={0}
                        id="engine_volume"
                        name="engine_volume"
                        defaultValue={carModel.engine_volume}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                {errors.engine_volume && <p>Необходимо указать объем двигателя.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="engine_power">Мощность двигателя</Form.Label>
                    <Form.Control
                        {...register("engine_power", { required: true })}
                        size="md"
                        type="number"
                        min={0}
                        id="engine_power"
                        name="engine_power"
                        defaultValue={carModel.engine_power}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                {errors.engine_power && <p>Необходимо указать объем двигателя.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="fuel_type">Вид топлива</Form.Label>
                    <Form.Select
                        {...register("fuel_type", { required: true })}
                        size="md"
                        id="fuel_type"
                        name="fuel_type"
                        defaultValue={carModel.fuel_type}
                        onChange={handleInputChange}
                    >
                        <option value="Бензин">Бензин</option>
                        <option value="Дизель">Дизель</option>
                        <option value="Гибрид">Гибрид</option>
                        <option value="Электро">Электро</option>
                        <option value="Неизвестно">Неизвестно</option>
                    </Form.Select>
                </Form.Group>
                {errors.fuel_type && <p>Необходимо выбрать вид топлива.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="transmission_type">Коробка передач</Form.Label>
                    <Form.Select
                        {...register("transmission_type", { required: true })}
                        size="md"
                        id="transmission_type"
                        name="transmission_type"
                        defaultValue={carModel.transmission_type}
                        onChange={handleInputChange}
                    >
                        <option value="Автоматическая">Автоматическая</option>
                        <option value="Робот">Робот</option>
                        <option value="Вариатор">Вариатор</option>
                        <option value="Механическая">Механическая</option>
                        <option value="Неизвестно">Неизвестно</option>
                    </Form.Select>
                </Form.Group>
                {errors.transmission_type && <p>Необходимо выбрать коробку передач.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="drive_unit">Привод</Form.Label>
                    <Form.Select
                        {...register("drive_unit", { required: true })}
                        size="md"
                        required
                        id="drive_unit"
                        name="drive_unit"
                        defaultValue={carModel.drive_unit}
                        onChange={handleInputChange}
                    >
                        <option value="Передний">Передний</option>
                        <option value="Задний">Задний</option>
                        <option value="Полный">Полный</option>
                        <option value="Неизвестно">Неизвестно</option>
                    </Form.Select>
                </Form.Group>
                {errors.drive_unit && <p>Необходимо выбрать вид привода.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="package_name">Комплектация</Form.Label>
                    <Form.Control
                        {...register("package_name", { required: true })}
                        size="md"
                        type="text"
                        id="package_name"
                        name="package_name"
                        defaultValue={carModel.package_name}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                {errors.package_name && <p>Необходимо указать название комплектации.</p>}

                <Form.Group className='mb-3'> 
                    <Form.Label className='mb-1' htmlFor="package_descr">Спецификация комплектации</Form.Label>
                    <textarea
                        {...register("package_descr", { required: true })}
                        className="form-control"
                        rows="5"
                        size="md"
                        type="text"
                        id="package_descr"
                        name="package_descr"
                        defaultValue={carModel.package_descr}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                {errors.package_descr && <p>Необходимо указать спецификацию комплектации.</p>}

                <Form.Group className='mb-3'>  {/* add type validation */}
                    <Form.Label className='mb-1' htmlFor="main_photo">Главное изображение модели</Form.Label>
                    <Form.Control
                        {...register("main_photo")}
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

export default CarModelUpdate;