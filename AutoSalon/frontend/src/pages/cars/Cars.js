import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { CreateCar } from "../../components/car/car-create";
import { CarList } from "../../components/car/car-list";
import { SearchCars } from "../../components/car/car-search";

import { retriveArrivalTypes, fetchArrivalType, arrivalTypesSelector } from "../../slices/arrivalTypesSlice";
import { retriveCars, carsSelector } from "../../slices/carSlice";
import { getAllCarModels, carModelsSelector } from "../../slices/carModelsSlice";
import { getAllPurposes, purposeSelector } from "../../slices/purposeSlice";
import { userSelector, getUserDetails } from "../../slices/userSlice";
import { carStatusSelector, getAllCarStatuses } from "../../slices/carStatusSlice";
import { employeeSelector, retriveEmplData } from "../../slices/employeeSlice";

const Cars = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector(userSelector);
    const arrivalTypes = useSelector(arrivalTypesSelector);
    const cars = useSelector(carsSelector);
    const carModels = useSelector(carModelsSelector);
    const purposes = useSelector(purposeSelector);
    const carStatuses = useSelector(carStatusSelector);
    const empls = useSelector(employeeSelector);

    // console.log(Object.values(arrivalTypes.arrivalTypes));
    // console.log((arrivalTypes));
    // console.log(purposes);
    
    useEffect(() => {
        dispatch(getAllPurposes());
        dispatch(getAllCarModels());
        dispatch(retriveCars());
        dispatch(retriveArrivalTypes());
        dispatch(getAllCarStatuses());

        if (isAuthenticated) {
            dispatch(getUserDetails());
            dispatch(retriveEmplData());
        };
    }, [dispatch]);

    const renderCarList = () => {
        if (cars && carModels && carStatuses) {
            return <CarList 
                // cars={cars} 
                cars={
                    isAuthenticated ? (
                        cars
                    ) : (
                        Array.isArray(cars) &&
                        cars.filter(car => 
                            car.status === 1 && 
                            car.purpose === 1
                        )
                    )
                } 
                carModels={carModels}
                carStatuses={carStatuses}
                isAuthenticated={isAuthenticated}
                purposes={purposes}
            />;
        } else {
            return <p>Ожидание загрузки списка автомобилей...</p>
        }
    };

    const renderCreateCar = () => {
        if (
            cars && carModels && arrivalTypes && 
            carStatuses
        ) {
            return <CreateCar 
                carModels={carModels} 
                arrivalTypes={arrivalTypes}
                purposes={purposes}
                carStatuses={carStatuses}
                acceptors={(user.user.is_sales_director || user.user.is_superuser) ? (
                    Array.isArray(empls) && empls
                        .filter(empl => (empl.is_puchase_manager ||
                        empl.is_sales_director))
                ) : (
                    Array.isArray(user.user) && user
                )}
                user={user}
            />
        } else {
            return <p>Ожидание загрузки формы добавления автомобиля...</p>
        }
    };

    const renderSearch = () => {
        if (cars) {
            return <SearchCars/>
        }
    };

    return (
        (!cars && !carModels && !purposes && 
        !carStatuses) ? (
            <div>Ожидание загрузки данных</div>
        ) : (
            <section>
                <Row className="mt-3 justify-content-md-center">
                { isAuthenticated && (
                    user.user.is_superuser || 
                    user.user.is_sales_director || 
                    user.user.is_puchase_manager
                ) ? (
                        <Fragment>
                            <Col xs="5">
                                <h4>Автомобили в наличии</h4>
                                {renderSearch()}
                                {renderCarList()}
                            </Col> 

                            <Col xs="3">
                                {renderCreateCar()}
                            </Col>
                        </Fragment>
                        ):(
                            <Fragment>
                                <Col xs="5">
                                    <h4>Автомобили в наличии</h4>
                                    {renderSearch()}
                                    {renderCarList()}
                                </Col> 
                            </Fragment>
                        )   
                    }
                </Row>
            </section>
        )
    );
};

export default Cars;