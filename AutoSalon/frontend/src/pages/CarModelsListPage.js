import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Children } from "react";

import { retriveCarModels, carModelsSelector } from "../slices/carModelsSlice";
import { userSelector, retriveUserData } from "../slices/userSlice";
import CreateCarModel from "../components/carModels/create";
import CarModels from "../components/carModels/list";

// Add availability
const CarModelsList = () => {
    // const [currentCarModel, setCurrentCarModel] = useState(null);
    // const [carModels, setCarModels] = useState();
    // const { carModels: carModels, loading: carModelsLoading, hasErrors: carModelsHasErrors } = useSelector(carModelsSelector); // maybe add later
    // const [currentIndex, setCurrentIndex] = useState(-1); // maybe later add short description
    // const [searchCarModel, setSearchCarModel] = useState(""); // for searching, add later

    const carModels = useSelector(state => state.carModels);
    const { isAuthenticated, is_superuser, is_sales_director, is_puchase_manager } = useSelector(userSelector);
    const dispatch = useDispatch();
    console.log(carModels);

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

    const initFetch = useCallback(() => {
        dispatch(retriveCarModels());
        console.log('dispatched');
    }, [dispatch])
    // // carModels = useSelector(state => state.carModels);

    useEffect(() => {
        initFetch();
    }, [initFetch])
    // console.log(carModels);

    const renderCarModelsList = () => {
        // const cm = await dispatch(retriveCarModels());
        // const carModels = await cm.payload;
        // const carModels = useSelector(state => state.carModels);
        // setCarModels(carModels);
        console.log(carModels);
        // console.log(Array.isArray(Object.entries(carModels)));
        // console.log(typeof(carModels));
        // console.log(Object.entries(carModels));
        // // const carModels = cm.payload;
        // setCarModels(cm.payload);
        // console.log(carModels);

        // const res = await dispatch(retriveCarModels());
        // console.log(res.data);
        // initFetch().then((res) => {
        //     <CarModels carModels={res.data} />
        // })
        // const cm = await initFetch().then(<CarModels carModels={cm} />)
        // if (carModelsLoading) return <p>Данные загружаются...</p>
        // if (carModelsHasErrors) return <p>Невозможно отобразить данные.</p>
        // if (!carModels || carModels.length === 0) {
        //     return <p>Данные загружаются...</p>
        // } else {
        // }
        // try {
        //     return <CarModels carModels={carModels} />
        // } catch (err) {
        //     console.log(err);
        // }
        // return (
        //     // <>{Object.entries(carModels).map((carModel) => <li>{carModel} </li>)}</>
        //     <CarModels />
        // );
        // if (carModels) {
            // return <CarModels carModels={Children.toArray(carModels)} />
            // return <p>{(Object.entries(carModels))}</p> 
        // }
        return <CarModels carModels={carModels}/>
    };
    
    // useEffect(() => {
    //     renderCarModelsList();
    // }, []);

    // const refreshData = () => {
    //     setCurrentCarModel(null);
    //     setCurrentIndex(-1);
    // };

    // const setActiveCarModel = (carModel, index) => {
    //     setCurrentCarModel(carModel);
    //     setCurrentIndex(index);
    // };

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