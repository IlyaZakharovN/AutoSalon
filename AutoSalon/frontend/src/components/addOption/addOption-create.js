import React, { Fragment, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { createAddOption, retriveAddOptions } from "../../slices/addOptionSlice";

export const CreateAddOption = () => {
    const initialAddOptState = Object.freeze({
        name: "",
        price: null,
        desciption: "",
    });

    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',}); 
    const [addOpt, setAddOpt] = useState(initialAddOptState);
    const dispatch = useDispatch(); 

    const handleInputChange = event => {
        console.log(event.target.name, " - ", event.target.value);
        setAddOpt({ ...addOpt, [event.target.name]: event.target.value });
        // console.log(car);
    };

    const saveAddOption = async (data, event) => {
        event.preventDefault();
        let newAddoptData = new FormData();
        newAddoptData.append('name', addOpt.name);
        newAddoptData.append('price', addOpt.price);
        newAddoptData.append('description', addOpt.description);

        await dispatch(createAddOption(newAddoptData))
            .unwrap()
            .catch(e => {
                console.log('Error happened while running saveAddOption');
                console.log(e);
            });
        
        await dispatch(retriveAddOptions());

        window.location.reload();
    };

    return (
        <Fragment>
            <h4>Добавить доп. оборудование</h4>

            <Form onSubmit={handleSubmit(saveAddOption)}>
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="name">Наименование</Form.Label>
                    <Form.Control
                        {...register("name", { 
                            required: true, 
                            minLength: 1, 
                            maxLength: 255, 
                        })}
                        size="md"
                        type="text"
                        id="name"
                        name="name"
                        value={addOpt.name}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                {errors.name && <p>Необходимо указать наименование доп. оборудования.</p>}

                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="price">Цена, включая установку (руб.)</Form.Label>
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
                        value={addOpt.price}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                {errors.price && <p>Необходимо указать цену доп. оборудования в пределах 1 - 999999999,99 рублей.</p>}

                <Form.Group className='mb-3'> 
                    <Form.Label className='mb-1' htmlFor="description">Описание доп. оборудрования</Form.Label>
                    <textarea
                        {...register("description")}
                        className="form-control"
                        rows="5"
                        size="md"
                        type="text"
                        id="description"
                        name="description"
                        value={addOpt.description}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <div>
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block"
                    >
                        Добавить доп. оборудование
                    </button>
                </div>
            </Form>
        </Fragment>
    );
};