import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Col, Row } from "react-bootstrap";
// import { Breadcrumb } from "react-bootstrap"; // maybe add later
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import SaleDetail from "../../components/sale/sale-detail";
import { fetchAddOption, addOptionSelector, retriveAddOptions } from "../../slices/addOptionSlice";
import { fetchCar, retriveCars, carsSelector } from "../../slices/carSlice";
import { fetchCarModel, retriveCarModels, carModelsSelector } from "../../slices/carModelsSlice";
import { fetchPurchaseType, retrivePurchaseTypes, purchaseTypesSelector } from "../../slices/purchaseTypesSlice";
import { retriveSaleRecords, fetchSaleRecord, saleSelector } from "../../slices/saleSlice";
import { retriveUserData, userSelector } from "../../slices/userSlice";
import { fetchEmplData, employeeSelector } from "../../slices/employeeSlice";

const Sale = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const { isAuthenticated } = useSelector(userSelector);
    const car = useSelector(carsSelector);
    const carModel = useSelector(carModelsSelector);
    const sale = useSelector(saleSelector);
    const purchaseType = useSelector(purchaseTypesSelector);
    const empl = useSelector(employeeSelector);
    const addOptions = useSelector(addOptionSelector);
    
    // const [empl, setEmpl] = useState();
    const [installed, setInstalled] = useState(); 

    // const addInstalled = useCallback(async () => {
    //     if (sale.add_option_id) {
    //         // var newAdd = {};
    //         for (let i=0; i<=sale.add_option_id.length-1; i++) {
    //             console.log(sale.add_option_id[i]);
    //             const result = await dispatch(fetchAddOption(sale.add_option_id[i]));
    //             console.log(result.payload);
    //             const res = result.payload;
    //             // newAdd = result.payload;
    //             setInstalled(installed => [...installed, installed.push(result.payload)]);
    //             // setInstalled(installed => [...installed, (result.payload)]);
    //             // setInstalled({...installed, res});
    //         };
    //         console.log(installed);
    //     }
    // }, [dispatch, setInstalled]);

    const initFetch = useCallback(async() => {
        const id = params.id;
        // await dispatch(fetchSaleRecord(id))
        //     .then(dispatch(fetchCar(sale.VIN))
        //     .then(dispatch(fetchCarModel(car.model_id))
        //     .then(dispatch(fetchPurchaseType(sale.purchase_type_id))
        //     .then(dispatch(retriveAddOptions())
        //     .then(fetchEmplData(sale.seller)),
        // addInstalled()
        // await Promise.all([patchCar(), patchStock()]);
        await dispatch(fetchSaleRecord(id));
        await dispatch(retriveAddOptions());
        // await addInstalled();
        await dispatch(fetchCar(sale.VIN));
        await dispatch(fetchCarModel(car.model_id));
        await dispatch(fetchPurchaseType(sale.purchase_type_id));
        await dispatch(fetchEmplData(sale.seller));
    }, [dispatch, params.id, sale.VIN, car.model_id, sale.purchase_type_id, sale.seller]);

    // const initFetch = async() => {
    //     const id = params.id;
    //     await Promise.all([
    //         fetchSaleRecord(id), 
    //         fetchCar(sale.VIN),
    //         fetchCarModel(car.model_id),
    //         fetchPurchaseType(sale.purchase_type_id),
    //         retriveAddOptions(),
    //         fetchEmplData(sale.seller)
    //     ]);
    //     addInstalled();
    // };

    // const fetchEmpl = useCallback(async() => {
    //     // console.log('fetching arrival types...');
    //     const emplResult = await dispatch(fetchUserData(sale.seller));
    //     setEmpl(emplResult.payload);
    // }, [dispatch]);

    useEffect(() => {
        return initFetch();
        // fetchEmpl();
        // return addInstalled();
    }, [initFetch]);

    // useEffect(() => {
    //     const id = params.id;
    //     dispatch(fetchSaleRecord(id));
    //     dispatch(fetchCar(sale.VIN));
    //     dispatch(fetchCarModel(car.model_id));
    //     dispatch(fetchPurchaseType(sale.purchase_type_id));
    //     dispatch(retriveAddOptions());
    //     addInstalled();
    // }, [dispatch, addInstalled]);

    const renderSaleDetail = () => {
        if (sale && car && carModel && purchaseType && empl && addOptions) {
            console.log(installed);
            return <SaleDetail 
                sale={sale} 
                car={car} 
                carModel={carModel}
                purch_type={purchaseType} 
                addOptions={addOptions}
                empl={empl}   
                />;
        } else {
            return <p>Ожидание загрузки страницы продажи...</p>
        }
    };

    return (
        <section>
            <Row className="mt-3 justify-content-md-center">
                {isAuthenticated ? (
                    <Fragment>
                        <Col xs lg="6">
                            {renderSaleDetail()}
                        </Col> 
                    </Fragment>
                ) : (
                    <h6>У вас нет прав доступа к этой странице</h6>
                    // Add transfer to boiler plate 
                )}
            </Row>
        </section>
    );
};

export default Sale;