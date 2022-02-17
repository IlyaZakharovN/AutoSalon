import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { CreateSale } from "../../components/sale/sale-create";
import { SaleList } from "../../components/sale/sale-list";
import { retriveCars, carsSelector } from "../../slices/carSlice";
import { retriveCarModels, carModelsSelector } from "../../slices/carModelsSlice";
import { retrivePurchaseTypes, fetchPurchaseType } from "../../slices/purchaseTypesSlice";
import { retriveSaleRecords, fetchSaleRecord, saleSelector } from "../../slices/saleSlice";
import { userSelector, retriveUserData } from "../../slices/userSlice";
import { addOptionSelector, retriveAddOptions } from "../../slices/addOptionSlice";
import { purchaseTypesSelector } from "../../slices/purchaseTypesSlice";

const Sales = () => {
    const { isAuthenticated, is_superuser, is_sales_director, is_sales_manager } = useSelector(userSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cars = useSelector(carsSelector);
    const carModels = useSelector(carModelsSelector);
    const sales = useSelector(saleSelector);
    const purchaseTypes = useSelector(purchaseTypesSelector);
    const empl = useSelector(userSelector);
    const addOption = useSelector(addOptionSelector);

    const initFetch = useCallback(async() => {
        await dispatch(retriveCarModels());
        await dispatch(retriveCars());
        await dispatch(retriveSaleRecords());
        await dispatch(retrivePurchaseTypes());
        await dispatch(retriveAddOptions());
    }, [dispatch]);

    useEffect(() => {
        initFetch();
        // Init();
    }, [initFetch]);

    const renderSaleList = () => {
        // console.log('cars - ', cars);
        if (sales && purchaseTypes && cars && carModels) {
            return <SaleList sales={sales} purch_types={purchaseTypes} carModels={carModels}/>;
        } else {
            return <p>Ожидание загрузки списка продаж...</p>
        }
    };

    const renderCreateSale = () => {
        if (cars && carModels && purchaseTypes && empl && addOption) {
            return <CreateSale purch_types={purchaseTypes} empl={empl} cars={cars} carModels={carModels} addOpts={addOption} sales={sales}/>;
        } else {
            return <p>Ожидание загрузки формы добавления продажи...</p>
        }
    };

    return (
        (!sales && !purchaseTypes && !empl && !cars && !carModels && !addOption) ? (
            <div>Ожидание загрузки данных</div>
        ) : (
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
        )
    );
};

export default Sales;


// AddOptions form (create for director and sales manager)