import React, { Fragment, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { createSaleRecord } from "../../slices/saleSlice";

export const CreateSale = ({ purch_types, empl, cars, carModels }) => {
    const initialSaleState = Object.freeze({
        vin: null,
        seller: null,
        date: null,
        purchase_type_id: null,
        sale_price: null,
        customer_passport: null,
        // add_option_id: null,
        add_option_id: [],
        note: "",
    });
    
    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',}); 
    const [saleRec, setSaleRec] = useState(initialSaleState);
    const dispatch = useDispatch(); 

    const handleSaleChange = event => {
        console.log(event.target.name, " - ", event.target.value);
        setSaleRec({ ...saleRec, [event.target.name]: event.target.value });
        console.log(saleRec);
    };

    const handlePriceChange = event => {
        console.log(event.target.name, " - ", event.target.value);
        // setSaleRec({...saleRec.sale_price += event.target.value});
        // initialSaleState.sale_price += event.target.value;
        console.log("New price = ", saleRec.sale_price);
    };

    const changeHandler = event => {
        handleSaleChange(event);
        handlePriceChange(event);
    };

    const saveSale = async (event) => {
        event.preventDefault();
        let newSaleData = new FormData();
        // foreach id in saleRec.add_option_id ...
        newSaleData.append('VIN', saleRec.vin);
        newSaleData.append('seller', empl.id);
        newSaleData.append('date', saleRec.price);
        newSaleData.append('purchase_type_id', saleRec.purchase_type_id);
        newSaleData.append('sale_price', saleRec.sale_price);
        newSaleData.append('customer_passport', saleRec.customer_passport);
        newSaleData.append('add_option_id', saleRec.add_option_id);
        newSaleData.append('note', saleRec.note);

        await dispatch(createSaleRecord(newSaleData))
            .unwrap()
            .catch(e => {
                console.log('Error happened while running saveSale');
                console.log(e);
            });

        // window.location.reload();
    };

    return (
        <Fragment>
            <h4>Добавить запись продажи</h4>

            <Form onSubmit={handleSubmit(saveSale)}>
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="vin">Автомобиль</Form.Label>
                    <Form.Select
                            {...register("vin", { required: true })}
                            // required
                            size="md"
                            id="vin"
                            name="vin"
                            value={saleRec.vin}
                            onChange={changeHandler}
                        >
                            <option key='blankChoice' hidden value />
                            {cars && cars.map((car, index) => (
                                carModels && carModels
                                    .filter(carModel => carModel.id === car.model_id)
                                    .map((carModel, index) => (
                                    // console.log(carModel)
                                    <option value={car.VIN} key={car.VIN}>
                                        {`${car.VIN} - ${car.price}  руб.,  ${carModel.model} ${carModel.year}
                                        в комплектации  ${carModel.package_name}`}
                                    </option>
                                ))
                            ))}
                    </Form.Select>
                </Form.Group>    

            </Form>
        </Fragment>
    );
};