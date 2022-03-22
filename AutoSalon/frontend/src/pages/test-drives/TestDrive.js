import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { TestDriveDetail } from "../../components/testdrive/test-drive-detail";
import { TestDriveUpdate } from "../../components/testdrive/test-drive-patch";

import { 
    retriveCars, fetchCar, carsSelector 
} from "../../slices/carSlice";
import { 
    getAllCarModels, fetchCarModel, carModelsSelector 
} from "../../slices/carModelsSlice";
import { 
    fetchEmplData, retriveEmplData, employeeSelector 
} from "../../slices/employeeSlice";
import { 
    getAllPurposes, purposeSelector 
} from "../../slices/purposeSlice";
import { 
    getAllTestDrives, fetchTestDrive, testDriveSelector 
} from "../../slices/testDriveSlice";
import { 
    getAllTestDriveStatuses, fetchTestDriveStatus, testDriveStatusSelector 
} from "../../slices/testDriveStatusSlice";
import { 
    userSelector, getUserDetails 
} from "../../slices/userSlice";

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

    // const [tdCar, setTdCar] = useState();
    // const [tdCarModel, setTdCarModel] = useState();

    const initFetch = useCallback(async() => {
        // const id = params.id;
        // await dispatch(fetchTestDrive(params.id));
        await dispatch(getAllTestDrives());
        // const carResult = await dispatch(fetchCar(testdrives.VIN));
        // await setTdCar(carResult.payload);
        // const model_id = tdCar[0].model_id;

        // await console.log((carResult.payload).model_id);
        // const cmResult = await dispatch(fetchCarModel((carResult.payload).model_id));
        // setTdCarModel(cmResult.payload);

        await dispatch(retriveCars());
        // await dispatch(fetchCar(testdrives.VIN));
        await dispatch(getAllCarModels());
        // await dispatch(fetchCarModel(cars.model_id));
        await dispatch(getAllTestDriveStatuses());
        await dispatch(retriveEmplData());
        // await dispatch(fetchEmplData(testdrives.seller));
        await dispatch(getAllPurposes());

    }, [dispatch, params.id]); // , params.id, testdrives.VIN

    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const renderTestDriveDetail = () => {
        if (
            testdrives && testDriveStatuses && cars && 
            carModels && empls && user
        ) {
            return <TestDriveDetail
                testdrives={
                    Array.isArray(testdrives) && testdrives
                        .filter(td => td.id == params.id)[0]
                } 
                testDriveStatuses={testDriveStatuses}
                // cars={
                //     Array.isArray(cars) && cars
                //         .filter(car => car.VIN === testdrives.VIN)
                // }
                cars={
                    Array.isArray(cars) && cars
                        .filter(car => car.VIN === (Array.isArray(testdrives) && testdrives
                        .filter(td => td.id == params.id))[0].VIN)
                }
                carModels={carModels}
                empls={
                    Array.isArray(empls) && empls
                        .filter(empl => empl.id === (Array.isArray(testdrives) && testdrives
                        .filter(td => td.id == params.id))[0].seller)
                }
                user={user.user}
            />
        } else {
            return <p>Ожидание загрузки информации о тест-драйве...</p>
        }
    };

    const renderTestDriveUpdate = () => {
        if (
            testdrives, testDriveStatuses, cars, 
            carModels, empls, purposes, 
            user
        ) {
            // const d = new Date(testdrives
            //     .filter(td => td.id == params.id)[0].date_time).getHours();
            // const d1 = new Date(testdrives
            //     .filter(td => td.id == params.id)[0].date_time).setUTCHours(d); 
            // console.log(new Date(d1).toISOString());

            return <TestDriveUpdate
                testdrives={
                    Array.isArray(testdrives) && testdrives
                        .filter(td => td.id == params.id)
                }  
                testDriveStatuses={testDriveStatuses}
                // cars={cars}
                cars={
                    Array.isArray(cars) && cars
                        .filter(car => car.purpose === 3)
                }
                // cars={
                //     Array.isArray(cars) && cars
                //         .filter(car => car.VIN === (Array.isArray(testdrives) && testdrives
                //         .filter(td => td.id == params.id))[0].VIN)
                // }
                carModels={carModels}
                empls={
                    Array.isArray(empls) &&empls
                        .filter(empl => empl.is_sales_manager || empl.is_sales_director)
                }
                user={user.user}
            />
        } else {
            return <p>Ожидание загрузки формы обновления...</p>
        }
    };

    return (
        isAuthenticated ? (
            (!testdrives && !testDriveStatuses && !cars && 
            !carModels && !empls && !user && 
            !purposes) ? (
                <div>Ожидание загрузки данных</div>
            ) : (
                <section>
                    {(user.user.is_superuser || user.user.is_sales_director || user.user.is_sales_manager) ? (
                        <Row className="mt-3 justify-content-md-center">
                            <Col xs lg="6">
                                {renderTestDriveDetail()}
                            </Col>
                            <Col xs lg="6">
                                {renderTestDriveUpdate()}
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