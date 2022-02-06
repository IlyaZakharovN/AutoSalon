import React, { Fragment, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { Field, reduxForm } from "redux-form";
import { useForm } from "react-hook-form";

import { createCar, retriveCars } from "../../slices/carSlice";
// import { carModelsSelector } from "../../slices/carModelsSlice";

// Add notifications on creation, wrong data input...
export const CreateCar = () => {
    const initialCarState = Object.freeze({
        vin: null,
        model_id: null,
        price: null,
        purpose: null,
        note: "",
    });
    
    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',}); 
    const [car, setCar] = useState(initialCarState);
    const dispatch = useDispatch(); 
    const carModels = useSelector(state => state.carModels);
    console.log(carModels);
    // {carModels && carModels.map((carModel, index) => (
    //     console.log(carModel)
    // ))}

    const handleInputChange = event => {
        console.log(event.target.name, " - ", event.target.value);
        setCar({ ...car, [event.target.name]: event.target.value });
    };

    const saveCar = async (d, event) => {
        console.log(car);
        event.preventDefault();

        let newCarData = new FormData();
        newCarData.append('VIN', car.vin);
        newCarData.append('model_id', car.model_id);
        newCarData.append('price', car.price);
        newCarData.append('puprose', car.purpose);
        newCarData.append('note', car.note);

        await dispatch(createCar(newCarData))
            .unwrap()
            .then(data => {
                console.log(data);
                // setCar({
                //     VIN: data.vin,
                //     model_id: data.model_id,
                //     price: data.price,
                //     purpose: data.purpose,
                //     note: data.note
                // });
            })
            .catch(e => {
                 console.log(e);
            });
        window.location.reload();
        dispatch(retriveCars());
    };

    return (
        <Fragment>
            <h4>Добавить автомобиль</h4>
            <Form onSubmit={handleSubmit(saveCar)}>
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="vin">VIN</Form.Label>
                    <Form.Text><br/>VIN должен состоять из 17 заглавных букв и цифр.</Form.Text>
                    <Form.Control
                        {...register("vin", { 
                            required: true, 
                            pattern: /^(([(A-Z)*(\d)*]){17}|([(\d)*(A-Z)*]){17})$/,
                            minLength: 17, 
                            maxLength: 17, 
                        })}
                        size="md"
                        type="text"
                        // minLength={17}
                        // maxLength={17}
                        id="vin"
                        name="vin"
                        value={car.vin}
                        onChange={handleInputChange}
                    />
                </Form.Group> 
                {errors.vin && <p>Необходимо указать VIN, состоящий из 17 заглавных букв и цифр.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="model_id">Модель автомобиля</Form.Label>
                    <Form.Select
                        {...register("model_id", { required: true })}
                        required
                        size="md"
                        id="model_id"
                        name="model_id"
                        value={car.model_id}
                        onChange={handleInputChange}
                    >
                        <option key='blankChoice' hidden value />
                        {carModels && carModels.map((carModel, index) => (
                            // console.log(carModel)
                            <option value={carModel.id} key={carModel.id}>
                                {carModel.id + " - " + carModel.brand + " " + carModel.model + " " + carModel.year + " в комплектации " + carModel.package_name + " - " + carModel.base_price}
                            </option>
                        ))}
                        {/* <option value="Бензин">Бензин</option>
                        <option value="Дизель">Дизель</option>
                        <option value="Гибрид">Гибрид</option>
                        <option value="Электро">Электро</option>
                        <option value="Неизвестно">Неизвестно</option> */}
                    </Form.Select>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="price">Цена (руб.)</Form.Label>
                    <Form.Text><br/>Цена должна находиться в пределах 1 - 999999999,99 рублей.</Form.Text>
                    <Form.Control
                        {...register("price")}
                        required
                        size="md"
                        type="number"
                        step="0.01"
                        min={0}
                        max={999999999.99}
                        id="price"
                        name="price"
                        value={car.price}
                        onChange={handleInputChange}
                        // pattern="^\d{1,9}(\,\d{0,2})$"
                    />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="purpose">Назначение</Form.Label>
                    <Form.Select
                        {...register("purpose")}
                        required
                        size="md"
                        id="purpose"
                        name="purpose"
                        value={car.purpose}
                        onChange={handleInputChange}
                    >
                        <option key='blankChoice' hidden value />
                        <option value="Реализация">Реализация</option>
                        <option value="Выстовочный образец">Выстовочный образец</option>
                        <option value="Для тест-драйва">Для тест-драйва</option>
                        <option value="Неизвестно">Неизвестно</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className='mb-3'> 
                    <Form.Label className='mb-1' htmlFor="note">Примечание</Form.Label>
                    <textarea
                        {...register("note")}
                        className="form-control"
                        rows="5"
                        size="md"
                        type="text"
                        id="note"
                        name="note"
                        // defaultValue="Примечание не найдено."
                        value={car.note}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <div>
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block"
                        // onClick={saveCarModel}
                    >
                        Добавить автомобиль
                    </button>
                </div>
            </Form>
        </Fragment>
    );
};