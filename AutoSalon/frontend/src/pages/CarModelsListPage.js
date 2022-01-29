import React, { useState, useEffect, useCallback} from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { retriveCarModels } from "../slices/carModelsSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const CarModelsList = () => {
    const [currentCarModel, setCurrentCarModel] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchCarModel, setSearchCarModel] = useState(""); // for searching, add later

    const carModels = useSelector(state => state.carModels);
    const dispatch = useDispatch();

    // get CarModels:
    const initFetch = useCallback(() => {
        dispatch(retriveCarModels());
    }, [dispatch])

    useEffect(() => {
        initFetch()
    }, [initFetch])
    // end get Carmodels

    const refreshData = () => {
        setCurrentCarModel(null);
        setCurrentIndex(-1);
    };

    // const setActiveCarModel = (carModel, index) => {
    //     setCurrentCarModel(carModel);
    //     setCurrentIndex(index);
    // };

    return (
        <div className="list row">
            {/* <div className="col-md-6"> */}
                <h4>Модели автомобилей</h4>
                {/* <ul>
                    {carModels && carModels.map((carModel, index) =>(
                        <li 
                            className={"list-group item " + (index === currentIndex ? "active" : "")}
                            onClick={() => setActiveCarModel(carModel, index)}
                            key={index}
                        >
                            <a href="#">{carModel.brand + " " + carModel.model + " " + carModel.year}</a>
                        </li>
                    ))}
                </ul> */}
                {/* <div> */}
                <Row>
                    {carModels && carModels.map((carModel, index) =>(
                        <Col sm>
                            <Card>
                            <Card.Img variant="top" src={carModel.main_photo}/>
                            <Card.Title>
                                <Link 
                                    to={"/carmodels/" + carModel.id}
                                    className=""
                                >
                                {carModel.brand + " " + carModel.model + " " + carModel.year}
                                </Link>
                            </Card.Title>
                            <Card.Text>{carModel.model_descr}</Card.Text>
                            <Card.Subtitle>{carModel.price} руб.</Card.Subtitle>
                        </Card>
                        </Col>
                    ))}
                </Row>
                {/* </div> */}
            {/* </div> */}

            {/* <div className="col-md-6">
                {currentCarModel ? (
                    <div>
                        <h4>Выбранная модель автомобиля:</h4>
                        <div>
                            <label>
                                <strong>{currentCarModel.model}:</strong>
                            </label>
                        </div>
                        <div>
                            <Link 
                                to={"/carmodels/" + currentCarModel.id}
                                className=""
                            >
                                Просмотреть подробнее
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Выберите модель автомобиля...</p>
                    </div>
                )}
            </div> */}
        </div>
    );
};

export default CarModelsList;