import React, { Fragment, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { createSaleRecord, retriveSaleRecords } from "../../slices/saleSlice";

export const CreateSale = ({ purch_types, empl, cars, carModels, addOpts, sales }) => {
    // console.log(sales);
    // const sold = cars && Array.isArray(sales) && sales.filter(s => !cars.includes(s));
    // const sold = sales.map((sale, index) => (cars.filter(car => car.VIN === sale.VIN)));
    // const notSold = sales && cars.filter(car => !sales.includes(car.VIN));
    // const notSold = sold && cars.filter(car => !sold.includes(car.VIN));

    // console.log(sold);
    // console.log(notSold);

    const initialSaleState = Object.freeze({
        vin: null,
        seller: empl.id,
        // date: today,
        purchase_type_id: null,
        sale_price: null,
        customer_passport: null,
        // add_option_id: null,
        // add_option_id: [],
        note: "Примечание не найдено.",
    });
    
    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',}); 
    const [saleRec, setSaleRec] = useState(initialSaleState);
    const [price, setPrice] = useState(null);
    const [addOptions, setAddOptions] = useState([]);
    const dispatch = useDispatch(); 

    const handleSaleChange = event => {
        console.log(event.target.name, " - ", event.target.value);
        setSaleRec({ ...saleRec, [event.target.name]: event.target.value });
        console.log(saleRec);
    };

    const handlePriceChange = event => {
        console.log(event.target.name, " - ", event.target.value);
        setPrice(price => event.target.value);
        console.log("New price = ", price);
    };

    const handleAddOptChange = event => {
        console.log(event.target.name, " - ", event.target.value);
        if (!addOptions.includes(event.target.value)) {
            setAddOptions(addOptions => [...addOptions, event.target.value]);
        } else {
            setAddOptions(addOptions => addOptions.splice(addOptions.indexOf(event.target.value), 1));
        }
        console.log(`${addOptions} - ${addOptions.length} items`);
    };

    const changeHandler = event => {
        handleSaleChange(event);
        handlePriceChange(event);
    };

    const saveSale = async (data, event) => {
        const date = new Date();
        const today = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();

        event.preventDefault();
        let newSaleData = new FormData();
        newSaleData.append('VIN', saleRec.vin);
        newSaleData.append('seller', empl.id);
        newSaleData.append('date', today); // today
        newSaleData.append('purchase_type_id', saleRec.purchase_type_id);
        newSaleData.append('sale_price', price);
        newSaleData.append('customer_passport', saleRec.customer_passport);
        if (addOptions.length) { 
            console.log(`${addOptions} - ${addOptions.length} items`);
            for (let i=0; i<=addOptions.length-1; i++) {
                newSaleData.append('add_option_id', addOptions[i]);
            };
            console.log(newSaleData.getAll('add_option_id'));
        };
        newSaleData.append('note', saleRec.note);

        await dispatch(createSaleRecord(newSaleData))
            .unwrap()
            .catch(e => {
                console.log('Error happened while running saveSale');
                console.log(e);
            });

        await dispatch(retriveSaleRecords());
        window.location.reload();
    };

    return (
        <Fragment>
            <h4>Добавить запись продажи</h4>

            <Form onSubmit={handleSubmit(saveSale)}>
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="vin">Автомобиль</Form.Label>
                    <Form.Select
                            {...register("vin", { required: true })}
                            size="md"
                            id="vin"
                            name="vin"
                            value={saleRec.vin}
                            onChange={changeHandler}
                        >
                            <option key='blankChoice' hidden value />
                            {/* {cars && cars.map((car, index) => (
                                carModels && carModels
                                    .filter(carModel => carModel.id === car.model_id)
                                    .map((carModel, index) => (
                                    // console.log(carModel)
                                    <option value={car.VIN} key={car.VIN}>
                                        {`${car.VIN} - ${car.price}  руб.,  ${carModel.model} ${carModel.year}
                                        в комплектации  ${carModel.package_name}`}
                                    </option>
                                ))
                            ))} */}
                            {Array.isArray(cars) && cars
                                // .filter(car => car.VIN === sales.VIN)
                                // .filter(car => sales.includes(car.VIN))
                                .map((car, index) => (
                                    // Array.isArray(sales) && sales &&
                                        // .filter(sale => sale.VIN === car.VIN),
                                        // .filter(car => sales.includes(car.VIN)),
                                        // .filter(sale => sale.VIN !== car.VIN)
                                        // .map((sale, index) => (
                                            Array.isArray(carModels) && carModels
                                                .filter(carModel => carModel.id === car.model_id)
                                                // .filter(car => car.VIN !== sale.VIN)
                                                .map((carModel, index) => (
                                            // console.log(carModel)
                                                <option value={car.VIN} key={car.VIN}>
                                                    {`${car.VIN} - ${car.price}  руб.,  ${carModel.model} ${carModel.year}
                                                    в комплектации  ${carModel.package_name}`}
                                                </option>
                                                ))
                                        // ))
                                    )
                                )
                            }
                    </Form.Select>
                </Form.Group>  

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="purchase_type_id">Вид покупки</Form.Label>
                    <Form.Select
                            {...register("purchase_type_id", { required: true })}
                            size="md"
                            id="purchase_type_id"
                            name="purchase_type_id"
                            value={saleRec.purchase_type_id}
                            onChange={changeHandler}
                        >
                            <option key='blankChoice' hidden value />
                            {Array.isArray(purch_types) && purch_types.map((purch_type, index) => (
                                <option value={purch_type.id} key={purch_type.id}>
                                    {`${purch_type.name}, коэффициент цены - x${purch_type.coefficient}`}
                                </option>
                            ))}
                    </Form.Select>
                </Form.Group>    

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="sale_price">Цена продажи автомобиля (руб.)</Form.Label>
                    <Form.Text><br/>Цена должна находиться в пределах 1 - 999999999,99 рублей.</Form.Text>
                    <Form.Control
                        {...register("sale_price", { required: true })}
                        size="md"
                        type="number"
                        step="0.01"
                        min={0}
                        max={999999999.99}
                        id="sale_price"
                        name="sale_price"
                        value={saleRec.sale_price}
                        onChange={handlePriceChange}
                        // pattern="^\d{1,9}(\,\d{0,2})$"
                    />
                </Form.Group> 

                <Form.Group className='mb-3'>
                <Form.Label className='mb-1' htmlFor="addOpt">Дополнительное оборудование</Form.Label>
                    <Form.Text>
                        <br/>Выберите дополнительное оборудование для установки.<br/>
                    </Form.Text>
                    {Array.isArray(addOpts) && addOpts.map((addOpt, index) => (
                        <Form.Check
                            {...register("addOpt")}
                            style={{textAlign: "left"}}
                            id={`addOpts-cb-${addOpt.id}`}
                            label={`${addOpt.name} - ${addOpt.price} руб.`}
                            name={addOpt.name}
                            value={addOpt.id}
                            onChange={handleAddOptChange}
                        />
                    ))}
                </Form.Group>
                        {/*<span>
                             <label htmlFor={`addOpts-cb-${addOpt.id}`}>
                                {addOpt.name}
                            </label> */}
                            {/* <label htmlFor={`addOpts-cb-${addOpt.id}`}>
                                {addOpt.price}
                            </label>
                            <br/> 
                        </span>*/}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="customer_passport">Серия и номер пасспорта покупателя</Form.Label>
                    <Form.Text><br/>Серия и номер пасспорта должны включать 10 цифр.</Form.Text>
                    <Form.Control
                        {...register("customer_passport", { required: true })}
                        size="md"
                        type="number"
                        step="1"
                        min={1000000000}
                        max={9999999999}
                        id="customer_passport"
                        name="customer_passport"
                        value={saleRec.customer_passport}
                        onChange={handleSaleChange}
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
                        value={saleRec.note}
                        onChange={handleSaleChange}
                    />
                </Form.Group>
                
                <div>
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block"
                        // onClick={saveCarModel}
                    >
                        Оформить продажу
                    </button>
                </div>
            </Form>
        </Fragment>
    );
};