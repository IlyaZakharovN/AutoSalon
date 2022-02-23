import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { TestDriveList } from "../../components/testdrive/testdrive-list";
import { CreateTestDriveClient } from "../../components/testdrive/create/test-drive-client-create";
import { CreateTestDriveDirector } from "../../components/testdrive/create/test-drive-dir-create";
import { CreateTestDriveEmpl } from "../../components/testdrive/create/test-drive-empl-create";
import { TestDriveClientInfo } from "../../components/testdrive/test-drive-client-info";
import { retriveCars, carsSelector } from "../../slices/carSlice";
import { retriveCarModels, carModelsSelector } from "../../slices/carModelsSlice";
import { fetchEmplData, retriveEmplData, employeeSelector } from "../../slices/employeeSlice";
import { getAllPurposes, purposeSelector } from "../../slices/purposeSlice";
import { getAllTestDriveStatuses, fetchTestDriveStatus, testDriveStatusSelector } from "../../slices/testDriveStatusSlice";
import { getAllTestDrives, fetchTestDrive, testDriveSelector } from "../../slices/testDriveSlice";
import { userSelector, getUserDetails } from "../../slices/userSlice";

const TestDrives = () => {
    const dispatch = useDispatch();
    // const params = useParams();

    const { user, isAuthenticated } = useSelector(userSelector);
    const cars = useSelector(carsSelector);
    const carModels = useSelector(carModelsSelector);
    const empls = useSelector(employeeSelector);
    const testdrives = useSelector(testDriveSelector);
    const testDriveStatuses = useSelector(testDriveStatusSelector);
    const purposes = useSelector(purposeSelector);

    const initFetch = useCallback(async() => {
        await dispatch(retriveCarModels());
        await dispatch(retriveCars());
        await dispatch(getAllTestDrives());
        await dispatch(getAllTestDriveStatuses());
        await dispatch(retriveEmplData());
        await dispatch(getAllPurposes());
    }, [dispatch]);

    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const renderTestDriveList = () => {
        // console.log('empls - ', empls);
        if (testdrives && testDriveStatuses && cars && carModels && empls && purposes) {
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
        if (cars && carModels && testDriveStatuses && purposes) {
            if (isAuthenticated && user) {
                // console.log('isAuthenticated')
                if (user.user.is_sales_manager) {
                    return <CreateTestDriveEmpl 
                        cars={cars} 
                        carModels={carModels} 
                        testDriveStatuses={testDriveStatuses} 
                        user={user.user} 
                        purposes={purposes}
                    />;
                } else if (user.user.is_sales_director || user.user.is_superuser) {
                    return <CreateTestDriveDirector
                        cars={cars} 
                        carModels={carModels} 
                        testDriveStatuses={testDriveStatuses}
                        empls={empls}
                        purposes={purposes}
                    />;
                }
            } else {
                // console.log('not isAuthenticated');
                // console.log(Array.isArray(testDriveStatuses));
                return <CreateTestDriveClient
                    cars={cars} 
                    carModels={carModels}
                    purposes={purposes}
                    testDriveStatuses={testDriveStatuses}
                />;
            }
            // ((is_sales_director || is_superuser) ? (
            //     return null;
            // ) : (
            //     (is_sales_manager ? (
                    
            //     ) : (

            //     ))
            // ))
        } else {
            return <p>Ожидание загрузки формы добавления тест-драйва...</p>
        }
    };

    const renderTestDriveClientInfo = () => {
        return <TestDriveClientInfo/>;
    };

    return (
        (!testdrives && !testDriveStatuses && !cars && !carModels && !empls && !user && !purposes) ? (
            <div>Ожидание загрузки данных</div>
        ) : (
            <section>
                <Row className="mt-3 justify-content-md-center">
                { isAuthenticated ? (
                <Fragment>
                        <Col xs lg="6">
                            {renderTestDriveList()}
                        </Col>
                        <Col xs lg="4">
                            {renderCreateTestDrive()}
                        </Col>
                    </Fragment> 
                ):(
                    <Fragment>
                        {renderTestDriveClientInfo()}
                        <Row className="mt-3 justify-content-md-center">
                            <Col xs lg="4"></Col>
                            <Col xs lg="4">
                                {renderCreateTestDrive()}
                            </Col> 
                            <Col xs lg="4"></Col>
                        </Row>
                    </Fragment>
                )}
                </Row>
            </section>
        )
    );
};

export default TestDrives;

// Link to CarModels page



// Apply to test-drive form 