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
            <h4 className="mb-3">Заявки на тех. осмотры</h4>

            {Array.isArray(techInspRequests) && techInspRequests
                .map(tir => (
                    tir ? (
                        Array.isArray(cars) && cars
                            .filter(car => car.VIN === tir.VIN)
                            .map(car => (
                                Array.isArray(carModels) && carModels
                                    .filter(carModel => carModel.id === car.model_id)
                                    .map(carModel => (
                                        <Row key={tir.id}>
                                            <Col lg className="mb-3">
                                                <Card style={{ width: '18rem' }}>
                                                    <Card.Img variant="top" src={carModel.main_photo}/>

                                                    <Card.Title>
                                                        <Link to={`/tech-inspection-requests/${tir.id}`}>
                                                                {`Заявка №${tir.id}`}
                                                        </Link>
                                                    </Card.Title>

                                                    <Card.Subtitle className="mb-2">
                                                        {`Автомобиль - ${tir.VIN}, 
                                                        ${carModel.brand} 
                                                        ${carModel.model}
                                                        ${carModel.year}
                                                        в комплектации 
                                                        ${carModel.package_name}`}
                                                    </Card.Subtitle>

                                                    <Card.Subtitle className="mb-2">
                                                        {`Дата заявки - 
                                                        ${new Date(tir.date)
                                                            .toLocaleDateString()}`}
                                                    </Card.Subtitle>

                                                    <Card.Subtitle className="mb-2">
                                                        {Array.isArray(techInspections) &&
                                                        techInspections.filter(
                                                            ti => ti.request === tir.id
                                                        )
                                                            .map(ti => (
                                                                ti.end_date ? (
                                                                    `Тех. осмотр закончен`
                                                                ) : (
                                                                    `Тех. осмотр начат`
                                                                )
                                                            ))
                                                        }
                                                    </Card.Subtitle>
                                                </Card>
                                            </Col>
                                        </Row>
                                    ))
                            ))
                        ) : (
                            <></>
                        )
                ))
            }
        </Fragment>
    );
};