import React, { Fragment, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { updateAddOption } from "../../slices/addOptionSlice";

const AddOptionUpdate = ({ addOption }) => {
    const initialAddOptState = {
        name: addOption.name,
        price: addOption.price,
        description: addOption.description,
    };

    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',}); 
    let addOptionPatchData = new FormData();

    const handleAddOptChange = (event) => {
        const {name, value} = event.target;
        // console.log("handleChange -> " + name + ":" + value);
        addOptionPatchData.append(`${name}`, value);
        // console.log(patchData);
    };

    const patchAddOption = (event) => { // add notification/popups on success and on failure 
        dispatch(updateAddOption({ id: addOption.id, data: addOptionPatchData }))
            .unwrap()
            .then(response => {
                console.log('response - ', response);
            })
            .catch(e => {
                console.log(e);
            });

        window.location.reload();
    };

    return (
        <Fragment>
            <h5>Изменить данные доп. оборудования</h5>

            <Form onSubmit={handleSubmit(patchAddOption)}>
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
                        defaultValue={addOption.name}
                        onChange={handleAddOptChange}
                    />
                </Form.Group> 
            
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="price">Цена вместе с установкой (руб.)</Form.Label>
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
                        defaultValue={addOption.price}
                        onChange={handleAddOptChange}
                    />
                </Form.Group>

                <Form.Group className='mb-3'> 
                    <Form.Label className='mb-1' htmlFor="description">Описание (необязательно)</Form.Label>
                    <textarea
                        {...register("description")}
                        className="form-control"
                        rows="5"
                        size="md"
                        type="text"
                        id="description"
                        name="description"
                        defaultValue={addOption.description}
                        onChange={handleAddOptChange}
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
        </Fragment>
    );
};

export default AddOptionUpdate;