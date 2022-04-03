import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CarModels = ({ 
    carModels, isAuthenticated
}) => {
    // console.log(carModels);

    return (
        <Fragment>
            <Row>
                {Array.isArray(carModels) && carModels.map((carModel, index) =>(
                    <Col 
                        key={carModel.id} 
                        sm="4" 
                        className={isAuthenticated ? (
                            "model-card-col-empl"
                        ) : (
                            "model-card-col-visitor"
                        )}
                    >
                        <Card key={carModel.id}>
                            <Card.Img 
                                src={carModel.main_photo}
                                alt={`
                                    ${carModel.brand} 
                                    ${carModel.model} 
                                    в комплектации 
                                    ${carModel.package_name}
                                `}
                                variant="top" 
                                className="card-img"
                            />

                            <Card.Title>
                                <Link 
                                    to={"/carmodels/" + carModel.id}
                                    className="card-link" 
                                >
                                    {carModel.brand + " " + carModel.model + " " + carModel.year + " в комплектации " + carModel.package_name}
                                </Link>
                            </Card.Title>
                            
                            <Card.Subtitle>
                                От {carModel.base_price} руб.
                            </Card.Subtitle>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Fragment>
    );
};

export default CarModels;