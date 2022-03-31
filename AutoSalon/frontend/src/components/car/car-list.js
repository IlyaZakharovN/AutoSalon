import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const CarList = ({ 
    cars, carModels, carStatuses, 
    isAuthenticated, purposes 
}) => {
    // console.log(cars);

    return (
        <Fragment>
            <Row>
                {Array.isArray(cars) && cars.map((car, index) => (
                    <Col>
                        <Card 
                            key={car.VIN}
                            sm="4"
                            className={isAuthenticated ? (
                                "card-col-empl"
                            ) : (
                                "card-col-visitor"
                            )}
                        >
                            {Array.isArray(carModels) && carModels
                                .filter(carModel => carModel.id === car.model_id)
                                .map((carModel, index) => (
                                    <Fragment>
                                        <Card.Img 
                                            src={carModel.main_photo}
                                            alt={
                                                `${carModel.brand} 
                                                ${carModel.model} 
                                                в комплектации 
                                                ${carModel.package_name}
                                            `}
                                            variant="top" 
                                            className="card-img"
                                        />
                                        <Card.Title>
                                            <Link
                                                to={"/car/" + car.VIN}
                                                className="card-link"
                                            >
                                                {isAuthenticated ? (
                                                    `${car.VIN} - ${carModel.brand} ${carModel.model} в комплектации ${carModel.package_name}`
                                                ) : (
                                                    `${carModel.brand} ${carModel.model} в комплектации ${carModel.package_name}`
                                                )}
                                            </Link>
                                        </Card.Title>
                                        {isAuthenticated ? (
                                            Array.isArray(purposes) && 
                                            purposes
                                                .filter(p => p.id === car.purpose)
                                                .map(p => (
                                                    <Card.Text>
                                                        Назначение - {p.name}
                                                    </Card.Text>
                                                ))
                                        ) : (
                                            <></>
                                        )}
                                        <Card.Subtitle>
                                            Цена - {car.price}
                                        </Card.Subtitle>
                                    </Fragment>
                                ))}
                        </Card>
                    </Col>
                ))}
            </Row>
        </Fragment>
    );
};