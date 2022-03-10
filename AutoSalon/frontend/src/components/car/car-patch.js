import React, { Fragment, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { updateCar } from "../../slices/carSlice";
import { updateStock } from "../../slices/stockSlice";

const CarUpdate = ({ car, stock, carModels, 
    arrTypes, carStatuses, user, 
    acceptors, purposes }) => {
    // console.log(stock[0]);

    const initialCarState = {
        VIN: car.VIN,
        model_id: car.model_id,
        price: car.price,
        purpose: car.purpose,
        status: car.status,
        description: car.description,
        note: car.note,
    };

    const initialStockState = {
        id: stock.id,
        VIN: stock.VIN,
        arrival_type_id: stock.arrival_type_id,
        arrival_date: stock.arrival_date,
        acceptor: stock.acceptor,
        purchase_value: stock.purchase_value,
        millage: stock.millage,
        stock_document: stock.stock_document,
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

            {Array.isArray(stock) && stock
            .map((s, index) => (
            <Form onSubmit={handleSubmit(patchData)}>
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="vin">VIN</Form.Label>
                    <Form.Text><br/>VIN должен состоять из 17 заглавных букв и цифр.</Form.Text>
                    <Form.Control
                        {...register("vin", { 
                            required: true, 
                            pattern: /^(?=.*?\d)(?=.*?[A-Z])[A-Z\d]{17}$/,
                            minLength: 17, 
                            maxLength: 17, 
                        })}
                        size="md"
                        type="text"
                        id="vin"
                        name="vin"
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
                        {Array.isArray(carModels) && carModels.map((carModel, index) => (
                            <option value={carModel.id} key={carModel.id}>
                                {carModel.id + " - " + carModel.brand + " " + carModel.model + " " + carModel.year + " в комплектации " + carModel.package_name + " - " + carModel.base_price}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                {errors.model_id && <p>Необходимо указать модель автомобиля.</p>}

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
                    />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="purpose">Назначение</Form.Label>
                    <Form.Select
                        {...register("purpose", { required: true })}
                        size="md"
                        id="purpose"
                        name="purpose"
                        defaultValue={car.purpose}
                        onChange={handleCarChange}
                    >
                        <option key='blankChoice' hidden value />
                        {Array.isArray(purposes) && purposes
                            .map((p, index) => (
                                <option value={p.id} key={p.id}>
                                    {`${p.id} - ${p.name}`}
                                </option>
                            )
                        )}
                    </Form.Select>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="arrival_type">Вид поставки</Form.Label>
                    <Form.Select
                        {...register("arrival_type", { required: true })}
                        size="md"
                        id="arrival_type"
                        name="arrival_type"
                        defaultValue={s.arrival_type}
                        onChange={handleStockChange}
                    >
                        <option key='blankChoice' hidden value />
                        {Array.isArray(arrTypes) && arrTypes.map((arrType, index) => (
                            <option value={arrType.arrival_type_id} key={arrType.arrival_type_id}>
                                {arrType.arrival_type_id + " - " + arrType.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="status">Статус</Form.Label>
                    <Form.Select
                        {...register("status", { required: true })}
                        size="md"
                        id="status"
                        name="status"
                        defaultValue={car.status}
                        onChange={handleCarChange}
                    >
                        <option key='blankChoice' hidden value />
                        {Array.isArray(carStatuses) && carStatuses
                            .map((cS, index) => (
                                <option value={cS.id} key={cS.id}>
                                    {`${cS.id} - ${cS.name}`}
                                </option>
                            )
                        )}
                    </Form.Select>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="arrival_date">Дата поставки</Form.Label>
                    <Form.Control
                        {...register("arrival_date", { required: true })}
                        size="md"
                        type="date"
                        id="arrival_date"
                        name="arrival_date"
                        defaultValue={s.arrival_date}
                        onChange={handleStockChange}
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
                        defaultValue={s.purchase_value}
                        onChange={handleStockChange}
                    />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="acceptor">Приемщик</Form.Label>
                    <Form.Select
                        {...register("acceptor", { required: true })}
                        size="md"
                        id="acceptor"
                        name="acceptor"
                        defaultValue={s.acceptor}
                        onChange={handleStockChange}
                    >
                        <option key='blankChoice' hidden value />
                        {(user.user.is_superuser || user.user.is_sales_director) ? (
                            Array.isArray(acceptors) && acceptors
                                .map((acceptor, index) => (
                                    <option value={acceptor.id} key={acceptor.id}>
                                        {acceptor.is_sales_director ? (
                                            `${acceptor.id} - ${acceptor.name} - Директор`
                                        ) : (
                                            `${acceptor.id} - ${acceptor.name} - Менеджер по закупкам`
                                        )}
                                    </option>
                                )
                            )
                        ) : (
                            <option value={user.id} key={user.id}>
                                {`${user.user.id} - ${user.user.name} - Менеджер по закупкам`}
                            </option>
                        )}
                    </Form.Select>
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
                        defaultValue={s.millage}
                        onChange={handleStockChange}
                    />
                </Form.Group>

                <Form.Group className='mb-3'> 
                    <Form.Label className='mb-1' htmlFor="note">Описание автомобиля (необязательно)</Form.Label>
                    <textarea
                        {...register("description")}
                        className="form-control"
                        rows="5"
                        size="md"
                        type="text"
                        id="description"
                        name="description"
                        defaultValue={car.description}
                        onChange={handleCarChange}
                    />
                </Form.Group>

                <Form.Group className='mb-3'> 
                    <Form.Label className='mb-1' htmlFor="note">Примечание (необязательно)</Form.Label>
                    <textarea
                        {...register("note")}
                        className="form-control"
                        rows="5"
                        size="md"
                        type="text"
                        id="note"
                        name="note"
                        defaultValue={car.note}
                        onChange={handleCarChange}
                    />
                </Form.Group>

                <Form.Group className='mb-3'> 
                    <Form.Label className='mb-1' htmlFor="stock_document">Документ приемки</Form.Label>
                    <Form.Control
                        {...register("stock_document")}
                        className="form-control"
                        size="md"
                        type="file"
                        accept=".png, .jpg., .jpeg, .doc, .docx, .pdf, application/msword"
                        id="stock_document"
                        name="stock_document"
                        // defaultValue={stock.stock_document}
                        // onChange={handleDoc}
                        onChange={handleStockChange}
                    />
                </Form.Group>
                

                <div>
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block"
                    >
                        Обновить информацию
                    </button>
                </div>
            </Form>
            ))}
        </Fragment>
    );
};

export default CarUpdate;