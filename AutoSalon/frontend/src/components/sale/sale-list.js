import React, { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const SaleList = ({ sales, purch_types, carModels }) => {
    return (
        <Fragment>
            <h4>Записи продаж</h4>
            <Row>
                <Col>
                    {/* {sales && sales.map((sale, index) =>(
                        <Card sm key={sale.id}>
                            <Card.Title>
                                <Link to={`sales/sale/${sale.id}`}>
                                    {`${sale.id} - ${sale.date}, ${sale.VIN}`}
                                </Link>
                            </Card.Title>
                            <Card.Subtitle>{`Стоимость продажи - ${sale.sale_price}`}</Card.Subtitle>
                            <Card.Subtitle>{`Вид покупки - ${sale.purchase_type_id}`}</Card.Subtitle>
                        </Card>
                    ))} */}
                </Col>
            </Row>
        </Fragment>
    );
};