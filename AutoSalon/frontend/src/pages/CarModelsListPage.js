import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { retriveCarModels, carModelsSelector } from "../slices/carModelsSlice";
import { userSelector, retriveUserData } from "../slices/userSlice";
import CreateCarModel from "../components/carModels/create";
import CarModels from "../components/carModels/list";

const CarModelsList = () => {
    const [currentCarModel, setCurrentCarModel] = useState(null);
    const { loading: carModelsLoading, hasErrors: carModelsHasErrors } = useSelector(carModelsSelector);
    // const [currentIndex, setCurrentIndex] = useState(-1); // maybe later add shirt description
    // const [searchCarModel, setSearchCarModel] = useState(""); // for searching, add later

    const carModels = useSelector(state => state.carModels);
    const { isAuthenticated, is_superuser, is_sales_director, is_puchase_manager } = useSelector(userSelector);
    const dispatch = useDispatch();
    // console.log(carModels);
    console.log(carModelsLoading);

    // get CarModels:
    const initFetch = useCallback(() => {
        dispatch(retriveCarModels());
    }, [dispatch])

    useEffect(() => {
        initFetch()
    }, [initFetch])
    // end get Carmodels

    const renderCarModelsList = () => {
        if (carModelsLoading) return <p>Данные загружаются...</p>
        if (carModelsHasErrors) return <p>Невозможно отобразить данные.</p>
        return <CarModels carModels={carModels} />
    }

    // const refreshData = () => {
    //     setCurrentCarModel(null);
    //     setCurrentIndex(-1);
    // };

    // const setActiveCarModel = (carModel, index) => {
    //     setCurrentCarModel(carModel);
    //     setCurrentIndex(index);
    // };

    return (
        <section>
            <Row className="justify-content-md-center">
                { isAuthenticated && (is_superuser || is_sales_director || is_puchase_manager) ? (
                    <Fragment>
                        <Col xs lg="6">
                            {renderCarModelsList()}
                        </Col> 
                        <Col xs lg="4">
                            {CreateCarModel()}
                        </Col>
                    </Fragment>
                    ):(
                        <Fragment>
                            {renderCarModelsList()}
                        </Fragment>
                    )   
                }
            </Row>
        </section>
    );
};

export default CarModelsList;