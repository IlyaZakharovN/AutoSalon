import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { getAllCarModels, carModelsSelector } from "../../slices/carModelsSlice";
import { userSelector, retriveUserData } from "../../slices/userSlice";
import CreateCarModel from "../../components/carModels/carModel-create";
import CarModels from "../../components/carModels/carModel-list";

// Add availability
const CarModelsList = () => {
    const carModels = useSelector(carModelsSelector);
    const { user, isAuthenticated } = useSelector(userSelector);
    const dispatch = useDispatch();
    console.log(carModels);

    const initFetch = useCallback(async() => {
        await dispatch(getAllCarModels());
    }, [dispatch]);

    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const renderCarModelsList = () => {
        // console.log(carModels);
        if (carModels) {
            return <CarModels carModels={carModels}/>
        } else {
            return <p>Ожидание загрузки каталога автомобилей...</p>
        }
    };

    const renderCreateCarModel = () => {
        return <CreateCarModel/>
        // if (carModels) {
        //     return <CreateCarModel/>
        // } else {
        //     return <p>Ожидание загрузки формы добавления моделей автомобилей...</p>
        // }
    }

    return (
        (!carModels) ? (
            <div>Ожидание загрузки данных</div>
        ) : (
            <section>
                <Row className="mt-3 justify-content-md-center">
                    { isAuthenticated && (user.user.is_superuser || user.user.is_sales_director || user.user.is_puchase_manager) ? (
                        <Fragment>
                            <Col xs lg="6">
                                {renderCarModelsList()}
                            </Col> 
                            <Col xs lg="4">
                                {renderCreateCarModel()}
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
        )
    );
};

export default CarModelsList;