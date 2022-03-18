import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { CreateSale } from "../../components/sale/sale-create";
import { SaleList } from "../../components/sale/sale-list";

import { addOptionSelector, retriveAddOptions } from "../../slices/addOptionSlice";
import { retriveCars, carsSelector } from "../../slices/carSlice";
import { retriveEmplData, employeeSelector } from "../../slices/employeeSlice";
import { getAllPurposes, purposeSelector } from "../../slices/purposeSlice";
import { getAllCarStatuses, carStatusSelector } from "../../slices/carStatusSlice";
import { getAllCarModels, carModelsSelector } from "../../slices/carModelsSlice";
import { retrivePurchaseTypes, fetchPurchaseType, purchaseTypesSelector } from "../../slices/purchaseTypesSlice";
import { retriveSaleRecords, fetchSaleRecord, saleSelector } from "../../slices/saleSlice";
import { getAllSaleStatuses, saleStatusSelector } from "../../slices/saleStatusSlice";
import { getAllSaleTypes, saleTypeSelector } from "../../slices/saleTypeSlice";
import { userSelector, getUserDetails } from "../../slices/userSlice";

const Sales = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { isAuthenticated, user } = useSelector(userSelector);
    const cars = useSelector(carsSelector);
    const carModels = useSelector(carModelsSelector);
    const sales = useSelector(saleSelector);
    const purchaseTypes = useSelector(purchaseTypesSelector);
    const addOptions = useSelector(addOptionSelector);
    const carStatuses = useSelector(carStatusSelector);
    const saleTypes = useSelector(saleTypeSelector);
    const saleStatuses = useSelector(saleStatusSelector);
    const carPuposes = useSelector(purposeSelector);
    const empls = useSelector(employeeSelector);

    const initFetch = useCallback(async() => {
        await dispatch(getUserDetails());
        await dispatch(retriveCars());
        await dispatch(getAllCarModels());
        await dispatch(retriveSaleRecords());
        await dispatch(retrivePurchaseTypes());
        await dispatch(retriveAddOptions());
        await dispatch(getAllSaleTypes());
        await dispatch(getAllSaleStatuses());
        await dispatch(getAllPurposes());
        await dispatch(retriveEmplData());
    }, [dispatch]);

    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const renderSaleList = () => {
        // console.log('cars - ', cars);
        if (
            sales && saleTypes && cars &&
            carModels && empls
        ) {
            return <SaleList 
                sales={sales} 
                carModels={carModels}
                saleTypes={saleTypes}
                empls={empls}
            />;
        } else {
            return <p>Ожидание загрузки списка продаж...</p>
        }
    };

    const renderCreateSale = () => {
        if (
            cars && carModels && purchaseTypes && 
            user && addOptions && empls &&
            sales && carStatuses && saleStatuses
        ) {
            return <CreateSale 
                purch_types={purchaseTypes} 
                empls={Array.isArray(empls) &&
                    empls.filter(empl => (empl.is_sales_manager || empl.is_sales_director))
                } 
                cars={Array.isArray(cars) && cars
                    .filter(car => (car.purpose === 1 && car.status === 1))} 
                carModels={carModels} 
                addOpts={addOptions} 
                sales={sales}
                user={user.user}
                saleTypes={saleTypes}
                saleStatuses={saleStatuses}
            />;
        } else {
            return <p>Ожидание загрузки формы добавления продажи...</p>
        }
    };

    return (
        (!sales && !purchaseTypes && !user && 
        !cars && !carModels && !addOptions &&
        !empls && carStatuses && saleStatuses) ? (
            <div>Ожидание загрузки данных</div>
        ) : (
            <section>
                <Row className="mt-3 justify-content-md-center">
                { isAuthenticated && (user.user.is_superuser || user.user.is_sales_director || user.user.is_sales_manager) ? (
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