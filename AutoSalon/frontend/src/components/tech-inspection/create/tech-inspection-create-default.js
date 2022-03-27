import React, { Fragment, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { 
    createTechInspection, 
    getAllTechInspections
} from "../../../slices/techInspectionSlice";

import { updateCar } from "../../../slices/carSlice";

export const CreateTechInpection = ({
    user, cars, carModels,
    requests
}) => {
    const initialTIstate = Object.freeze({
        inspector: user.id,
        VIN: null,
        request: null,
    });

    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',}); 
    const [newTI, setNewTI] = useState(initialTIstate);
    const [conclFile, setConclFile] = useState("");
    const dispatch = useDispatch(); 

    const handleTiChange = event => {
        // console.log(newTI);
        // console.log(event.target.name, " - ", event.target.value);
        // console.log(typeof(event.target.value));
        setNewTI({ ...newTI, [event.target.name]: event.target.value });
    };

    const saveData = async (data, event) => {
        if (event && event.preventDefault) { 
            event.preventDefault(); 
        };

        let carPatchData = new FormData();
        carPatchData.append('status', 2);

        const date = new Date();
        const today = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();

        let newTiData = new FormData();
        newTiData.append('inspector', newTI.inspector);
        newTiData.append('VIN', newTI.VIN);
        if (newTI.request) {
            newTiData.append('request', newTI.request);
        };
        newTiData.append('start_date', today);

        if (newTI.VIN !== null || newTI.request !== null) {
            if (
                newTI.VIN === null || 
                newTI.VIN === true || 
                newTI.VIN === 'true' ||
                newTI.VIN === undefined
            ) {
                const theVIN = Array.isArray(requests) && requests
                    .filter(r => r.id == newTI.request)[0].VIN;
                // console.log('theVIN', theVIN);
                newTiData.delete('VIN');
                newTiData.append('VIN', theVIN);
            };

            // for (var pair of newTiData.entries()) {
            //     await console.log(pair[0]+ ' - '+ pair[1]);
            // };

            await dispatch(createTechInspection(newTiData))
                .unwrap()
                .catch(e => {
                    console.log('Error happened while dispatching createTechInspection');
                    console.log(e);
                })
                .then(
                    dispatch(updateCar({ 
                        id: newTiData.get('VIN'), 
                        data: carPatchData 
                    }))
                    .unwrap()
                    .then(alert('Статус автомобиля изменен на "На техосмотре".'))
                    .catch(e => {
                        console.log("Error happened while dispatching updateCar.");
                        console.log(e);
                    })
                )
                .then(alert("Запись тех. осмотра была добавлена."))
                .then(dispatch(getAllTechInspections()))
                .then(window.location.reload());
        } else {
            await alert("Выберите автомобиль, который нуждается в тех. осмотре.");
        };
    };

    return (
        <Fragment>
            <h4>Создать тех. осмотр</h4>

            <Form onSubmit={handleSubmit(saveData)} className="form-required">
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="request">
                        Заявка на тех. осмотр.
                    </Form.Label>
                    <Form.Text><br/>Необязательно</Form.Text>
                    <Form.Select
                        {...register("request")}
                        size="md"
                        id="request"
                        name="request"
                        disabled={(
                            (newTI.VIN === null || 
                            newTI.VIN === 'true' ||
                            newTI.VIN === undefined) ? false : true
                        )}
                        value={newTI.request}
                        onChange={handleTiChange}
                    >
                        <option key='blankChoice' value>
                            Заявка на тех. осмотр отсутствует
                        </option>
                        {Array.isArray(carModels) && carModels
                            .map(carModel => (
                                Array.isArray(cars) && cars
                                    .filter(car => 
                                        car.model_id === carModel.id
                                    )
                                    .map(car => (
                                        Array.isArray(requests) && requests
                                            .filter(request => 
                                                request.VIN === car.VIN
                                            )
                                            .map(request => (
                                                <option value={request.id}  key={request.id}>
                                                    {`${request.id} - 
                                                    ${car.VIN}, 
                                                    ${carModel.model} 
                                                    ${carModel.year}
                                                    в комплектации  
                                                    ${carModel.package_name}`}
                                                </option>
                                            ))
                                    )) 
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="VIN">
                        Автомобиль, которому требуется тех. осмотр
                    </Form.Label>
                    <Form.Select
                        {...register("VIN")}
                        size="md"
                        id="VIN"
                        name="VIN"
                        disabled={(
                            (newTI.request === null || 
                            newTI.request === 'true' ||
                            newTI.request === undefined) ? false : true
                        )}
                        value={newTI.VIN}
                        onChange={handleTiChange}
                    >
                        <option key='blankChoice' value />
                        {Array.isArray(carModels) && carModels
                            .map((carModel, index) => (
                            Array.isArray(cars) && cars
                                .filter(car => (
                                    car.model_id === carModel.id
                                ))
                                .map((car, index) => (
                                    <option value={car.VIN} key={car.VIN}>
                                        {`${car.VIN} - 
                                        ${carModel.model} ${carModel.year}
                                        в комплектации  ${carModel.package_name}`}
                                    </option>
                                ))
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                
                <div>
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block"
                    >
                        Добавить запись на тех. осмотра
                    </button>
                </div>

            </Form>
        </Fragment>
    );
};