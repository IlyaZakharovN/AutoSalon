import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { CreateCar } from "../../components/car/car-create";
import { CarList } from "../../components/car/car-list";
import { retriveArrivalTypes, fetchArrivalType } from "../../slices/arrivalTypesSlice";
import { retriveCars } from "../../slices/carSlice";
import { retriveCarModels } from "../../slices/carModelsSlice";
import { userSelector, retriveUserData } from "../../slices/userSlice";

const Cars = () => {
    // const cars = useSelector(state => state.cars);
    const [cars, setCars] = useState();
    const [carModels, setCarModels] = useState();
    const [arrivalTypes, setArrivalTypes] = useState();
    const { isAuthenticated, is_superuser, is_sales_director, is_puchase_manager } = useSelector(userSelector);
    const dispatch = useDispatch();

    const fetchCars = useCallback(async() => { // pre: no useCallback
        console.log('fetching cars...');
        const result = await dispatch(retriveCars());
        setCars(result.payload);
        // console.log(cars);
    }, [dispatch]);

    const fetchCarModels = useCallback(async() => { 
        console.log('fetching car models...');
        const result = await dispatch(retriveCarModels());
        setCarModels(result.payload);
        // console.log(carModels);
    }, [dispatch]);

    const fetchArrivalTypes = useCallback(async() => {
        console.log('fetching arrival types...');
        const result = await dispatch(retriveArrivalTypes());
        setArrivalTypes(result.payload);
    }, [dispatch]);
    
    useEffect(() => {
        // console.log(cars);
        fetchCars();
        fetchCarModels();
        fetchArrivalTypes();
    }, [fetchCars, fetchCarModels, fetchArrivalTypes]);


    const renderCarList = () => {
        if (cars && carModels) {
            return <CarList cars={cars} carModels={carModels}/>;
        } else {
            return <p>Ожидание загрузки...</p>
        }
    };

    const renderCreateCar = () => {
        return <CreateCar carModels={carModels} arrivalTypes={arrivalTypes}/>
    };

    return (
        <section>
            <Row className="mt-3 justify-content-md-center">
            { isAuthenticated && (is_superuser || is_sales_director || is_puchase_manager) ? (
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
    );
};

export default Cars;