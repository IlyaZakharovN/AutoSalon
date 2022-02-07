import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { retriveCarModels, carModelsSelector } from "../../slices/carModelsSlice";
import { userSelector, retriveUserData } from "../../slices/userSlice";
import CreateCarModel from "../../components/carModels/create";
import CarModels from "../../components/carModels/list";

// Add availability
const CarModelsList = () => {
    // const [currentCarModel, setCurrentCarModel] = useState(null);
    const [carModels, setCarModels] = useState();
    // const { carModels: carModels, loading: carModelsLoading, hasErrors: carModelsHasErrors } = useSelector(carModelsSelector); // maybe add later
    // const [currentIndex, setCurrentIndex] = useState(-1); // maybe later add short description
    // const [searchCarModel, setSearchCarModel] = useState(""); // for searching, add later

    // const carModels = useSelector(state => state.carModels);
    const { isAuthenticated, is_superuser, is_sales_director, is_puchase_manager } = useSelector(userSelector);
    const dispatch = useDispatch();
    console.log(carModels);

    const fetchCarModels = useCallback(async() => { // pre: no useCallback
        console.log('dispatched');
        const result = await dispatch(retriveCarModels());
        setCarModels(result.payload);
        console.log(carModels);
    }, [dispatch]);

    useEffect(() => {
        console.log(carModels);
        return fetchCarModels();
    }, [fetchCarModels])

    // useEffect(() => {
    //     dispatch(retriveCarModels()).then(res => {
    //         console.log(res.payload);
    //         setCarModels(res.payload);
    //     })
    // }, []);

    // get CarModels:
    // const initFetch = useCallback(() => {
    //     try {
    //         dispatch(retriveCarModels())
    //         .then((res) => {
    //             console.log(res.data);
    //             setCarModels(res.data)
    //         });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }, [dispatch])

    // const initFetch = () => {
    //     const res = dispatch(retriveCarModels());
    //     console.log(res.payload);
    //     // setCarModels(res.data); 
    //     setCarModels(res.payload);
    // }

    // useEffect(() => {
    //     initFetch();
    //     // console.log(carModels);
    // }, [initFetch])
    // // end get Carmodels

    // const initFetch = useCallback(() => {
    //     dispatch(retriveCarModels());
    //     console.log('dispatched');
    // }, [dispatch])
    // // // carModels = useSelector(state => state.carModels);

    // useEffect(() => {
    //     initFetch();
    // }, [initFetch])
    // console.log(carModels);

    const renderCarModelsList = () => {
        // console.log(carModels);
        return <CarModels carModels={carModels}/>
    };

    return (
        <section>
            <Row className="mt-3 justify-content-md-center">
                { isAuthenticated && (is_superuser || is_sales_director || is_puchase_manager) ? (
                    <Fragment>
                        <Col xs lg="6">
                            {renderCarModelsList()}
                        </Col> 
                        <Col xs lg="4">
                            {CreateCarModel()}
                        </Col>
                    </Fragment>
                    ):(
                        <Fragment>
                            {renderCarModelsList()}
                        </Fragment>
                    )   
                }
            </Row>
        </section>
    );
};

export default CarModelsList;