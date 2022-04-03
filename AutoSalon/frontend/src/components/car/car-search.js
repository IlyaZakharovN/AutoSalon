import React, { Fragment, useState } from "react";
import { Col, Row, Form, FormControl, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { 
    retriveCars, 
    searchCars 
} from "../../slices/carSlice";

export const SearchCars = () => {
    const [term, setTerm] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = event => { 
        // console.log(event.target.value);
        setTerm(event.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (term === "") return alert("Введите критерий поиска");
        dispatch(searchCars(term));
    };

    const clear = () => {
        dispatch(retriveCars())
            .then(setTerm(""))
            .then(navigate("/cars/"));
    };

    return (
        <Fragment>
            <Row>
                <p className="p-caption">
                    Поиск по производителю, модели и комплектации
                </p>

                <Form onSubmit={submitHandler}  className="mb-3">
                    <Row>
                        <Col xs="10">
                            <FormControl
                                type="search"
                                value={term}
                                placeholder="Поиск..."
                                className="p-1 mb-2"
                                aria-label="Поиск"
                                onChange={handleInputChange}
                            />
                        </Col>

                        <Col xs="1">
                            <Button 
                                variant="outline-success"
                                type="submit" 
                                size="sm"    
                            >
                                Поиск
                            </Button>
                        </Col>
                    </Row>

                    <Row className="mt-2">
                        <Col xs="8"></Col>
                        <Col xs="4">
                            <Button
                                className="mb-3"
                                variant="outline-primary"
                                size="sm"
                                onClick={clear}
                            >
                                Сбросить критерий поиска
                            </Button>
                        </Col>                            
                    </Row>
                </Form>
            </Row>
        </Fragment>
    );
};