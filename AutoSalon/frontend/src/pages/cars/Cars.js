import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { CreateCar } from "../../components/car/car-create";
import { CarList } from "../../components/car/car-list";
import { retriveCars } from "../../slices/carSlice";
import { userSelector, retriveUserData } from "../../slices/userSlice";

const Cars = () => {
    // const cars = useSelector(state => state.cars);
    const [cars, setCars] = useState();
    const { isAuthenticated, is_superuser, is_sales_director, is_puchase_manager } = useSelector(userSelector);
    const dispatch = useDispatch();

    const fetchCars = useCallback(async() => { // pre: no useCallback
        console.log('dispatched');
        const result = await dispatch(retriveCars());
        setCars(result.payload);
        console.log(cars);
    }, [dispatch]);
    
    // const fetchCars = useCallback(() => {
    //     console.log('dispatched');
    //     dispatch(retriveCars());
    // }, [dispatch])
    
    useEffect(() => {
        console.log(cars);
        return fetchCars();
    }, [fetchCars])


    // const useFetchCars = () => {
    //     useEffect(() => {
    //         fetchCars();
    //     }, [fetchCars]);
    // }
    // const c = useFetchCars();

    const carModels = useSelector(state => state.carModels);
    const renderCarList = () => {
        // fetchCars();
        // fetchCars();
        // console.log(cars);
        // const c = await dispatch(retriveCars());
        // console.log(c);
    
        
        return <CarList cars={cars}/>;
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
                            {CreateCar()}
                        </Col>
                    </Fragment>
                    ):(
                        <Fragment>
                            {/* {renderCarModelsList()} */}
                        </Fragment>
                    )   
                }
            </Row>
        </section>
    );
};

export default Cars;