import React, { Fragment, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { createCar, retriveCars } from "../../slices/carSlice";
import { createStockRecord, retriveStock } from "../../slices/stockSlice";

// Add notifications on creation, wrong data input...
export const CreateCar = ({ carModels, arrivalTypes, purposes, carStatuses, acceptors, user }) => {
    const initialCarState = Object.freeze({
        vin: null,
        model_id: null,
        price: null,
        purpose: null,
        status: null,
        description: "",
        note: "",
    });

    const initialStockState = Object.freeze({
        vin: null,
        arrival_type_id: null,
        arrival_date: null,
        acceptor: null,
        purchase_value: null,
        millage: null,
    });
    
    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',}); 
    const [car, setCar] = useState(initialCarState);
    const [stockRec, setStockRec] = useState(initialStockState);
    const [stockDoc, setStockDoc] = useState("");
    const dispatch = useDispatch(); 

    const handleInputChange = event => {
        console.log(event.target.name, " - ", event.target.value);
        setCar({ ...car, [event.target.name]: event.target.value });
    };

    const handleStockChange = event => {
        setStockRec({ ...stockRec, [event.target.name]: event.target.value });
    };

    const handleDoc = event => {
        // console.log(event.target.name, " - ", event.target.files);
        setStockDoc(event.target.files[0]);
        // console.log(stockDoc);
    };

    const changeHandler = (event) => {
        handleInputChange(event);
        handleStockChange(event);
    };

    const saveData = async (d, event) => {
        event.preventDefault();

        await saveCar()
            .catch(e => {
                console.log('Error happened while running saveCar in saveData');
                console.log(e);
            });

        try {
            saveStockRecord();
        } catch (e) {
            console.log('Error happened while running saveStockRecord in saveData');
            console.log(e);
        };

        await dispatch(retriveCars());
        await dispatch(retriveStock());
        window.location.reload();
    };

    const saveCar = async (data, event) => {
        let newCarData = new FormData();
        newCarData.append('VIN', car.vin);
        newCarData.append('model_id', car.model_id);
        newCarData.append('price', car.price);
        newCarData.append('puprose', car.purpose);
        newCarData.append('status', car.status);
        newCarData.append('description', car.description);
        newCarData.append('note', car.note);

        await dispatch(createCar(newCarData))
            .unwrap()
            .catch(e => {
                console.log(e);
            });
    };

    const saveStockRecord = async (data, event) => {
        let newStockData = new FormData();
        newStockData.append('VIN', stockRec.vin);
        newStockData.append('arrival_type_id', stockRec.arrival_type_id);
        newStockData.append('arrival_date', stockRec.arrival_date);
        newStockData.append('acceptor', stockRec.acceptor);
        newStockData.append('purchase_value', stockRec.purchase_value);
        newStockData.append('millage', stockRec.millage);
        newStockData.append('stock_document', stockDoc);

        dispatch(createStockRecord(newStockData))
            .unwrap()
            .then(console.log(stockRec))
            .catch(e => {
                console.log(stockRec);
                console.log(e);
            });
    };

    return (
        <Fragment>
            <h4>Добавить автомобиль</h4>
            
            <Form onSubmit={handleSubmit(saveData)}>
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
                        value={car.vin}
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
                        value={car.model_id}
                        onChange={handleInputChange}
                    >
                        <option key='blankChoice' hidden value />
                        {Array.isArray(carModels) && carModels.map((carModel, index) => (
                            // console.log(carModel)
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
                        size="md"
                        type="number"
                        step="0.01"
                        min={0}
                        max={999999999.99}
                        id="price"
                        name="price"
                        value={car.price}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                {errors.price && <p>Необходимо указать цену автомобиля в пределах 1 - 999999999,99 рублей.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="purpose">Назначение</Form.Label>
                    <Form.Select
                        {...register("purpose", { required: true })}
                        size="md"
                        id="purpose"
                        name="purpose"
                        value={car.purpose}
                        onChange={handleInputChange}
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
                {errors.purpose && <p>Необходимо указать назначение автомобиля.</p>}
                        
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="arrival_type_id">Вид поставки</Form.Label>
                    <Form.Select
                        {...register("arrival_type_id", { required: true })}
                        size="md"
                        id="arrival_type_id"
                        name="arrival_type_id"
                        value={stockRec.arrival_type_id}
                        onChange={handleStockChange}
                    >
                        <option key='blankChoice' hidden value />
                        {Array.isArray(arrivalTypes) && arrivalTypes
                            .map((arrType, index) => (
                                <option value={arrType.arrival_type_id} key={arrType.arrival_type_id}>
                                    {`${arrType.arrival_type_id} - ${arrType.name}`}
                                </option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                {errors.arrival_type_id && <p>Необходимо указать вид поставки.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="status">Статус</Form.Label>
                    <Form.Select
                        {...register("status", { required: true })}
                        size="md"
                        id="status"
                        name="status"
                        value={car.status}
                        onChange={handleInputChange}
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
                {errors.status && <p>Необходимо указать статус автомобиля.</p>}


                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="arrival_date">Дата поставки</Form.Label>
                    <Form.Control
                        {...register("arrival_date", { required: true })}
                        size="md"
                        type="date"
                        id="arrival_date"
                        name="arrival_date"
                        value={stockRec.arrival_date}
                        onChange={handleStockChange}
                    />
                </Form.Group>
                {errors.arrival_date && <p>Необходимо указать дату поставки.</p>}

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
                        value={stockRec.purchase_value}
                        onChange={handleStockChange}
                    />
                </Form.Group>
                {errors.purchase_value && <p>Необходимо указать стоимость приобретения.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="acceptor">Приемщик</Form.Label>
                    <Form.Select
                        {...register("acceptor", { required: true })}
                        size="md"
                        id="acceptor"
                        name="acceptor"
                        value={stockRec.acceptor}
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
                {errors.acceptor && <p>Необходимо указать приемщика автомобиля.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="millage">Пробег (км).</Form.Label>
                    <Form.Control
                        {...register("millage", { required: true })}
                        size="md"
                        type="number"
                        step="1"
                        min={0}
                        id="millage"
                        name="millage"
                        value={stockRec.millage}
                        onChange={handleStockChange}
                    />
                </Form.Group>
                {errors.millage && <p>Необходимо указать пробег автомобиля.</p>}

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
                        value={car.description}
                        onChange={handleInputChange}
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
                        value={car.note}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className='mb-3'> 
                    <Form.Label className='mb-1' htmlFor="stock_document">Документ приемки</Form.Label>
                    <Form.Control
                        {...register("stock_document", { required: true })}
                        className="form-control"
                        size="md"
                        type="file"
                        accept=".png, .jpg., .jpeg, .doc, .docx, .pdf, application/msword"
                        id="stock_document"
                        name="stock_document"
                        value={stockRec.stock_document}
                        onChange={handleDoc}
                    />
                </Form.Group>
                {errors.stock_document && <p>Необходимо добавить документ приемки.</p>}

                <div>
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block"
                    >
                        Добавить автомобиль
                    </button>
                </div>
            </Form>
        </Fragment>
    );
};