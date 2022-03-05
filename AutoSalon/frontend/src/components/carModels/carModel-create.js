import React, { Fragment, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { createCarModel, carModelAdd, getAllCarModels } from "../../slices/carModelsSlice";

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
    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',}); 

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
        try {
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
                // .then(dispatch(getAllCarModels()))
                .catch(e => {
                    alert("Что-то пошло не так, проверьте заполнены ли все необходимые поля формы.");
                    console.log(e);
                });

            window.location.reload();
            dispatch(getAllCarModels());
        } catch (err) {
            alert("Что-то пошло не так, проверьте заполнены ли все необходимые поля формы.");
            console.log(err);
        }
    };

    return (
        <Fragment>
            <h4>Добавить модель автомобиля</h4>
            <Form>
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="brand">Производитель</Form.Label>
                    <Form.Control
                        {...register("brand", { required: true })}
                        size="md"
                        type="text"
                        id="brand"
                        name="brand"
                        value={carModel.brand}
                        onChange={handleInputChange}    
                    />
                </Form.Group>
                {errors.brand && <p>Необходимо указать производителя.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="model">Модель</Form.Label>
                    <Form.Control
                        {...register("model", { required: true })}
                        size="md"
                        required
                        type="text"
                        id="model"
                        name="model"
                        value={carModel.model}
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
                        // defaultValue="Подробное описание модели не найдено."
                        value={carModel.model_descr}
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
                        required
                        type="number"
                        step="0.01"
                        min={0}
                        max={999999999.99}
                        id="base_price"
                        name="base_price"
                        value={carModel.base_price}
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
                        value={carModel.year}
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
                        value={carModel.body}
                        onChange={handleInputChange}
                    >
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
                        value={carModel.engine_volume}
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
                        value={carModel.engine_power}
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
                {errors.fuel_type && <p>Необходимо выбрать вид топлива.</p>}
                
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="transmission_type">Коробка передач</Form.Label>
                    <Form.Select
                        {...register("transmission_type", { required: true })}
                        size="md"
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
                {errors.transmission_type && <p>Необходимо выбрать коробку передач.</p>}
                
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="drive_unit">Привод</Form.Label>
                    <Form.Select
                        {...register("drive_unit", { required: true })}
                        size="md"
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
                {errors.drive_unit && <p>Необходимо выбрать вид привода.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="package_name">Комплектация</Form.Label>
                    <Form.Control
                        {...register("package_name", { required: true })}
                        size="md"
                        type="text"
                        id="package_name"
                        name="package_name"
                        value={carModel.package_name}
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
                        required
                        type="text"
                        id="package_descr"
                        name="package_descr"
                        value={carModel.package_descr}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                {errors.package_descr && <p>Необходимо указать спецификацию комплектации.</p>}

                <Form.Group className='mb-3'> 
                    <Form.Label className='mb-1' htmlFor="main_photo">Главное изображение модели</Form.Label>
                    <Form.Control
                        {...register("main_photo", { required: true })}
                        className="form-control"
                        size="md"
                        type="file"
                        accept="image/*"
                        id="main_photo"
                        name="main_photo"
                        value={carModel.main_photo}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                {errors.package_descr && <p>Необходимо указать главное изображение модели.</p>}
                
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