import React, { useState, useEffect, useCallback, Fragment} from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { CarList } from "../components/car/car-list";
import { CreateTestDriveClient } from "../components/testdrive/create/test-drive-client-create";

import {
    retriveCars,
    carsSelector
} from "../slices/carSlice";
import {
    getAllCarModels,
    carModelsSelector
} from "../slices/carModelsSlice";
import {
    getAllCarStatuses,
    carStatusSelector
} from "../slices/carStatusSlice"; 
import { 
    getAllPurposes,
    purposeSelector
} from "../slices/purposeSlice";
import { userSelector } from "../slices/userSlice";



const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, user } = useSelector(userSelector);
    const cars = useSelector(carsSelector);
    const carModels = useSelector(carModelsSelector);
    const purposes = useSelector(purposeSelector);
    const carStatuses = useSelector(carStatusSelector);
    // const empls = useSelector(employeeSelector);

    const initFetch = useCallback(async() => {
        await dispatch(getAllCarModels());
        await dispatch(retriveCars());

        if (isAuthenticated) {
            dispatch(getAllCarStatuses());
            dispatch(getAllPurposes());
            // dispatch(getUserDetails());
            // dispatch(retriveEmplData());
        };
    }, [dispatch]);

    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const сarList = () => {
        if (
            cars && carModels
        ) return (
            <Fragment>
                <CarList 
                    carModels={carModels}
                    
                    cars={
                        isAuthenticated ? (
                            cars
                        ) : (
                            (Array.isArray(cars) &&
                            cars.filter(car => 
                                car.status === 1 && 
                                car.purpose === 1
                            ).slice(0, 6))
                        )
                    }

                    carStatuses={
                        isAuthenticated ? (carStatuses) : (null)
                    }

                    purposes={
                        isAuthenticated ? (purposes) : (null)
                    }

                    isAuthenticated={
                        isAuthenticated ? (isAuthenticated) : (null)
                    }
                />

                <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => navigate("/cars/")}
                >
                    Посмотреть все автомобили в наличии 
                </Button>
            </Fragment>
        );
    };

    const renderCreateTestDrive = () => {
        if (
            cars && carModels
        ) {
            return (
                <CreateTestDriveClient 
                    cars={
                        Array.isArray(cars) && cars
                            .filter(car => car.purpose === 3)
                    }
                    carModels={carModels}
                />
            );
        }
    };

    return (
        <section>
            <h1>Автомобильный салон</h1>

            {(cars && carModels) ? (
                <Fragment>
                    <Row className="mt-3 justify-content-md-center">
                        <Col xs="6"> 
                            <h4>Автомобили в наличии</h4>   
                            {сarList()}
                        </Col>
                    </Row>

                    <Row className="mt-3 justify-content-md-center">
                        {renderCreateTestDrive()}
                    </Row>
                </Fragment>
            ) : (
                <></>
            )}
        </section>
    );
};

export default Home;