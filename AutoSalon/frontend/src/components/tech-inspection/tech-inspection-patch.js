import React, { Fragment, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

import { updateTechInspection } from "../../slices/techInspectionSlice";

export const UpdateTechInpection = ({
    techInspection, techInspectionRequest, user,
    cars, carModels, empls
}) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',}); 

    let tiPatchData = new FormData();

    const handleTiChange = (event) => {
        const {name, value} = event.target;
        // console.log(`${name} --> ${value}`);

        if (name === "conclusion_file") {
            tiPatchData.append(`${name}`, event.target.files[0])
        } else {
            tiPatchData.append(`${name}`, value);
        };
    };

    const patchData = async (event) => {
        // for (var pair of tiPatchData.entries()) {
        //     console.log(pair[0]+ ' - '+ pair[1]);
        // };

        if (
            tiPatchData.has('inspector') ||
            tiPatchData.has('VIN') || 
            tiPatchData.has('start_date') ||
            (tiPatchData.has('end_date') && tiPatchData.has('conclusion_file'))
        ) {
                await dispatch(updateTechInspection({ 
                    id: techInspection.id, 
                    data: tiPatchData 
                }))
                .unwrap()
                .then(alert("Запись тех. осмотра была добавлена."))
                .then(window.location.reload())
                .catch(e => {
                    console.log('Error happened while running patchData');
                    console.log(e);
                });

        } else {
            await alert("При окончании тех. осмотра необходимо указать дату окончания и прикрепить заключение.");
        }
    };

    return (
        <Fragment>
            <h4>Изменить информацию о тех. осмотре</h4>

            <Form 
                onSubmit={handleSubmit(patchData)} 
                className="form-required"
            >
                <fieldset 
                    disabled={(
                        (user.is_sales_director || 
                        user.is_superuser ||
                        user.id === techInspection.inspector) ? false : true
                    )}
                >
                    <Form.Group className='mb-3'>
                        <Form.Label className='mb-1' htmlFor="VIN">
                            Автомобиль, которому требуется тех. осмотр.
                        </Form.Label>
                        <Form.Select
                            {...register("VIN")}
                            size="md"
                            id="VIN"
                            name="VIN"
                            disabled={
                                techInspectionRequest.length ? true : false
                            }
                            defaultValue={techInspection.VIN}
                            onChange={handleTiChange}
                        >
                            <option key='blankChoice' hidden value />
                                {(Array.isArray(carModels) && carModels
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
                                    )))
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label className='mb-1' htmlFor="inspector">
                            Отвественный за проведение тех. осмотра
                        </Form.Label>
                        <Form.Select
                            {...register("inspector")}
                            size="md"
                            id="inspector"
                            name="inspector"
                            disabled={
                                !(user.is_sales_director || user.is_superuser) ? true : false
                            }
                            defaultValue={techInspection.inspector}
                            onChange={handleTiChange}
                        >
                            {(user.is_sales_director || user.is_superuser) ? (
                                Array.isArray(empls) && empls
                                    .map(empl => (
                                        <option value={empl.id} key={empl.id}>
                                            {`${empl.name}, ${empl.email}`}
                                        </option>
                                    ))
                            ) : (
                                Array.isArray(empls) && empls
                                    .filter(empl => empl.id === techInspection.inspector)
                                    .map(empl => (
                                        <option value={techInspection.inspector} key={techInspection.inspector}>
                                            {`${empl.name}, ${empl.email}`}
                                        </option>
                                    ))
                            )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label className='mb-1' htmlFor="start_date">
                            Дата начала тех. осмотра
                        </Form.Label>
                        <Form.Control
                            {...register("start_date")}
                            size="md"
                            type="date"
                            id="start_date"
                            name="start_date"
                            disabled={
                                !(user.is_sales_director || user.is_superuser)
                                || techInspectionRequest.length
                                ? true : false
                            }
                            defaultValue={
                                techInspection ? (new Date(techInspection.start_date).toISOString().slice(0,-14)) : (new Date())
                            }
                            onChange={handleTiChange}
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label className='mb-1' htmlFor="end_date">
                            Дата окончания тех. осмотра
                        </Form.Label>
                        <Form.Control
                            {...register("end_date")}
                            size="md"
                            type="date"
                            id="end_date"
                            name="end_date"
                            min={techInspection.start_date}
                            max={new Date(new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+(new Date().getDate()+1)).toISOString().slice(0,-14)}
                            autoComplete="off"
                            defaultValue={
                                techInspection ? (new Date(techInspection.end_date).toISOString().slice(0,-14)) : (new Date())
                            }
                            onChange={handleTiChange}
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'> 
                        <Form.Label className='mb-1' htmlFor="conclusion_file">
                            Заключение тех. осмотра
                        </Form.Label>
                        <Form.Text>
                            <br/>При окончании тех. осмотра прикрепите файл с заключением.
                        </Form.Text>
                        <Form.Control
                            // {...register("conclusion_file")}
                            className="form-control"
                            size="md"
                            type="file"
                            accept=".png, .jpg., .jpeg, .doc, .docx, .pdf, application/msword"
                            id="conclusion_file"
                            name="conclusion_file"
                            onChange={handleTiChange}
                        />
                    </Form.Group>
                    
                    <div>
                        <button 
                            type="submit" 
                            className="btn btn-primary btn-block"
                        >
                            Изменить запись тех. осмотра
                        </button>
                    </div>
                </fieldset>
            </Form>
        </Fragment>
    );
};