import React, { Fragment, useState } from "react";
import { Card, Col, Row, Form, FormControl, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { 
    getAllCarModels,
    filterCarModels, 
    carModelsSelector 
} from "../../slices/carModelsSlice";

export const FilterCarModels = ({
    carModels
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',}); 

    // const [parameter, setParameter] = useState("");
    // const [term, setTerm] = useState("");
    // const [query_string, setQS] = useState([]);

    const [query_string, setQS] = useState([{
        drive_unit: "",
        transmission_type: "",
        fuel_type: "",
        body: "",
    }]);

    // const handleInputChange = async (event) => { 
    //     event.persist();
    //     const { name, value } = event.currentTarget; 
    //     // event.persist();
    //     // setParameter("");
    //     // setTerm("");
        
    //     console.log(name);
    //     console.log(value);
    //     // await setParameter(name);
    //     // await setTerm(value);
    //     // await console.log(parameter);
    //     // await console.log(term);
        
    //     await setQS(`?${name}=${value}&`);
    //     await console.log(query_string);

    //     // await dispatch(filterCarModels({
    //     //     parameter: parameter, 
    //     //     term: term
    //     // }));
    // };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(filterCarModels(query_string))
            // .then(setQS(""))

    };

    const clear = () => {
        dispatch(getAllCarModels())
            // .then(setParameter(""))
            .then(setQS(previousState => {
                return {...previousState, drive_unit: ""}
            }))
            .then(setQS(previousState => {
                return {...previousState, transmission_type: ""}
            }))
            .then(setQS(previousState => {
                return {...previousState, fuel_type: ""}
            }))
            .then(setQS(previousState => {
                return {...previousState, body: ""}
            }))
            .then(navigate("/carmodels/"));
    };

    return (
        <Fragment>
            <Row>
                <p className="p-caption">Фильтр</p>

                <Form onSubmit={submitHandler} className="mb-3">
                    <Row>
                        <Col xs="6">
                            <Form.Group className='mb-3'>
                                <Form.Label className='mb-1' htmlFor="drive_unit">
                                    Привод
                                </Form.Label>
                                <Form.Select
                                    {...register("drive_unit")}
                                    size="md"
                                    id="drive_unit"
                                    name="drive_unit"
                                    value={query_string["drive_unit"]}
                                    onChange={
                                        (e) => (
                                            setQS(previousState => {
                                                return {...previousState, drive_unit: `${e.target.value}`}
                                            })
                                        )
                                    }
                                    // onChange={
                                    //     (e) => (
                                    //         // console.log(Object.keys(query_string)),
                                    //         console.log(new RegExp(`\b${e.target.name}`)),
                                    //         // console.log(e.target.value),
                                    //         // console.log(Object.values(query_string).includes(`${e.target.name}=${e.target.value}&`)),
                                            
                                            
                                    //         // (Object.values(query_string).includes(`${e.target.name}=${e.target.value}&`)) ? (
                                    //         (Object.values(query_string).includes(new RegExp(/`${e.target.name}`(.*?)/))) ? (
                                    //             console.log("1212"),
                                    //             delete query_string[`${e.target.name}=${e.target.value}&`],
                                    //             setQS(
                                    //                 [...query_string, `${e.target.name}=${e.target.value}&`],
                                    //             ),
                                    //             console.log(query_string)
                                    //         ) : (
                                    //             setQS(
                                    //                 [...query_string, `${e.target.name}=${e.target.value}&`]
                                    //             ),
                                    //             console.log(query_string)
                                    //         )
                                    //         // console.log((query_string))
                                    //         // console.log(typeof(query_string))
                                    //     )
                                    // }
                                    // onSelect={submit}
                                >
                                    <option key='blankChoice'/>
                                    <option value="Передний">Передний</option>
                                    <option value="Задний">Задний</option>
                                    <option value="Полный">Полный</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col xs="6">
                            <Form.Group className='mb-3'>
                                <Form.Label 
                                    className='mb-1' htmlFor="transmission_type"
                                >
                                    Коробка передач
                                </Form.Label>
                                <Form.Select
                                    {...register("transmission_type")}
                                    size="md"
                                    id="transmission_type"
                                    name="transmission_type"
                                    value={query_string["transmission_type"]}
                                    onChange={
                                        (e) => (
                                            setQS(previousState => {
                                                return {...previousState, transmission_type: `${e.target.value}`}
                                            })
                                        )
                                    }
                                >
                                    <option key='blankChoice'/>
                                    <option value="Автоматическая">Автоматическая</option>
                                    <option value="Робот">Робот</option>
                                    <option value="Вариатор">Вариатор</option>
                                    <option value="Механическая">Механическая</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="6">
                            <Form.Group className='mb-3'>
                                <Form.Label 
                                    className='mb-1' 
                                    htmlFor="fuel_type"
                                >
                                    Вид топлива
                                </Form.Label>
                                <Form.Select
                                    {...register("fuel_type")}
                                    size="md"
                                    id="fuel_type"
                                    name="fuel_type"
                                    value={query_string["fuel_type"]}
                                    onChange={
                                        (e) => (
                                            setQS(previousState => {
                                                return {...previousState, fuel_type: `${e.target.value}`}
                                            })
                                        )
                                    }
                                >
                                    <option key='blankChoice'/>
                                    <option value="Бензин">Бензин</option>
                                    <option value="Дизель">Дизель</option>
                                    <option value="Гибрид">Гибрид</option>
                                    <option value="Электро">Электро</option>
                                    <option value="Неизвестно">Неизвестно</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col xs="6">
                            <Form.Group className='mb-3'>
                                <Form.Label 
                                    className='mb-1' 
                                    htmlFor="fuel_type"
                                >
                                    Кузов
                                </Form.Label>
                                <Form.Select
                                    {...register("body")}
                                    size="md"
                                    id="body"
                                    name="fuebodyl_type"
                                    value={query_string["body"]}
                                    onChange={
                                        (e) => (
                                            setQS(previousState => {
                                                return {...previousState, body: `${e.target.value}`}
                                            })
                                        )
                                    }
                                >
                                    <option key='blankChoice'/>
                                    <option value="Седан">Седан</option>
                                    <option value="Хэтчбек 3 дв.">Хэтчбек 3 дв.</option>
                                    <option value="Хэтчбек 5 дв.">Хэтчбек 5 дв.</option>
                                    <option value="Лифтбек">Лифтбек</option>
                                    <option value="Внедорожник 3 дв.">Внедорожник 3 дв.</option>
                                    <option value="Внедорожник 5 дв.">Внедорожник 5 дв.</option>
                                    <option value="Универсал">Универсал</option>
                                    <option value="Купе">Купе</option>
                                    <option value="Минивэн">Минивэн</option>
                                    <option value="Пикап">Пикап</option>
                                    <option value="Лимузин">Лимузин</option>
                                    <option value="Фургон">Фургон</option>
                                    <option value="Кабриолет">Кабриолет</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="6"> 
                            <Button 
                                variant="outline-success"
                                type="submit" 
                                size="sm"    
                            >
                                Поиск
                            </Button>
                        </Col>

                        <Col xs="6"> 
                            <Button
                                type="submit"
                                className="mb-3"
                                variant="outline-primary"
                                size="sm"
                                onClick={clear}
                            >
                                Сбросить критерии фильтра
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Row>
        </Fragment>
    );
};