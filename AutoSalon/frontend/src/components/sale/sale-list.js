import React, { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const SaleList = ({ sales, purch_types, carModels }) => {
    return (
        <Fragment>
            <h4>Записи продаж</h4>
                {Array.isArray(sales) ? (
                    sales.map((sale, index) =>(
                        <Row>
                        <Col>
                            <Card sm key={sale.id}>
                                <Card.Title>
                                    <Link to={`/sales/${sale.id}`}>
                                        {`${sale.id} - ${sale.date}, ${sale.VIN}`}
                                    </Link>
                                </Card.Title>
                                <Card.Subtitle>{`Стоимость продажи - ${sale.sale_price}`}</Card.Subtitle>
                                <Card.Subtitle>{`Вид покупки - ${sale.purchase_type_id}`}</Card.Subtitle>
                            </Card>
                        </Col>
                        </Row>))
                    ) : (
                        <div>Записи продаж не найдены.</div>
                    )
                }
        </Fragment>
    );
};