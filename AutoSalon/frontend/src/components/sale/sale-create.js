import React, { Fragment, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { createSaleRecord, retriveSaleRecords } from "../../slices/saleSlice";
import { updateCar, retriveCars } from "../../slices/carSlice";

export const CreateSale = ({ purch_types, empls, cars, carModels, addOpts, sales, user, saleTypes, saleStatuses }) => {

    const initialSaleState = Object.freeze({
        vin: null,
        seller: null,
        purchase_type: null,
        sale_type: null,
        sale_status: null,
        sale_price: null,
        customer_info: null,
        note: "Примечание не найдено.",
    });
    
    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',}); 
    const [saleRec, setSaleRec] = useState(initialSaleState);
    const [saleDoc, setSaleDoc] = useState("");
    const [addOptions, setAddOptions] = useState([]);
    const [price, setPrice] = useState(null);
    const dispatch = useDispatch(); 

    const handleSaleChange = event => {
        console.log(event.target.name, " - ", event.target.value);
        setSaleRec({ ...saleRec, [event.target.name]: event.target.value });
        console.log(saleRec);
    };

    const handleDoc = event => {
        // console.log(event.target.name, " - ", event.target.files);
        setSaleDoc(event.target.files[0]);
        // console.log(saleDoc);
    };

    const handleAddOptChange = event => {
        console.log(event.target.name, " - ", event.target.value);
        if (!addOptions.includes(event.target.value)) {
            setAddOptions(addOptions => [...addOptions, event.target.value]);
        } else {
            setAddOptions(addOptions => addOptions.splice(addOptions.indexOf(event.target.value), 1));
        }
        // console.log(`${addOptions} - ${addOptions.length} items`);
    };

    const saveData = async (d, event) => {
        event.preventDefault();

        await saveSale()
            .catch(e => {
                console.log('Error happened while running saveSale in saveData');
                console.log(e);
            });

        try {
            changeCarStatus();
        } catch (e) {
            console.log('Error happened while running changeCarStatus in saveData');
            console.log(e);
        };

        await dispatch(retriveSaleRecords());
        await dispatch(retriveCars());
        window.location.reload();
    };

    const saveSale = async (data, event) => { //  
        const date = new Date();
        const today = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();

        let newSaleData = new FormData();
        newSaleData.append('VIN', saleRec.vin);
        newSaleData.append('seller', saleRec.seller);
        newSaleData.append('date', today); // today
        newSaleData.append('purchase_type', saleRec.purchase_type);
        newSaleData.append('sale_type', saleRec.sale_status);
        newSaleData.append('sale_status', saleRec.sale_status);
        newSaleData.append('sale_price', saleRec.sale_price);
        newSaleData.append('customer_info', saleRec.customer_info);
        newSaleData.append('sale_document', saleDoc);
        newSaleData.append('note', saleRec.note);
        
        if (addOptions.length) { 
            console.log(`${addOptions} - ${addOptions.length} items`);
            for (let i=0; i<=addOptions.length-1; i++) {
                newSaleData.append('add_option_id', addOptions[i]);
            };
            console.log(newSaleData.getAll('add_option_id'));
        };

        await dispatch(createSaleRecord(newSaleData)) //
            .unwrap()
            .then(console.log(newSaleData.values()))
            .catch(e => {
                console.log(e);
            });
    };

    const changeCarStatus = async (data, event) => { //
        let carPatchData = new FormData();
        carPatchData.append('status', 4);

        await dispatch(updateCar({ id: saleRec.vin, data: carPatchData }))
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
            <h4>Добавить запись продажи</h4>

            <Form onSubmit={handleSubmit(saveData)}>
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="vin">
                        Автомобиль
                    </Form.Label>
                    <Form.Select
                        {...register("vin", { required: true })}
                        size="md"
                        id="vin"
                        name="vin"
                        value={saleRec.vin}
                        onChange={handleSaleChange}
                    >
                        <option key='blankChoice' hidden value />
                        {Array.isArray(cars) && cars
                            .map((car, index) => (
                                Array.isArray(carModels) && carModels
                                    .filter(carModel => carModel.id === car.model_id)
                                    .map((carModel, index) => (
                                    <option value={car.VIN} key={car.VIN}>
                                        {`${car.VIN} - ${car.price}  руб.,  ${carModel.model} ${carModel.year}
                                        в комплектации  ${carModel.package_name}`}
                                    </option>)
                                    )
                                )
                            )
                        }
                    </Form.Select>
                </Form.Group>  
                {errors.vin && <p>Необходимо выбрать автомобиль.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="seller">
                        Ответственный за продажу
                    </Form.Label>
                    <Form.Select
                        {...register("seller", { required: true })}
                        size="md"
                        id="seller"
                        name="seller"
                        value={saleRec.seller}
                        onChange={handleSaleChange}
                    >
                        <option key='blankChoice' hidden value />
                        {user.is_sales_manager ? (
                            <option value={user.id} key={user.id}>
                                {`${user.name} - менеджер по продажам`}
                            </option>
                        ) : (
                            Array.isArray(empls) && 
                                empls.map((empl, index) => (
                                    <option value={empl.id} key={empl.id}>
                                        {empl.is_sales_director ? (
                                            `${empl.name} - директор по продажам`
                                        ) : (
                                            `${empl.name} - менеджер по продажам`
                                        )}
                                    </option>
                                ))
                        )}
                    </Form.Select>
                </Form.Group>  
                {errors.seller && <p>Необходимо выбрать ответственного за продажу.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="purchase_type">
                        Вид приобретения покупателем
                    </Form.Label>
                    <Form.Select
                        {...register("purchase_type", { required: true })}
                        size="md"
                        id="purchase_type"
                        name="purchase_type"
                        value={saleRec.purchase_type}
                        onChange={handleSaleChange}
                    >
                        <option key='blankChoice' hidden value />
                        {Array.isArray(purch_types) && 
                            purch_types.map((purch_type, index) => (
                                <option value={purch_type.id} key={purch_type.id}>
                                    {`${purch_type.name}, коэффициент цены - x${purch_type.coefficient}`}
                                </option>
                            ))
                        }
                    </Form.Select>
                </Form.Group> 
                {errors.purchase_type && <p>Необходимо выбрать вид приобретения.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="sale_type">
                        Вид продажи
                    </Form.Label>
                    <Form.Select
                        {...register("sale_type", { required: true })}
                        size="md"
                        id="sale_type"
                        name="sale_type"
                        value={saleRec.sale_type}
                        onChange={handleSaleChange}
                    >
                        <option key='blankChoice' hidden value />
                        {Array.isArray(saleTypes) && 
                            saleTypes.map((saleType, index) => (
                                <option value={saleType.id} key={saleType.id}>
                                    {`${saleType.name}`}
                                </option>
                            ))
                        }
                    </Form.Select>
                </Form.Group> 
                {errors.sale_type && <p>Необходимо выбрать вид продажи.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="sale_status">
                        Статус продажи
                    </Form.Label>
                    <Form.Select
                        {...register("sale_status", { required: true })}
                        size="md"
                        id="sale_sale_statustype"
                        name="sale_status"
                        value={saleRec.sale_status}
                        onChange={handleSaleChange}
                    >
                        <option key='blankChoice' hidden value />
                        {Array.isArray(saleStatuses) && 
                            saleStatuses.map((saleStatus, index) => (
                                <option value={saleStatus.id} key={saleStatus.id}>
                                    {`${saleStatus.name}`}
                                </option>
                            ))
                        }
                    </Form.Select>
                </Form.Group> 
                {errors.sale_status && <p>Необходимо выбрать статус продажи.</p>}   

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="sale_price">
                        Цена продажи автомобиля (руб.)
                    </Form.Label>
                    <Form.Text>
                        <br/>Цена должна находиться в пределах 1 - 999999999,99 рублей.
                    </Form.Text>
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
                        onChange={handleSaleChange}
                    />
                </Form.Group>
                {errors.sale_status && <p>Необходимо указать цену продажи автомобиля.</p>} 

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="customer_info">
                        Информация о покупателе
                    </Form.Label>
                    <Form.Text>
                        <br/>Укажите ФИО, серию и номер пасспорта, номер счета и т.д.
                    </Form.Text>
                    <textarea
                        {...register("customer_info", { required: true })}
                        className="form-control"
                        rows="5"
                        size="md"
                        type="text"
                        id="customer_info"
                        name="customer_info"
                        value={saleRec.customer_info}
                        onChange={handleSaleChange}
                    />
                </Form.Group> 
                {errors.customer_info && <p>Необходимо указать информацию о покупателе.</p>} 

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="add_option_id">
                        Дополнительное оборудование
                    </Form.Label>
                    <Form.Text>
                        <br/>Выберите дополнительное оборудование для установки по желанию клиента.<br/>
                    </Form.Text>
                    {Array.isArray(addOpts) && addOpts.map((addOpt, index) => (
                        <Form.Check
                            {...register("add_option_id")}
                            style={{textAlign: "left"}}
                            id={`addOpts-cb-${addOpt.id}`}
                            label={`${addOpt.name} - ${addOpt.price} руб.`}
                            name={addOpt.name}
                            value={addOpt.id}
                            onChange={handleAddOptChange}
                        />
                    ))}
                </Form.Group>

                <Form.Group className='mb-3'> 
                    <Form.Label className='mb-1' htmlFor="sale_document">
                        Документ приемки
                    </Form.Label>
                    <Form.Control
                        {...register("sale_document", { required: true })}
                        className="form-control"
                        size="md"
                        type="file"
                        accept=".png, .jpg., .jpeg, .doc, .docx, .pdf, application/msword"
                        id="sale_document"
                        name="sale_document"
                        value={saleRec.sale_document}
                        onChange={handleDoc}
                    />
                </Form.Group>
                {errors.sale_document && <p>Необходимо добавить документ продажи.</p>}

                <Form.Group className='mb-3'> 
                    <Form.Label className='mb-1' htmlFor="note">
                        Примечание (необязательно)
                    </Form.Label>
                    <Form.Text>
                        <br/>При необходимости укажите примечание к продаже.
                    </Form.Text>
                    <textarea
                        {...register("note")}
                        className="form-control"
                        rows="5"
                        size="md"
                        type="text"
                        id="note"
                        name="note"
                        value={saleRec.note}
                        onChange={handleSaleChange}
                    />
                </Form.Group>
                
                <div>
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block"
                    >
                        Оформить продажу
                    </button>
                </div>
            </Form>
        </Fragment>
    );
};