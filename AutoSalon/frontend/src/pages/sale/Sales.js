import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { CreateSale } from "../../components/sale/sale-create";
import { SaleList } from "../../components/sale/sale-list";
import { retriveCars } from "../../slices/carSlice";
import { retriveCarModels } from "../../slices/carModelsSlice";
import { retrivePurchaseTypes, fetchPurchaseType } from "../../slices/purchaseTypesSlice";
import { retriveSaleRecords, fetchSaleRecord } from "../../slices/saleSlice";
import { userSelector, retriveUserData } from "../../slices/userSlice";

const Sales = () => {
    // const [cars, setCars] = useState();
    // const [carModels, setCarModels] = useState();
    // const [sales, setSales] = useState();
    // const [purchaseTypes, setPurchaseTypes] = useState();
    const { isAuthenticated, is_superuser, is_sales_director, is_sales_manager } = useSelector(userSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cars = useSelector(state => state.car);
    const carModels = useSelector(state => state.carModels);
    const sales = useSelector(state => state.sale);
    const purchaseTypes = useSelector(state => state.purchaseTypes);
    const empl = useSelector(state => state.user)
    // console.log('1-',cars);
    // console.log('2-',carModels);
    // console.log('3-',sales);
    // console.log('4-',purchaseTypes);

    const fetchCars = useCallback(async() => { 
        console.log('fetching cars...');
        await dispatch(retriveCars());
        // setCars(result.payload);
        // console.log(cars);
    }, [dispatch]);

    const fetchCarModels = useCallback(async() => { 
        console.log('fetching car models...');
        await dispatch(retriveCarModels());
        // setCarModels(result.payload);
        // console.log(carModels);
    }, [dispatch]);

    const fechSales = useCallback(async() => {
        console.log('fetching sale records...');
        await dispatch(retriveSaleRecords());
    }, [dispatch]);

    const fechPurchaseTypes = useCallback(async() => {
        console.log('fetching purchase types...');
        await dispatch(retrivePurchaseTypes());
    }, [dispatch]);
    
    useEffect(() => {
        fetchCars();
        fetchCarModels();
        fechSales();
        fechPurchaseTypes();
    }, [fetchCars, fetchCarModels, fechSales, fechPurchaseTypes]);

    const renderSaleList = () => {
        if (cars && carModels) {
            return <SaleList sales={sales} purch_types={purchaseTypes} carModels={carModels}/>;
        } else 
        {
            return <p>Ожидание загрузки списка продаж...</p>
        }
    };

    const renderCreateSale = () => {
        if (cars && carModels) {
            return <CreateSale purch_types={purchaseTypes} empl={empl} cars={cars} carModels={carModels}/>;
        } else 
        {
            return <p>Ожидание загрузки формы добавления продажи...</p>
        }
    };

    return (
        <section>
            <Row className="mt-3 justify-content-md-center">
            { isAuthenticated && (is_superuser || is_sales_director || is_sales_manager) ? (
               <Fragment>
                    <Col xs lg="6">
                        {renderSaleList()}
                    </Col> 
                    <Col xs lg="4">
                        {renderCreateSale()}
                    </Col>
                </Fragment> 
            ):(
                <Fragment>
                    {renderSaleList()}
                </Fragment>
            )}
            </Row>
        </section>
    );
};

export default Sales;


// AddOptions form (create for director and sales manager)