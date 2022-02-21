import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { CreateCar } from "../../components/car/car-create";
import { CarList } from "../../components/car/car-list";
import { retriveArrivalTypes, fetchArrivalType, arrivalTypesSelector } from "../../slices/arrivalTypesSlice";
import { retriveCars, carsSelector } from "../../slices/carSlice";
import { retriveCarModels, carModelsSelector } from "../../slices/carModelsSlice";
import { getAllPurposes, purposeSelector } from "../../slices/purposeSlice";
import { userSelector, retriveUserData } from "../../slices/userSlice";

const Cars = () => {
    const dispatch = useDispatch();
    
    const { isAuthenticated, user } = useSelector(userSelector);
    const arrivalTypes = useSelector(arrivalTypesSelector);
    const cars = useSelector(carsSelector);
    const carModels = useSelector(carModelsSelector);
    const purposes = useSelector(purposeSelector);

    // console.log(Object.values(arrivalTypes.arrivalTypes));
    // console.log((arrivalTypes));
    // console.log(purposes);
    
    useEffect(() => {
        dispatch(getAllPurposes());
        dispatch(retriveCarModels());
        dispatch(retriveCars());
        dispatch(retriveArrivalTypes());
    }, [dispatch]);


    const renderCarList = () => {
        if (cars && carModels) {
            return <CarList cars={cars} carModels={carModels}/>;
        } else {
            return <p>Ожидание загрузки списка автомобилей...</p>
        }
    };

    const renderCreateCar = () => {
        if (cars && carModels && arrivalTypes) {
            return <CreateCar 
                carModels={carModels} 
                arrivalTypes={arrivalTypes}
                purposes={purposes}
            />
        } else {
            return <p>Ожидание загрузки формы добавления автомобиля...</p>
        }
    };

    return (
        (!user && !cars && !carModels && !purposes) ? (
            <div>Ожидание загрузки данных</div>
        ) : (
            <section>
                <Row className="mt-3 justify-content-md-center">
                { isAuthenticated && (user.user.is_superuser || user.user.is_sales_director || user.user.is_puchase_manager) ? (
                        <Fragment>
                            <Col xs lg="6">
                                {renderCarList()}
                            </Col> 
                            <Col xs lg="4">
                                {renderCreateCar()}
                            </Col>
                        </Fragment>
                        ):(
                            <Fragment>
                                {renderCarList()}
                            </Fragment>
                        )   
                    }
                </Row>
            </section>
        )
    );
};

export default Cars;