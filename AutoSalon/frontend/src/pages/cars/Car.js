import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
// import { Breadcrumb } from "react-bootstrap"; // maybe add later
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CarDetail from "../../components/car/car-detail";
import CarUpdate from "../../components/car/car-patch";
import CarDelete from "../../components/car/car-delete";
import { retriveArrivalTypes, fetchArrivalType } from "../../slices/arrivalTypesSlice";
import { retriveCarModels, fetchCarModel } from "../../slices/carModelsSlice";
import { fetchCar, retriveCars } from "../../slices/carSlice";
import { fetchStockRecord, retriveStock } from "../../slices/stockSlice";
import { userSelector, retriveUserData } from "../../slices/userSlice";

const CarPage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { isAuthenticated, is_superuser, is_sales_director, is_puchase_manager } = useSelector(userSelector);
    // const car = useSelector(state => state.car);
    const [car, setCar] = useState();
    // const [cars, setCars] = useState()
    const [carModel, setCarModel] = useState();
    const [carModels, setCarModels] = useState();
    const [stock, setStock] = useState();
    const [arrivalType, setArrivalType] = useState();
    const [arrTypes, setArrTypes] = useState();

    // console.log(car);
    // console.log(carModels);

    const fetchData = useCallback(async() => {
        console.log('1) fetching car');
        const vin = params.vin;
        const carResult = await dispatch(fetchCar(vin));
        setCar(carResult.payload);
        console.log(car);

        console.log('2) fetching specific car model');
        const id = carResult.payload.model_id;
        // console.log(id);
        const cmResult = await dispatch(fetchCarModel(id));
        console.log(cmResult.payload);
        setCarModel(cmResult.payload);

        console.log('3) fetching all stock records');
        const stockResult = await dispatch(retriveStock());
        // console.log(stockResult.payload);
        const theStock = (stockResult.payload && stockResult.payload
            .sort((a, b) => new Date(b.arrival_date) - new Date(a.arrival_date))
            .filter(stock => stock.VIN === vin))[0]; 
        const stockId = theStock.id
        // console.log(stockId);

        console.log('4) fetching the stock record');
        const theStockResult = await dispatch(fetchStockRecord(stockId));
        // console.log(theStockResult.payload);
        setStock(theStockResult.payload);

        console.log('5) fetching all arrival types');
        const arrivalTypesResult = await dispatch(retriveArrivalTypes());
        // console.log(arrivalTypesResult.payload);
        setArrTypes(arrivalTypesResult.payload);
        const stockArrTypeId = theStock.arrival_type_id;
        console.log(arrTypes);

        console.log('6) fetching required arrival type');
        const theArrTypesResult = await dispatch(fetchArrivalType(stockArrTypeId));
        // console.log(theArrTypesResult.payload);
        setArrivalType(theArrTypesResult.payload);
        console.log(arrivalType);

        console.log('For patch function:');
        console.log('7) fetching all car models');
        const carModelsResult = await dispatch(retriveCarModels());
        setCarModels(carModelsResult.payload);
    }, [dispatch]);

    useEffect(() => {
        const vin = params.vin;
        console.log('Fetching data:');
        fetchData();
    }, [fetchData]); //dispatch fetchCarModels

    const renderCar = () => {
        if (car && carModel && stock && arrivalType) {
            return <CarDetail car={car} carModel={carModel} stock={stock} arrivalType={arrivalType}/>
        } else {
            return <p>Ожидание загрузки страницы...</p>
        }
    };

    const renderUpdateForm = () => {
        if (car && carModel && stock && arrivalType) {
            return <CarUpdate car={car} stock={stock} carModels={carModels} arrTypes={arrTypes}/>
        } else {
            return <p>Ожидание загрузки формы обновления...</p>
        }
    };

    const renderDeleteFeature = () => {
        if (car && carModel && stock && arrivalType) {
            return <CarDelete car={car} stock={stock}/>
        } else {
            return <p>Ожидание загрузки функции удаления...</p>
        }
    };

    return (
        <section>
            <Row className="mt-3 justify-content-md-center">
            { isAuthenticated && (is_superuser || is_sales_director || is_puchase_manager) ? (
                    <Fragment>
                        <Col xs lg="6">
                            {renderCar()}
                        </Col> 
                        <Col xs lg="4">
                            {renderUpdateForm()}
                        </Col>
                        <div className="mt-5"> 
                            {renderDeleteFeature()}
                        </div>
                    </Fragment>
                    ):(
                        <Fragment>
                            <Col xs lg="6">
                                {renderCar()}
                            </Col>
                        </Fragment>
                    )   
                }
            </Row>
        </section>
    );
};

export default CarPage;