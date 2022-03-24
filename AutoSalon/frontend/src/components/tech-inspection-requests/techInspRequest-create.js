import React, { Fragment, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { 
    createTechInspectionRequest, getAllTechInspectionRequests 
} from "../../slices/techInspectionRequestSlice";

export const CreateTechInpectionRequest = ({
    user, cars, carModels,
}) => {
    // console.log(user.id);

    const initialTIRstate = Object.freeze({
        requester: user.id,
        date: null,
        VIN: null,
    });

    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',}); 
    const [newTechInspRequest, setNewTIR] = useState(initialTIRstate);
    const dispatch = useDispatch(); 

    const handleTIRChange = event => {
        // console.log(event.target.name, " - ", event.target.value);
        setNewTIR({ ...newTechInspRequest, [event.target.name]: event.target.value });
        // console.log(newTechInspRequest);
    };

    const saveTIR = async (data, event) => {
        event.preventDefault(); 

        const date = new Date();
        const today = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();

        let newTirData = new FormData();
        newTirData.append('requester', newTechInspRequest.requester);
        newTirData.append('date', today);
        newTirData.append('VIN', newTechInspRequest.VIN);

        if (newTirData.VIN !== null) {
            await dispatch(createTechInspectionRequest(newTirData))
                .unwrap()
                .catch(e => {
                    console.log('Error happened while running saveTIR');
                    console.log(e);
                });

            await alert("Заявка на тех. осмотр была добавлена.");
            await dispatch(getAllTechInspectionRequests());
            window.location.reload();
        } else {
            await alert("Выберите автомобиль, который нуждается в тех. осмотре.");
        }
    }

    return (
        <Fragment>
            <h4>Создать заявку на тех. осмотр</h4>

            <Form onSubmit={handleSubmit(saveTIR)} className="form-required">
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-1' htmlFor="VIN">
                        Автомобиль, которому требуется тех. осмотр.
                    </Form.Label>
                    <Form.Select
                        {...register("VIN", { required: true })}
                        size="md"
                        id="VIN"
                        name="VIN"
                        value={newTechInspRequest.VIN}
                        onChange={handleTIRChange}
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
                {errors.VIN && <p>Выберите модель автомобиля, которую клиент хочет протестировать.</p>}
                
                <div>
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block"
                    >
                        Добавить заявку на тех. осмотр
                    </button>
                </div>
            </Form>
        </Fragment>
    );
};