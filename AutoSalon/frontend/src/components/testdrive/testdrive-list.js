import React, { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const TestDriveList = ({ testdrives, testDriveStatuses, cars, carModels, empls }) => {
    return (
        <Fragment>
            <h4>Записи Тестдрайвов</h4>
            {Array.isArray(testdrives) ? (
                testdrives
                    .filter(testdrives.status === testDriveStatuses.id)
                    .filter(testdrives.seller === empls.id)
                    .filter(testdrives.VIN === cars.VIN)
                    .map((td, index) =>(
                        <Row>
                            <Col>
                                <Card sm key={td.id}>
                                    <Card.Title>
                                        <Link to={`/testdrives/${td.id}`}>
                                            {`${td.id}`}
                                        </Link>
                                    </Card.Title>
                                    <Card.Subtitle>
                                        {`Дата - ${td.date_time}`}
                                    </Card.Subtitle>
                                    {td.seller ? (
                                        <Card.Subtitle>
                                            {`Ответсвенный сотрудник - ${empls.name}`}
                                        </Card.Subtitle>
                                    ) : (
                                        <></>
                                    )}
                                </Card>
                            </Col>
                        </Row>
                    ))
                ) : (
                    <div>Записи тест-драйвов не найдены.</div>
                )
            }
        </Fragment>
    );
};