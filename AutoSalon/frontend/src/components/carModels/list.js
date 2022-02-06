import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import { retriveCarModels } from "../../slices/carModelsSlice";
// import { carModelsSelector } from "../../slices/carModelsSlice";

// Add Card styles...
const CarModels = ({ carModels }) => {
    // const [currentCarModel, setCurrentCarModel] = useState(null);
    console.log(carModels);

    return (
        <Fragment>
            <h4>Модели автомобилей</h4>
            <Row>
                {carModels && carModels.map((carModel, index) =>(
                    <Col sm key={carModel.id}>
                        <Card>
                            <Card.Img variant="top" src={carModel.main_photo}/>
                            <Card.Title>
                                <Link 
                                    to={"/carmodels/" + carModel.id}
                                    className="" 
                                >
                                {carModel.brand + " " + carModel.model + " " + carModel.year + " в комплектации " + carModel.package_name}
                                </Link>
                            </Card.Title>
                            <Card.Text>{carModel.model_descr}</Card.Text>
                            <Card.Subtitle>От {carModel.base_price} руб.</Card.Subtitle>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Fragment>
    );
};

export default CarModels;