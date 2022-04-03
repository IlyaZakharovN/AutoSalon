import React, { Fragment, useState, useEffect, useCallback, useMemo } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateCarModel from "../../components/carModels/carModel-create";
import CarModels from "../../components/carModels/carModel-list";
import { SearchCarModels } from "../../components/carModels/carModel-search";
import { FilterCarModels } from "../../components/carModels/carModel-filter";

import { 
    getAllCarModels, 
    carModelsSelector 
} from "../../slices/carModelsSlice";
import { 
    retriveCars,
    carsSelector
} from "../../slices/carSlice";
import { 
    userSelector, 
    retriveUserData 
} from "../../slices/userSlice";

const CarModelsList = () => {
    const carModels = useSelector(carModelsSelector);
    const cars = useSelector(carsSelector);
    const { user, isAuthenticated } = useSelector(userSelector);
    const dispatch = useDispatch();
    // console.log(carModels);

    const initFetch = useCallback(async() => {
        await dispatch(getAllCarModels());
        await dispatch(retriveCars());
    }, [dispatch]);

    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const renderCarModelsList = () => {
        if (carModels) {
            return <CarModels 
                carModels={
                    carModels
                }
                isAuthenticated={isAuthenticated}
            />
        } else {
            return <p>Ожидание загрузки каталога автомобилей...</p>
        }
    };

    const renderCreateCarModel = () => {
        if (carModels) {
            return <CreateCarModel/>
        } else {
            return <p>Ожидание загрузки формы добавления моделей автомобилей...</p>
        }
    };

    const renderSearch = () => {
        if (carModels) {
            return <SearchCarModels/>
        }
    };

    const renderFilter = () => {
        if (carModels) {
            return <FilterCarModels
                carModels={carModels}
            />
        }
    };

    return (
        (!carModels) ? (
            <div>Ожидание загрузки данных</div>
        ) : (
            <section>
                <Row className="mt-3 justify-content-md-center">
                    { isAuthenticated && (user.user.is_superuser || user.user.is_sales_director || user.user.is_puchase_manager) ? (
                        <Fragment>
                            <Col xs="5">
                                <h4>Модели автомобилей</h4>
                                {renderSearch()}
                                {renderFilter()}
                                {renderCarModelsList()}
                            </Col> 

                            <Col xs="3">
                                {renderCreateCarModel()}
                            </Col>
                        </Fragment>
                        ):(
                            <Fragment>
                                <Col xs="5">
                                    <h4>Модели автомобилей</h4>
                                    {renderFilter()}
                                    {renderSearch()}
                                    {renderCarModelsList()}
                                </Col> 
                            </Fragment>
                        )   
                    }
                </Row>
            </section>
        )
    );
};

export default CarModelsList;