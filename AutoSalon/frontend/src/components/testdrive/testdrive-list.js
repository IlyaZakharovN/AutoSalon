import React, { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const TestDriveList = ({ testdrives, testDriveStatuses, cars, carModels, empls, purposes }) => {
    return (
        <Fragment>
            <h4>Записи Тест-драйвов</h4>
            {Array.isArray(testdrives) ? (
                testdrives
                    // .filter(testdrive => (testdrive.status === testDriveStatuses.id))
                    // .filter(testdrive => (testdrive.seller === empls.id))
                    // .filter(testdrive => (testdrive.VIN === cars.VIN))
                    .map((td, index) =>(
                        Array.isArray(testDriveStatuses) && testDriveStatuses
                            .filter(tds => tds.id === td.status)
                            // .filter(td => td.seller === empls.id)
                            .map((tds, index) => (
                                    Array.isArray(empls) && empls
                                        .filter(empl => empl.id === td.seller)
                                        .map((empl, index) => (
                                            <Row>
                                                <Col>
                                                    <Card sm key={td.id}>
                                                        <Fragment>
                                                            <Card.Title>
                                                                <Link to={`/testdrives/${td.id}`}>
                                                                    {`Тест драйв №${td.id}`}
                                                                </Link>
                                                            </Card.Title>
                                                            <Card.Subtitle>
                                                                {`Дата - ${td.date_time}`}
                                                            </Card.Subtitle>
                                                            {td.seller ? (
                                                                <Card.Subtitle>
                                                                    {`Ответсвенный сотрудник - ${empl.name}`}
                                                                </Card.Subtitle>
                                                            ) : (
                                                                <Fragment></Fragment>
                                                            )}
                                                        </Fragment>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        ))     
                                    ))
                    ))
                ) : (
                    <div>Записи тест-драйвов не найдены.</div>
                )
            }
        </Fragment>
    );
};