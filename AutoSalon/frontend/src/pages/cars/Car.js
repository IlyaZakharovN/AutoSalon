import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
// import { Breadcrumb } from "react-bootstrap"; // maybe add later
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CarDetail from "../../components/car/car-detail";
import CarUpdate from "../../components/car/car-patch";
import CarDelete from "../../components/car/car-delete";
import { retriveArrivalTypes, fetchArrivalType, arrivalTypesSelector } from "../../slices/arrivalTypesSlice";
import { getAllCarModels, fetchCarModel, carModelsSelector } from "../../slices/carModelsSlice";
import { fetchCar, retriveCars, carsSelector } from "../../slices/carSlice";
import { fetchStockRecord, retriveStock, stockSelector } from "../../slices/stockSlice";
import { userSelector, retriveUserData } from "../../slices/userSlice";
import { purposeSelector, getAllPurposes } from "../../slices/purposeSlice";
import { employeeSelector, retriveEmplData } from "../../slices/employeeSlice";
import { getAllCarStatuses, carStatusSelector } from "../../slices/carStatusSlice";

const CarPage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    
    const { isAuthenticated, user } = useSelector(userSelector);
    const car = useSelector(carsSelector);
    const carModels = useSelector(carModelsSelector);
    const purposes = useSelector(purposeSelector);
    const carStatuses = useSelector(carStatusSelector);
    const empls = useSelector(employeeSelector);
    const stock = useSelector(stockSelector);
    const arrivalTypes = useSelector(arrivalTypesSelector);

    const initFetch = useCallback(async() => {
        const vin = params.vin;
        await dispatch(fetchCar(vin));
        await dispatch(getAllCarModels());
        await dispatch(getAllPurposes());
        await dispatch(getAllCarStatuses());
        await dispatch(retriveEmplData());
        await dispatch(retriveStock());
        await dispatch(retriveArrivalTypes());
        await dispatch(getAllCarStatuses());
    }, [dispatch, params.vin]); 

    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const theStock = Array.isArray(stock) && stock
        .filter(s => s.VIN === car.VIN)
        .sort((a, b) => new Date(b.arrival_date) - new Date(a.arrival_date));

    const theCarStatus = Array.isArray(carStatuses) && carStatuses
        .filter(cS => cS.id === car.status);
    
    const theArrivalType = Array.isArray(arrivalTypes) && arrivalTypes
        .filter(aT => aT.id === theStock.arrival_type);

    const thePurpose = Array.isArray(purposes) && purposes
        .filter(p => p.id === car.purpose)

    const renderCar = () => {
        if (car && 
            carModels && 
            stock && theStock && 
            arrivalTypes && theArrivalType && 
            carStatuses && theCarStatus &&
            purposes && thePurpose    
        ) {
            return <CarDetail 
                car={car} 
                carModel={Array.isArray(carModels) && carModels
                    .filter(cM => cM.id === car.model_id)
                } 
                stock={theStock} 
                arrivalType={theArrivalType}
                user={user}
                isAuthenticated={isAuthenticated}
                carStatus={theCarStatus}
                purpose = {thePurpose}
            />
        } else {
            return <p>Ожидание загрузки страницы...</p>
        }
    };

    const renderUpdateForm = () => {
        if (car && 
            carModels && 
            stock && theStock && 
            arrivalTypes && carStatuses
        ) {
            return <CarUpdate 
                car={car} 
                stock={theStock} 
                carModels={carModels} 
                arrTypes={arrivalTypes}
                carStatuses={carStatuses}
                user={user}
                acceptors={(user.user.is_sales_director || user.user.is_superuser) ? (
                    Array.isArray(empls) && empls
                        .filter(empl => (empl.is_puchase_manager ||
                        empl.is_sales_director))
                ) : (
                    Array.isArray(user.user) && user
                )}
                purposes={purposes}
            />
        } else {
            return <p>Ожидание загрузки формы обновления...</p>
        }
    };

    // const renderDeleteFeature = () => {
    //     if (car && carModel && stock && arrivalType) {
    //         return <CarDelete car={car} stock={stock}/>
    //     } else {
    //         return <p>Ожидание загрузки функции удаления...</p>
    //     }
    // };

    return (
        (!car && !carModels && !purposes && !carStatuses && !arrivalTypes && !stock) ? (
            <div>Ожидание загрузки данных</div>
        ) : (
            <section>
                <Row className="mt-3 justify-content-md-center">
                { isAuthenticated && (user.user.is_superuser || user.user.is_sales_director || user.user.is_puchase_manager) ? (
                        <Fragment>
                            <Col xs lg="6">
                                {renderCar()}
                            </Col> 
                            <Col xs lg="4">
                                {renderUpdateForm()}
                            </Col>
                            <div className="mt-5"> 
                                {/* {renderDeleteFeature()} */}
                            </div>
                        </Fragment>
                        ):(
                            <Fragment>
                                <Col xs lg="6">
                                    {/* {renderCar()} */}
                                </Col>
                            </Fragment>
                        )   
                    }
                </Row>
            </section>
        )
    );
};

export default CarPage;