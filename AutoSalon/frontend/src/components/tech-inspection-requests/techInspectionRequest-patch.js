import React, { Fragment, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

import { updateTechInspectionRequest } from "../../slices/techInspectionRequestSlice";

export const UpdateTechInpectionRequest = ({
    techInspRequest, techInspection, cars, 
    carModels,
}) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',}); 

    let tirPatchData = new FormData();

    const handleTirChange = (event) => {
        const {name, value} = event.target;
        tirPatchData.append(`${name}`, value);
    };

    const patchData = async (event) => {
        if (tirPatchData.VIN !== null) {
            await dispatch(updateTechInspectionRequest({ 
                id: techInspRequest.id, 
                data: tirPatchData 
            }))
                .unwrap()
                .catch(e => {
                    console.log('Error happened while running patchData');
                    console.log(e);
                });

            await alert("Заявка была обновлена.");
            window.location.reload();
        } else {
            await alert("Выберите автомобиль, который нуждается в тех. осмотре.");
        }
    };

    return (
        <Fragment>
            <h4>Изменить заявку на тех. осмотр</h4>

            {techInspection.length ? (
                <p>
                    {techInspection.end_date ? (
                        `Заявку на данный тех. осмотр нельзя изменить, 
                        т.к тех. осмотр был осуществлен.`
                    ) : (
                        `Заявку на данный тех. осмотр нельзя изменить, 
                        т.к тех. осмотр уже проводится.`
                    )}
                </p>
            ) : (<></>)}

            <Form onSubmit={handleSubmit(patchData)} className="form-required">
                <fieldset 
                    disabled={(
                        (!techInspection.length) ? false : true
                    )}
                >
                    <Form.Group className='mb-3'>
                        <Form.Label className='mb-1' htmlFor="VIN">
                            Автомобиль, которому требуется тех. осмотр.
                        </Form.Label>
                        <Form.Select
                            {...register("VIN", { required: true })}
                            size="md"
                            id="VIN"
                            name="VIN"
                            defaultValue={techInspRequest.VIN}
                            onChange={handleTirChange}
                        >
                            <option key='blankChoice' hidden value />
                            {Array.isArray(carModels) && carModels
                                .map((carModel, index) => (
                                Array.isArray(cars) && cars
                                    .filter(car => (
                                        car.model_id === carModel.id
                                    ))
                                    .map((car, index) => (
                                        <option value={car.VIN} key={car.VIN}>
                                            {`${car.VIN} - ${car.price}  руб.,  ${carModel.model} ${carModel.year}
                                            в комплектации  ${carModel.package_name}`}
                                        </option>
                                    ))
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    {errors.VIN && <p>Выберите автомобиль, которому требуется тех. осмотр.</p>}

                    <div>
                        <button 
                            type="submit" 
                            className="btn btn-primary btn-block"
                        >
                            Изменить заявку
                        </button>
                    </div>
                </fieldset>
            </Form>
        </Fragment>
    );
};