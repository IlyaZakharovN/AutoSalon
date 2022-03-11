import React, { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const SaleList = ({ 
        sales, carModels, 
        saleTypes, empls
    }) => {
    return (
        // get final sale price by multipling sale_price by coefficient
        // show price including add options
        <Fragment>
            <h4>Записи продаж</h4>
                {Array.isArray(sales) && sales
                    .map((sale, index) => (
                        Array.isArray(saleTypes) && saleTypes
                            .filter(sType => sType.id === sale.sale_type)
                            .map((sType, index) => (
                                Array.isArray(empls) && empls
                                    .filter(empl => empl.id === sale.seller)
                                    .map((empl, index) => (
                                        <Row>
                                            <Col>
                                                <Card sm key={sale.id} className="mb-3">
                                                    <Card.Title>
                                                        <Link to={`/sales/${sale.id}`}>
                                                            {`${sale.id} - ${sale.date}, ${sale.VIN}`}
                                                        </Link>
                                                    </Card.Title>
                                                    <Card.Subtitle>
                                                        {`Стоимость продажи автомобиля - ${sale.sale_price} руб.`}
                                                    </Card.Subtitle>
                                                    <Card.Subtitle>
                                                        {`Продавец - ${empl.name}`}
                                                    </Card.Subtitle>
                                                    <Card.Subtitle>
                                                        {`Вид продажи - ${sType.name}`}
                                                    </Card.Subtitle>
                                                    {(sale.add_option_id.length) ? (
                                                        <Card.Subtitle>
                                                            {`Доп. оборудование установлено`}
                                                        </Card.Subtitle>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </Card>
                                            </Col>
                                        </Row>
                                    ))
                            ))
                    )
                )}
        </Fragment>
    );
};