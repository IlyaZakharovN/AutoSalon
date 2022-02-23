import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { TestDriveDetail } from "../../components/testdrive/test-drive-detail";
import { retriveCars, fetchCar, carsSelector } from "../../slices/carSlice";
import { retriveCarModels, fetchCarModel, carModelsSelector } from "../../slices/carModelsSlice";
import { fetchEmplData, retriveEmplData, employeeSelector } from "../../slices/employeeSlice";
import { getAllPurposes, purposeSelector } from "../../slices/purposeSlice";
import { getAllTestDriveStatuses, fetchTestDriveStatus, testDriveStatusSelector } from "../../slices/testDriveStatusSlice";
import { getAllTestDrives, fetchTestDrive, testDriveSelector } from "../../slices/testDriveSlice";
import { userSelector, getUserDetails } from "../../slices/userSlice";

const TestDrive = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const { user, isAuthenticated } = useSelector(userSelector);
    const cars = useSelector(carsSelector);
    const carModels = useSelector(carModelsSelector);
    const empls = useSelector(employeeSelector);
    const testdrives = useSelector(testDriveSelector);
    const testDriveStatuses = useSelector(testDriveStatusSelector);
    const purposes = useSelector(purposeSelector);

    const initFetch = useCallback(async() => {
        await dispatch(fetchTestDrive(params.id));
        // await dispatch(retriveCars());
        await dispatch(fetchCar(testdrives.VIN));
        // await dispatch(retriveCarModels());
        await dispatch(fetchCarModel(cars.model_id));
        await dispatch(getAllTestDriveStatuses());
        await dispatch(retriveEmplData());
        // await dispatch(fetchEmplData(testdrives.seller));
        await dispatch(getAllPurposes());
    }, [dispatch, params.id, testdrives.VIN, cars.model_id]);

    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const renderTestDriveDetail = () => {
        if (testdrives, testDriveStatuses, cars, carModels, empls, purposes, user) {
            return <TestDriveDetail
                testdrives={testdrives} 
                testDriveStatuses={testDriveStatuses}
                cars={cars}
                // cars={cars.filter(car => testdrives.VIN === car.VIN)}
                carModels={carModels}
                empls={empls.filter(empl => empl.id === testdrives.seller)}
                purposes={purposes}
                user={user.user}
            />
        } else {
            return <p>Ожидание загрузки информации о тест-драйве...</p>
        }
    };

    return (
        isAuthenticated ? (
            (!testdrives && !testDriveStatuses && !cars && !carModels && !empls && !user && !purposes) ? (
                <div>Ожидание загрузки данных</div>
            ) : (
                <section>
                    {(user.user.is_superuser || user.user.is_sales_director || user.user.is_sales_manager) ? (
                        <Row className="mt-3 justify-content-md-center">
                            <Col xs lg="6">
                                {renderTestDriveDetail()}
                            </Col>
                            <Col xs lg="6">
                            </Col>
                        </Row>
                    ) : (
                        <Row className="mt-3 justify-content-md-center">
                            <Col xs lg="6">
                                {renderTestDriveDetail()}
                            </Col>
                        </Row>
                    )}
                </section>
            )
        ) : (
            <div>Страница не найдена</div>
        ) 
    );
};

export default TestDrive;