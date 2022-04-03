import React, { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const AddOptionList = ({ addOptions }) => {
    return (
        <Fragment>
            <h4>Каталог дополнительного оборудования</h4>

            <Row>
                {Array.isArray(addOptions) && addOptions
                    .map((addOption, index) =>(
                    <Col 
                        key={addOption.id}
                    > 
                        <Card
                            sm="2" 
                            className="add-opt-card"
                        >
                            <Card.Title>
                                <Link to={`/add-options/${addOption.id}`}>
                                    {`${addOption.name}`}
                                </Link>
                            </Card.Title>
                            <Card.Subtitle>{`${addOption.price} руб.`}</Card.Subtitle>
                            <Card.Text>{`${addOption.description}`}</Card.Text>
                        </Card>
                    </Col>
                    ))
                }
            </Row>
        </Fragment>
    );
};