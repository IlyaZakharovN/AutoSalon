import React, { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const ListTechInspections = ({
    techInspections, techInspRequests, user, 
    cars, carModels, empls
}) => {
    return (
        <Fragment>
            <h4>Тех. осмотры</h4>

            <Row>
                {Array.isArray(techInspections) && 
                techInspections.map(ti => (
                    ti ? (
                        Array.isArray(cars) && cars.filter(car => car.VIN === ti.VIN)
                        .map(car => (
                            Array.isArray(carModels) && 
                            carModels.filter(carModel => carModel.id === car.model_id)
                                .map(carModel => (
                                        <Col xs="4" className="te-card-col">
                                            <Card 
                                                key={ti.id}
                                                // className="card-col-empl"
                                            >
                                                <Card.Img 
                                                    variant="top" 
                                                    src={carModel.main_photo}
                                                />

                                                <Card.Title>
                                                    <Link to={`/tech-inspections/${ti.id}`}>
                                                        {`Тех. осмотр №${ti.id}`}
                                                    </Link>
                                                </Card.Title>

                                                <Card.Subtitle className="card-sub">
                                                    {`Автомобиль - ${ti.VIN}, 
                                                    ${carModel.brand} 
                                                    ${carModel.model}
                                                    ${carModel.year}
                                                    в комплектации 
                                                    ${carModel.package_name}`}
                                                </Card.Subtitle>

                                                <Card.Subtitle className="card-sub">
                                                    {Array.isArray(empls) && empls
                                                        .filter(empl => empl.id === ti.inspector)
                                                        .map(empl => (
                                                            `Тех. инспектор - 
                                                            ${empl.name},
                                                            ${empl.email}`
                                                        ))
                                                    }
                                                </Card.Subtitle>

                                                <Card.Subtitle className="card-sub">
                                                    {`Дата начала - 
                                                    ${new Date(ti.start_date)
                                                        .toLocaleDateString()}`}
                                                </Card.Subtitle>

                                                <Card.Subtitle className="card-sub">
                                                    {ti.end_date ? (
                                                        `Дата окончания - 
                                                        ${new Date(ti.end_date)
                                                            .toLocaleDateString()}`
                                                    ) : (
                                                        `Не завершен`
                                                    )}
                                                </Card.Subtitle>
                                            </Card>
                                        </Col>
                                ))
                        ))
                    ) : (<></>)
                ))}
            </Row>
        </Fragment>
    );
};