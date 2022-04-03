import React, { Fragment, useState } from "react";
import { Col, Row, Form, FormControl, Button } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { 
    filterCars,
    retriveCars,
 } from "../../slices/carSlice";

export const FilterCars = ({
    isAuthenticated
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',}); 

    const [query_obj, setQO] = useState([{
        drive_unit: "",
        transmission_type: "",
        fuel_type: "",
        body: "",
        purpose: "",
        status: "",
    }]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(filterCars(query_obj))
    };

    const clear = () => {
        dispatch(retriveCars())
            .then(setQO(previousState => {
                return {...previousState, drive_unit: ""}
            }))
            .then(setQO(previousState => {
                return {...previousState, transmission_type: ""}
            }))
            .then(setQO(previousState => {
                return {...previousState, fuel_type: ""}
            }))
            .then(setQO(previousState => {
                return {...previousState, body: ""}
            }))
            .then(navigate("/cars/"));
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
                                    value={query_obj["drive_unit"]}
                                    onChange={
                                        (e) => (
                                            setQO(previousState => {
                                                return {...previousState, drive_unit: `${e.target.value}`}
                                            })
                                        )
                                    }
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
                                    value={query_obj["transmission_type"]}
                                    onChange={
                                        (e) => (
                                            setQO(previousState => {
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
                                    value={query_obj["fuel_type"]}
                                    onChange={
                                        (e) => (
                                            setQO(previousState => {
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
                                    value={query_obj["body"]}
                                    onChange={
                                        (e) => (
                                            setQO(previousState => {
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
                    
                    {isAuthenticated ? (
                        <Row>
                            <Col xs="6">
                                <Form.Group className='mb-3'>
                                    <Form.Label 
                                        className='mb-1' 
                                        htmlFor="purpose"
                                    >
                                        Назначение
                                    </Form.Label>
                                    <Form.Select
                                        {...register("purpose")}
                                        size="md"
                                        id="purpose"
                                        name="purpose"
                                        value={query_obj["purpose"]}
                                        onChange={
                                            (e) => (
                                                setQO(previousState => {
                                                    return {...previousState, purpose: `${e.target.value}`}
                                                })
                                            )
                                        }
                                    >
                                        <option key='blankChoice'/>
                                        <option value="1">Реализация</option>
                                        <option value="2">Выстовочный образец</option>
                                        <option value="3">Для тест-драйва</option>
                                        <option value="4">Неизвестно</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col xs="6">
                                <Form.Group className='mb-3'>
                                    <Form.Label 
                                        className='mb-1' 
                                        htmlFor="status"
                                    >
                                        Статус
                                    </Form.Label>
                                    <Form.Select
                                        {...register("status")}
                                        size="md"
                                        id="status"
                                        name="status"
                                        value={query_obj["status"]}
                                        onChange={
                                            (e) => (
                                                setQO(previousState => {
                                                    return {...previousState, status: `${e.target.value}`}
                                                })
                                            )
                                        }
                                    >
                                        <option key='blankChoice'/>
                                        <option value="1">В наличии</option>
                                        <option value="2">На техосмотре</option>
                                        <option value="3">На техоблуживании</option>
                                        <option value="4">Продан</option>
                                        <option value="6">Проходит приемку</option>
                                        <option value="5">Неизвестно</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    ) : (<></>)}    

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