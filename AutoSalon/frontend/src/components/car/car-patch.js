import React, { Fragment, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { updateCar } from "../../slices/carSlice";
import { updateStock } from "../../slices/stockSlice";

const CarUpdate = ({ car, stock, carModels, arrTypes }) => {
    const initialCarState = {
        VIN: car.VIN,
        model_id: car.model_id,
        price: car.price,
        purpose: car.purpose,
        note: car.note,
        // multiple images
    };

    const initialStockState = {
        id: stock.id,
        VIN: stock.VIN,
        arrival_type_id: stock.arrival_type_id,
        arrival_date: stock.arrival_date,
        purchase_value: stock.purchase_value,
        millage: stock.millage,
    };

    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',}); 

    let carPatchData = new FormData();
    let stockPatchData = new FormData();

    const handleCarChange = (event) => {
        const {name, value} = event.target;
        // console.log("handleChange -> " + name + ":" + value);
        carPatchData.append(`${name}`, value);
        // console.log(JSON.stringify(patchData));
        // console.log(patchData);
    };

    const handleStockChange = (event) => {
        const {name, value} = event.target;
        // console.log("handleChange -> " + name + ":" + value);
        stockPatchData.append(`${name}`, value);
        // console.log(JSON.stringify(patchData));
        // console.log(patchData);
    };

    const changeHandler = (event) => {
        handleCarChange(event);
        handleStockChange(event);
    };

    const patchData = async (event) => { // add notification/popups on success and on failure 
        await Promise.all([patchCar(), patchStock()]);
        window.location.reload();
    };

    const patchCar = (event) => { // add notification/popups on success and on failure 
        dispatch(updateCar({ id: car.VIN, data: carPatchData }))
            .unwrap()
            .then(response => {
                console.log('response - ', response);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const patchStock = (event) => { // add notification/popups on success and on failure 
        dispatch(updateStock({ id: stock.id, data: stockPatchData }))
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
            <h4>Изменить данные автомобиля</h4>

            <Form onSubmit={handleSubmit(patchData)}>
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
                        // value={car.vin}
                        defaultValue={car.VIN}
                        onChange={changeHandler}
                    />
                </Form.Group> 
                {errors.vin && <p>Необходимо указать VIN, состоящий из 17 заглавных букв и цифр.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="model_id">Модель автомобиля</Form.Label>
                    <Form.Select
                        {...register("model_id", { required: true })}
                        // required
                        size="md"
                        id="model_id"
                        name="model_id"
                        defaultValue={car.model_id}
                        onChange={handleCarChange}
                    >
                        <option key='blankChoice' hidden value />
                        {carModels && carModels.map((carModel, index) => (
                            // console.log(carModel)
                            <option value={carModel.id} key={carModel.id}>
                                {carModel.id + " - " + carModel.brand + " " + carModel.model + " " + carModel.year + " в комплектации " + carModel.package_name + " - " + carModel.base_price}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="price">Цена (руб.)</Form.Label>
                    <Form.Text><br/>Цена должна находиться в пределах 1 - 999999999,99 рублей.</Form.Text>
                    <Form.Control
                        {...register("price", { required: true })}
                        // required
                        size="md"
                        type="number"
                        step="0.01"
                        min={0}
                        max={999999999.99}
                        id="price"
                        name="price"
                        defaultValue={car.price}
                        onChange={handleCarChange}
                        // pattern="^\d{1,9}(\,\d{0,2})$"
                    />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="purpose">Назначение</Form.Label>
                    <Form.Select
                        {...register("purpose", { required: true })}
                        // required
                        size="md"
                        id="purpose"
                        name="purpose"
                        defaultValue={car.purpose}
                        onChange={handleCarChange}
                    >
                        <option key='blankChoice' hidden value />
                        <option value="Реализация">Реализация</option>
                        <option value="Выстовочный образец">Выстовочный образец</option>
                        <option value="Для тест-драйва">Для тест-драйва</option>
                        <option value="Неизвестно">Неизвестно</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="arrival_type_id">Вид поставки</Form.Label>
                    <Form.Select
                        {...register("arrival_type_id", { required: true })}
                        // required
                        size="md"
                        id="arrival_type_id"
                        name="arrival_type_id"
                        defaultValue={stock.arrival_type_id}
                        onChange={handleStockChange}
                    >
                        <option key='blankChoice' hidden value />
                        {arrTypes && arrTypes.map((arrType, index) => (
                            // console.log(carModel)
                            <option value={arrType.arrival_type_id} key={arrType.arrival_type_id}>
                                {arrType.arrival_type_id + " - " + arrType.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="arrival_date">Дата поставки</Form.Label>
                    <Form.Control
                        {...register("arrival_date", { required: true })}
                        // required
                        size="md"
                        type="date"
                        id="arrival_date"
                        name="arrival_date"
                        defaultValue={stock.arrival_date}
                        onChange={handleStockChange}
                        // pattern="^\d{1,9}(\,\d{0,2})$"
                    />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="purchase_value">Стоимость приобретения (руб.)</Form.Label>
                    <Form.Control
                        {...register("purchase_value", { required: true })}
                        required
                        size="md"
                        type="number"
                        step="0.01"
                        min={0}
                        max={999999999.99}
                        id="purchase_value"
                        name="purchase_value"
                        defaultValue={stock.purchase_value}
                        onChange={handleStockChange}
                        // pattern="^\d{1,9}(\,\d{0,2})$"
                    />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="millage">Пробег (км).</Form.Label>
                    <Form.Control
                        {...register("millage", { required: true })}
                        // required
                        size="md"
                        type="number"
                        step="0.01"
                        min={0}
                        id="millage"
                        name="millage"
                        defaultValue={stock.millage}
                        onChange={handleStockChange}
                        // pattern="^\d{1,9}(\,\d{0,2})$"
                    />
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
                        defaultValue={car.note}
                        onChange={handleCarChange}
                    />
                </Form.Group>

                <div>
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block"
                        // onClick={saveCarModel}
                    >
                        Обновить информацию
                    </button>
                </div>
            </Form>
        </Fragment>
    );
};

export default CarUpdate;