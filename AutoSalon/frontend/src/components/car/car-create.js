import React, { Fragment, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { createCar, retriveCars } from "../../slices/carSlice";
import { createStockRecord } from "../../slices/stockSlice";

// Add car pictures...
// Add notifications on creation, wrong data input...
export const CreateCar = ({ carModels, arrivalTypes }) => {
    const initialCarState = Object.freeze({
        vin: null,
        model_id: null,
        price: null,
        purpose: null,
        note: "",
    });

    const initialStockState = Object.freeze({
        vin: null,
        arrival_type_id: null,
        arrival_date: null,
        purchase_value: null,
        millage: null,
    });
    
    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',}); 
    const [car, setCar] = useState(initialCarState);
    const [stockRec, setStockRec] = useState(initialStockState);
    const dispatch = useDispatch(); 
    // console.log(carModels);

    const handleInputChange = event => {
        console.log(event.target.name, " - ", event.target.value);
        setCar({ ...car, [event.target.name]: event.target.value });
        console.log(car);
    };

    const handleStockChange = event => {
        console.log(event.target.name, " - ", event.target.value);
        setStockRec({ ...stockRec, [event.target.name]: event.target.value });
        console.log(stockRec);
    };

    const saveData = async (d, event) => {
        event.preventDefault();
        // await Promise.all([dispatch(saveStockRecord(), dispatch(saveCar()))]);
        // await Promise.all([saveCar(), saveStockRecord()]);
        // await saveStockRecord();
        // const res = await dispatch(saveCar());
        // if (res.ok) {
        //     saveStockRecord();
        //     window.location.reload();
        //     dispatch(retriveCars());
        // }
        //     // .then(((saveStockRecord())))
        // (dispatch(saveStockRecord()));

        await saveCar().catch(e => {
            console.log('Error happened while running saveCar in saveData');
            console.log(e);
        });

        try {
            saveStockRecord();
        } catch (e) {
            console.log('Error happened while running saveStockRecord in saveData');
            console.log(e);
        };

        window.location.reload();

        // await saveStockRecord().catch(e => {
        //     console.log('Error happened while running saveStockRecord in saveData');
        //     console.log(e);
        // });

        // try {
        //     saveCar();
        // } catch (e) {
        //     console.log('Error happened while running saveCar in saveData');
        //     console.log(e);
        // };
    };

    const saveCar = async (data, event) => {
        // event.preventDefault();
        let newCarData = new FormData();
        newCarData.append('VIN', car.vin);
        newCarData.append('model_id', car.model_id);
        newCarData.append('price', car.price);
        newCarData.append('puprose', car.purpose);
        newCarData.append('note', car.note);

        await dispatch(createCar(newCarData))
            .unwrap()
            .then(data => {
                // console.log(data);
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
    };

    const saveStockRecord = async (data, event) => {
        // event.preventDefault();
        let newStockData = new FormData();
        newStockData.append('VIN', stockRec.vin);
        newStockData.append('arrival_type_id', stockRec.arrival_type_id);
        newStockData.append('arrival_date', stockRec.arrival_date);
        newStockData.append('purchase_value', stockRec.purchase_value);
        newStockData.append('millage', stockRec.millage);

        dispatch(createStockRecord(newStockData))
            .unwrap()
            .then(console.log(stockRec))
            .catch(e => {
                console.log(stockRec);
                console.log(e);
            });
    };

    const changeHandler = (event) => {
        handleInputChange(event);
        handleStockChange(event);
    }

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
                        value={car.price}
                        onChange={handleInputChange}
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
                    <Form.Label className='mb-1' htmlFor="model_id">Вид поставки</Form.Label>
                    <Form.Select
                        {...register("arrival_type_id", { required: true })}
                        // required
                        size="md"
                        id="arrival_type_id"
                        name="arrival_type_id"
                        value={stockRec.arrival_type_id}
                        onChange={handleStockChange}
                    >
                        <option key='blankChoice' hidden value />
                        {arrivalTypes && arrivalTypes.map((arrType, index) => (
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
                        value={stockRec.arrival_date}
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
                        value={stockRec.purchase_value}
                        onChange={handleStockChange}
                        // pattern="^\d{1,9}(\,\d{0,2})$"
                    />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="purchase_value">Пробег (км).</Form.Label>
                    <Form.Control
                        {...register("millage", { required: true })}
                        // required
                        size="md"
                        type="number"
                        step="0.01"
                        min={0}
                        id="millage"
                        name="millage"
                        value={stockRec.millage}
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