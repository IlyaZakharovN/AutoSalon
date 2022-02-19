import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { TestDriveList } from "../../components/testdrive/testdrive-list";
import { CreateTestDriveEmpl } from "../../components/testdrive/create/test-drive-empl-create";
import { retriveCars, carsSelector } from "../../slices/carSlice";
import { retriveCarModels, carModelsSelector } from "../../slices/carModelsSlice";
import { fetchEmplData, retriveEmplData, employeeSelector } from "../../slices/employeeSlice";
import { getAllTestDrives, fetchTestDrive, testDriveSelector } from "../../slices/testDriveSlice";
import { getAllTestDriveStatuses, fetchTestDriveStatus, testDriveStatusSelector } from "../../slices/testDriveStatusSlice";
import { userSelector, getUserDetails } from "../../slices/userSlice";

const TestDrives = () => {
    const dispatch = useDispatch();
    // const params = useParams();

    const { 
        // id: user,
        user,
        isAuthenticated, 
        // is_superuser, 
        // is_sales_director, 
        // is_sales_manager 
    } = useSelector(userSelector);
    const empl = useSelector(employeeSelector);
    const cars = useSelector(carsSelector);
    const carModels = useSelector(carModelsSelector);
    const empls = useSelector(employeeSelector);
    const testdrives = useSelector(testDriveSelector);
    const testDriveStatuses = useSelector(testDriveStatusSelector);

    const initFetch = useCallback(async() => {
        await dispatch(retriveCarModels());
        await dispatch(retriveCars());
        await dispatch(getAllTestDrives());
        await dispatch(getAllTestDriveStatuses());
        await dispatch(retriveEmplData());
    }, [dispatch]);

    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const renderTestDriveList = () => {
        // console.log('cars - ', cars);
        if (testdrives && testDriveStatuses && cars && carModels && empls) {
            return <TestDriveList 
                testdrives={testdrives} 
                testDriveStatuses={testDriveStatuses}
                cars={cars}
                carModels={carModels}
                empls={empls}
            />;
        } else {
            return <p>Ожидание загрузки списка тестдрайвов...</p>
        }
    };

    const renderCreateTestDrive = () => {
        if (cars && carModels && testDriveStatuses && user) {
            if (user.user.is_sales_manager) {
                return <CreateTestDriveEmpl 
                    cars={cars} 
                    carModels={carModels} 
                    testDriveStatuses={testDriveStatuses} 
                    user={user.user} 
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
            return <p>Ожидание загрузки формы добавления продажи...</p>
        }
    };

    return (
        (!testdrives && !testDriveStatuses && !cars && !carModels && !empls && !user) ? (
            <div>Ожидание загрузки данных</div>
        ) : (
            <section>
                <Row className="mt-3 justify-content-md-center">
                { isAuthenticated ? (
                <Fragment>
                        <Col xs lg="6">
                            {renderTestDriveList()}
                        </Col>
                        {(user.user.is_superuser || user.user.is_sales_director) ? (
                            <Col xs lg="4">
                                {/* {renderCreateSale()} */}
                            </Col>
                        ) : (
                            (user.user.is_sales_manager) ? (
                                <Col xs lg="4">
                                    {renderCreateTestDrive()}
                                </Col>
                            ) : (
                                <></>
                            )
                        )} 
                        {/* <Col xs lg="4">
                            {renderCreateSale()}
                        </Col> */}
                    </Fragment> 
                ):(
                    <Fragment>
                        {/* {renderSaleList()} */}
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