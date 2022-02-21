import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const CarList = ({ cars, carModels }) => {
    console.log(cars);
    // const carModels = useSelector(state => state.carModels);
    // let result = Object.values(carModels, cars).filter(carModel => carModel.id === cars.VIN);
    // console.log(result);

    return (
        <Fragment>
            <h4>Архив автомобилей</h4>
            <Row>
                {Array.isArray(cars) && cars.map((car, index) => (
                    <Col>
                        <Card sm key={car.VIN}>
                            {Array.isArray(carModels) && carModels
                                .filter(carModel => carModel.id === car.model_id)
                                .map((carModel, index) => (
                                    <Fragment>
                                        <Card.Img variant="top" src={carModel.main_photo}/>
                                            <Card.Title>
                                                <Link
                                                    to={"/car/" + car.VIN}
                                                    className=""
                                                >
                                                    {car.VIN + " " + carModel.brand + " " + carModel.model}
                                                </Link>
                                            </Card.Title>
                                            <Card.Text>Назначение - {car.purpose}</Card.Text>
                                            <Card.Subtitle>Цена - {car.price}</Card.Subtitle>
                                    </Fragment>
                                ))}
                        </Card>
                    </Col>
                ))}
            </Row>
        </Fragment>
    );
};