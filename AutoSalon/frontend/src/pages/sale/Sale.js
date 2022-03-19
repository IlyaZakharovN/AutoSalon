import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Col, Row } from "react-bootstrap";
// import { Breadcrumb } from "react-bootstrap"; // maybe add later
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import SaleCancel from "../../components/sale/sale-cancel";
import SaleDetail from "../../components/sale/sale-detail";
import SaleUpdate from "../../components/sale/sale-patch";

import { fetchAddOption, addOptionSelector, retriveAddOptions } from "../../slices/addOptionSlice";
import { fetchCar, retriveCars, carsSelector } from "../../slices/carSlice";
import { fetchCarModel, getAllCarModels, carModelsSelector } from "../../slices/carModelsSlice";
import { getAllCarStatuses, carStatusSelector } from "../../slices/carStatusSlice";
import { fetchEmplData, retriveEmplData, employeeSelector } from "../../slices/employeeSlice";
import { fetchPurchaseType, retrivePurchaseTypes, purchaseTypesSelector } from "../../slices/purchaseTypesSlice";
import { getAllPurposes, purposeSelector } from "../../slices/purposeSlice";
import { retriveSaleRecords, fetchSaleRecord, saleSelector } from "../../slices/saleSlice";
import { getAllSaleStatuses, saleStatusSelector } from "../../slices/saleStatusSlice";
import { getAllSaleTypes, saleTypeSelector } from "../../slices/saleTypeSlice";
import { retriveUserData, getUserDetails, userSelector } from "../../slices/userSlice";

const Sale = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const { isAuthenticated, user } = useSelector(userSelector);
    const cars = useSelector(carsSelector);
    const carModels = useSelector(carModelsSelector);
    const carStatuses = useSelector(carStatusSelector);
    const sale = useSelector(saleSelector);
    const purchaseTypes = useSelector(purchaseTypesSelector);
    const empls = useSelector(employeeSelector);
    const addOptions = useSelector(addOptionSelector);
    const saleTypes = useSelector(saleTypeSelector);
    const saleStatuses = useSelector(saleStatusSelector);
    
    const [installed, setInstalled] = useState(); 

    const initFetch = useCallback(async() => {
        const id = params.id;
        await dispatch(fetchSaleRecord(id));
        await dispatch(getUserDetails());
        await dispatch(retriveCars());
        await dispatch(getAllCarModels());
        await dispatch(retrivePurchaseTypes());
        await dispatch(retriveAddOptions());
        await dispatch(getAllCarStatuses());
        await dispatch(getAllSaleTypes());
        await dispatch(getAllSaleStatuses());
        await dispatch(getAllPurposes());
        await dispatch(retriveEmplData());
    }, [dispatch, params.id]); //, sale.VIN, car.model_id, sale.purchase_type_id, sale.seller

    useEffect(() => {
        initFetch();
    }, [initFetch]);

    // const theEmpl = Array.isArray(empls) && empls
    //     .filter(empl => empl.id === sale.seller);
    
    const renderSaleDetail = () => {
        if (
            sale && cars && carModels && 
            purchaseTypes && empls && addOptions &&
            saleTypes && saleStatuses
        ) {
            return <SaleDetail 
                sale={sale} 
                car={
                    Array.isArray(cars) && cars
                        .filter(car => car.VIN === sale.VIN)
                } 
                carModels={carModels}
                purch_type={
                    Array.isArray(purchaseTypes) && purchaseTypes
                        .filter(pType => pType.id === sale.purchase_type)
                } 
                addOptions={addOptions}
                empls={empls}
                saleType={
                    Array.isArray(saleTypes) && saleTypes
                        .filter(sType => sType.id === sale.sale_type)
                }
                saleStatus={
                    Array.isArray(saleStatuses) && saleStatuses
                        .filter(sStatus => sStatus.id === sale.sale_status)
                } 
            />;
        } else {
            return <p>Ожидание загрузки страницы продажи...</p>
        }
    };

    const renderUpdateForm = () => {
        if (
            sale && saleTypes && saleStatuses &&
            cars && carModels && addOptions &&
            purchaseTypes && empls && user
        ) {
            return <SaleUpdate
                sale={sale}
                saleTypes={saleTypes}
                saleStatuses={saleStatuses}
                car={
                    Array.isArray(cars) && cars
                        .filter(car => car.VIN === sale.VIN)
                }
                carModels={carModels}
                addOpts={addOptions}
                purch_types={purchaseTypes}
                empls={
                    Array.isArray(empls) &&
                    empls.filter(empl => (empl.is_sales_manager || empl.is_sales_director))
                }
                user={user.user}
            />
        } else {
            return <p>Ожидание загрузки формы обновления...</p>
        }
    };

    const renderSaleCancel = () => {
        if (
            sale && cars && empls && 
            user
        ) {
            return <SaleCancel
                sale={sale}
                car={
                    Array.isArray(cars) && cars
                        .filter(car => car.VIN === sale.VIN)[0]
                }
                empls={
                    Array.isArray(empls) &&
                    empls.filter(empl => (empl.is_sales_manager || empl.is_sales_director))
                }
                user={user.user}
            />
        }
        else {
            return <p>Ожидание загрузки функции отмены...</p>
        }
    };

    return (
        (!sale && !purchaseTypes && !user && 
        !cars && !carModels && !addOptions &&
        !empls && carStatuses && saleStatuses &&
        !saleTypes
        ) ? (
            <div>Ожидание загрузки данных</div>
        ) : (
            <section>
                <Row className="mt-3 justify-content-md-center">
                    {isAuthenticated ? (
                        <Fragment>
                            <Col xs lg="6">
                                {renderSaleDetail()}
                            </Col> 
                            {(user.user.is_superuser || 
                            user.user.is_sales_director ||
                            user.user.is_sales_manager) ? (
                                <Col xs lg="4">
                                    {renderUpdateForm()}
                                    <div className="mt-5"> 
                                        {renderSaleCancel()}
                                    </div>
                                </Col>
                            ) : (
                                <></>
                            )}
                        </Fragment>
                    ) : (
                        <h6>У вас нет прав доступа к этой странице</h6>
                        // Add transfer to boiler plate 
                    )}
                </Row>
            </section>
        )
    );
};

export default Sale;