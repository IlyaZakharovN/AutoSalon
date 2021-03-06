import React, { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const TestDriveList = ({ 
    testdrives, testDriveStatuses, cars, 
    carModels, empls, purposes 
}) => {
    return (
        <Fragment>
            <h4>Записи Тест-драйвов</h4>
            
            <Row>
                {Array.isArray(testdrives) ? (
                    testdrives.map((td, index) => (
                        Array.isArray(testDriveStatuses) && testDriveStatuses
                            .filter(tds => tds.id === td.status)
                            .map((tds, index) => (
                                Array.isArray(empls) && empls
                                    .filter(empl => empl.id === td.seller)
                                    .map((empl, index) => (
                                        <Col 
                                            key={td.id}
                                            xs="4"
                                        >
                                            <Card 
                                                className="td-card"
                                            >
                                                <Fragment>
                                                    <Card.Title>
                                                        <Link to={`/testdrives/${td.id}`}>
                                                            {`Тест-драйв №${td.id}`}
                                                        </Link>
                                                    </Card.Title>

                                                    <Card.Subtitle>
                                                        {`Дата - ${new Date(td.date_time).toLocaleString()}`}
                                                    </Card.Subtitle>

                                                    {td.seller ? (
                                                        <Card.Subtitle>
                                                            {empl.is_superuser ? (
                                                                <span className="attention">
                                                                    Ответственный сотрудник - не установлен
                                                                </span>
                                                            ) : (
                                                                `Ответственный сотрудник - ${empl.name}`
                                                            )}
                                                        </Card.Subtitle>
                                                    ) : (<></>)}

                                                    <Card.Subtitle>
                                                        {`Статус - ${tds.name}`}
                                                    </Card.Subtitle>
                                                </Fragment>
                                            </Card>
                                        </Col>
                                    ))     
                            ))
                    ))
            ) : (
                    <div>Записи тест-драйвов не найдены.</div>
            )}
            </Row>
        </Fragment>
    );
};