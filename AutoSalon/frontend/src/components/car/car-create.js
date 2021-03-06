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
            <h4>???????????????? ????????????????????</h4>
            
            <Form onSubmit={handleSubmit(saveData)}>
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="vin">VIN</Form.Label>
                    <Form.Text><br/>VIN ???????????? ???????????????? ???? 17 ?????????????????? ???????? ?? ????????.</Form.Text>
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
                {errors.vin && <p>???????????????????? ?????????????? VIN, ?????????????????? ???? 17 ?????????????????? ???????? ?? ????????.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="model_id">???????????? ????????????????????</Form.Label>
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
                                {carModel.id + " - " + carModel.brand + " " + carModel.model + " " + carModel.year + " ?? ???????????????????????? " + carModel.package_name + " - " + carModel.base_price}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                {errors.model_id && <p>???????????????????? ?????????????? ???????????? ????????????????????.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="price">???????? (??????.)</Form.Label>
                    <Form.Text><br/>???????? ???????????? ???????????????????? ?? ???????????????? 1 - 999999999,99 ????????????.</Form.Text>
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
                {errors.price && <p>???????????????????? ?????????????? ???????? ???????????????????? ?? ???????????????? 1 - 999999999,99 ????????????.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="purpose">????????????????????</Form.Label>
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
                {errors.purpose && <p>???????????????????? ?????????????? ???????????????????? ????????????????????.</p>}
                        
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="arrival_type_id">?????? ????????????????</Form.Label>
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
                {errors.arrival_type_id && <p>???????????????????? ?????????????? ?????? ????????????????.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="status">????????????</Form.Label>
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
                {errors.status && <p>???????????????????? ?????????????? ???????????? ????????????????????.</p>}


                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="arrival_date">???????? ????????????????</Form.Label>
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
                {errors.arrival_date && <p>???????????????????? ?????????????? ???????? ????????????????.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="purchase_value">?????????????????? ???????????????????????? (??????.)</Form.Label>
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
                {errors.purchase_value && <p>???????????????????? ?????????????? ?????????????????? ????????????????????????.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="acceptor">????????????????</Form.Label>
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
                                            `${acceptor.id} - ${acceptor.name} - ????????????????`
                                        ) : (
                                            `${acceptor.id} - ${acceptor.name} - ???????????????? ???? ????????????????`
                                        )}
                                    </option>
                                )
                            )
                        ) : (
                            <option value={user.id} key={user.id}>
                                {`${user.user.id} - ${user.user.name} - ???????????????? ???? ????????????????`}
                            </option>
                        )}
                    </Form.Select>
                </Form.Group>
                {errors.acceptor && <p>???????????????????? ?????????????? ?????????????????? ????????????????????.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="millage">???????????? (????).</Form.Label>
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
                {errors.millage && <p>???????????????????? ?????????????? ???????????? ????????????????????.</p>}

                <Form.Group className='mb-3'> 
                    <Form.Label className='mb-1' htmlFor="note">???????????????? ???????????????????? (??????????????????????????)</Form.Label>
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
                    <Form.Label className='mb-1' htmlFor="note">???????????????????? (??????????????????????????)</Form.Label>
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
                    <Form.Label className='mb-1' htmlFor="stock_document">???????????????? ??????????????</Form.Label>
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
                {errors.stock_document && <p>???????????????????? ???????????????? ???????????????? ??????????????.</p>}

                <div>
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block"
                    >
                        ???????????????? ????????????????????
                    </button>
                </div>
            </Form>
        </Fragment>
    );
};