import React, { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const TechInpectionRequestsList = ({
    techInspRequests, user, cars, 
    carModels, empls, techInspections
}) => {
    return (
        <Fragment>
            <h4>Заявки на тех. осмотры</h4>

            {Array.isArray(techInspRequests) && techInspRequests
                .map(tir => (
                    Array.isArray(cars) && cars
                        .filter(car => car.VIN === tir.VIN)
                        .map(car => (
                            Array.isArray(carModels) && carModels
                                .filter(carModel => carModel.id === car.model_id)
                                .map(carModel => (
                                    <Row key={tir.id}>
                                        <Col sm>
                                            <Card style={{ width: '18rem' }}>
                                                <Card.Img variant="top" src={carModel.main_photo}/>
                                                <Card.Title>
                                                    <Link to={`/tech-inspection-requests/${tir.id}`}>
                                                            {`Заявка №${tir.id}`}
                                                    </Link>
                                                    <Card.Subtitle>
                                                        {`Автомобиль - ${tir.VIN}, 
                                                        ${carModel.brand} 
                                                        ${carModel.model}
                                                        ${carModel.year}
                                                        в комплектации 
                                                        ${carModel.package_name}`}
                                                    </Card.Subtitle>
                                                    <Card.Subtitle>
                                                        {`Дата заявки - 
                                                        ${new Date(tir.date)
                                                            .toLocaleDateString()}`}
                                                    </Card.Subtitle>
                                                </Card.Title>
                                            </Card>
                                        </Col>
                                    </Row>
                                ))
                        ))
                ))
            }
        </Fragment>
    );
};