import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { TestDriveList } from "../../components/testdrive/testdrive-list";
import { CreateTestDriveClient } from "../../components/testdrive/create/test-drive-client-create";
import { CreateTestDriveEmpl } from "../../components/testdrive/create/test-drive-empl-create";
import { TestDriveClientInfo } from "../../components/testdrive/test-drive-client-info";

import { retriveCars, carsSelector } from "../../slices/carSlice";
import { getAllCarModels, carModelsSelector } from "../../slices/carModelsSlice";
import { fetchEmplData, retriveEmplData, employeeSelector } from "../../slices/employeeSlice";
import { getAllPurposes, purposeSelector } from "../../slices/purposeSlice";
import { getAllTestDriveStatuses, fetchTestDriveStatus, testDriveStatusSelector } from "../../slices/testDriveStatusSlice";
import { getAllTestDrives, fetchTestDrive, testDriveSelector } from "../../slices/testDriveSlice";
import { userSelector, getUserDetails } from "../../slices/userSlice";

// Link to CarModels page ????

const TestDrives = () => {
    const dispatch = useDispatch();

    const { user, isAuthenticated } = useSelector(userSelector);
    const cars = useSelector(carsSelector);
    const carModels = useSelector(carModelsSelector);
    const empls = useSelector(employeeSelector);
    const testdrives = useSelector(testDriveSelector);
    const testDriveStatuses = useSelector(testDriveStatusSelector);
    const purposes = useSelector(purposeSelector);

    const initFetch = useCallback(async() => {
        await dispatch(getAllCarModels());
        await dispatch(retriveCars());
        
        if (isAuthenticated) {
            await dispatch(getAllTestDrives());
            await dispatch(getAllTestDriveStatuses());
            await dispatch(retriveEmplData());
            await dispatch(getAllPurposes());
        };
    }, [dispatch]);

    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const renderTestDriveList = () => {
        if (
            testdrives && testDriveStatuses && cars && 
            carModels && empls && purposes
        ) {
            return <TestDriveList 
                testdrives={testdrives} 
                testDriveStatuses={testDriveStatuses}
                cars={cars}
                carModels={carModels}
                empls={empls}
                purposes={purposes}
            />;
        } else {
            return <p>Ожидание загрузки списка тест-драйвов...</p>
        }
    };

    const renderCreateTestDrive = () => {
        if (
            cars && carModels && testDriveStatuses
        ) {
            if (isAuthenticated && user) {
                if (user.user.is_sales_director || user.user.is_superuser || user.user.is_sales_manager) {
                    return <CreateTestDriveEmpl
                        cars={
                            Array.isArray(cars) && cars
                                .filter(car => car.purpose === 3)
                        } 
                        carModels={carModels} 
                        testDriveStatuses={testDriveStatuses}
                        empls={
                            Array.isArray(empls) && empls
                                .filter(empl => empl.is_sales_director || empl.is_sales_manager)
                        }
                        user={user.user} 
                    />;
                }
            } else {
                return <CreateTestDriveClient
                    cars={
                        Array.isArray(cars) && cars
                            .filter(car => car.purpose === 3)
                    }
                    carModels={carModels}
                />;
            }
        } else {
            return <p>Ожидание загрузки формы добавления тест-драйва...</p>
        }
    };

    const renderTestDriveClientInfo = () => {
        return <TestDriveClientInfo/>;
    };

    return (
        (!testdrives && !testDriveStatuses && !cars && 
        !carModels && !empls && !user && 
        !purposes) ? (
            <div>Ожидание загрузки данных</div>
        ) : (
            <section>
                <Row className="mt-3 justify-content-md-center">
                    {isAuthenticated ? (
                        <Fragment>
                            <Col xs="5">
                                {renderTestDriveList()}
                            </Col>
                            <Col xs="3">
                                {renderCreateTestDrive()}
                            </Col>
                        </Fragment> 
                    ):(
                        <Fragment>
                            <Col xs="4">
                                {renderTestDriveClientInfo()}
                            </Col>
                            <Row className="mt-3 justify-content-md-center">
                                <Col xs="4">
                                    {renderCreateTestDrive()}
                                </Col> 
                            </Row>
                        </Fragment>
                    )}
                </Row>
            </section>
        )
    );
};

export default TestDrives;