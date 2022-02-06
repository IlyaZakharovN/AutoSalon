import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const CarList = ({ cars }) => {
    console.log(cars);

    return (
        <Fragment>
            <h4>Архив автомобилей</h4>
            <Row>
                {cars && cars.map((car, index) => (
                    <Col sm key={car.VIN}>
                        <Card>
                            <Card.Title>
                                <Link
                                    to={"/car/" + car.VIN}
                                    className=""
                                >
                                    {car.VIN + " " + car.model_id}
                                </Link>
                            </Card.Title>
                            <Card.Text>Назначение - {car.purpose}</Card.Text>
                            <Card.Subtitle>Цена - {car.price}</Card.Subtitle>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Fragment>
    );
};