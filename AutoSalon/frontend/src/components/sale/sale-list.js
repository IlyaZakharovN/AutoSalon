import React, { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const SaleList = ({ sales, purch_types, carModels }) => {
    return (
        // get final sale price by multipling sale_price by coefficient
        // show, if add adoptions were installed
        // show price including add options
        // show seller 
        <Fragment>
            <h4>Записи продаж</h4>
                {Array.isArray(sales) && sales.map((sale, index) =>(
                    <Row>
                        <Col>
                            <Card sm key={sale.id}>
                                <Card.Title>
                                    <Link to={`/sales/${sale.id}`}>
                                        {`${sale.id} - ${sale.date}, ${sale.VIN}`}
                                    </Link>
                                </Card.Title>
                                <Card.Subtitle>{`Стоимость продажи - ${sale.sale_price}`}</Card.Subtitle>
                                <Card.Subtitle>{`Вид покупки - ${sale.purchase_type}`}</Card.Subtitle>
                            </Card>
                        </Col>
                    </Row>
                ))}
        </Fragment>
    );
};