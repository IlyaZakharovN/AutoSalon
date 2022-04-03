import React, { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const SaleList = ({ 
        sales, carModels, 
        saleTypes, empls
    }) => {
    return (
        <Fragment>
            <h4>Записи продаж</h4>

            <Row>
                {Array.isArray(sales) && sales
                    .map((sale, index) => (
                        Array.isArray(saleTypes) && saleTypes
                            .filter(sType => sType.id === sale.sale_type)
                            .map((sType, index) => (
                                Array.isArray(empls) && empls
                                    .filter(empl => empl.id === sale.seller)
                                    .map((empl, index) => (
                                            <Col xs="4">
                                                <Card sm key={sale.id} className="sale-card">
                                                    <Card.Title>
                                                        <Link to={`/sales/${sale.id}`}>
                                                            {`${sale.id} - ${sale.date}, ${sale.VIN}`}
                                                        </Link>
                                                    </Card.Title>

                                                    <Card.Subtitle className="card-sub">
                                                        {`Стоимость продажи автомобиля - ${sale.sale_price} руб.`}
                                                    </Card.Subtitle>

                                                    <Card.Subtitle className="card-sub">
                                                        {`Продавец - ${empl.name}`}
                                                    </Card.Subtitle>

                                                    <Card.Subtitle className="card-sub">
                                                        {`Вид продажи - ${sType.name}`}
                                                    </Card.Subtitle>

                                                    {(sale.add_option_id.length) ? (
                                                        <Card.Subtitle className="card-sub">
                                                            {`Доп. оборудование установлено`}
                                                        </Card.Subtitle>
                                                    ) : (<></>)}
                                                </Card>
                                            </Col>
                                    ))
                            ))
                    ))
                }
            </Row>
        </Fragment>
    );
};