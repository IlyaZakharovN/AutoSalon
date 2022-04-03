import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { CreateTechInpection } from "../../components/tech-inspection/create/tech-inspection-create-default";
import { ListTechInspections } from "../../components/tech-inspection/tech-inspection-list";

import { 
    retriveCars, carsSelector 
} from "../../slices/carSlice";
import { 
    getAllCarModels, carModelsSelector 
} from "../../slices/carModelsSlice";
import { 
    fetchEmplData, 
    retriveEmplData, 
    employeeSelector 
} from "../../slices/employeeSlice";
import { 
    getAllTechInspections, 
    techInspectionSelector
} from "../../slices/techInspectionSlice";
import { 
    getAllTechInspectionRequests, 
    techInspectionRequestSelector 
} from "../../slices/techInspectionRequestSlice";
import { 
    userSelector, getUserDetails 
} from "../../slices/userSlice";

const TechInspections = () => {
    const dispatch = useDispatch();

    const { user, isAuthenticated } = useSelector(userSelector);
    const cars = useSelector(carsSelector);
    const carModels = useSelector(carModelsSelector);
    const empls = useSelector(employeeSelector);
    const techInspections = useSelector(techInspectionSelector);
    const techInspectionRequests = useSelector(techInspectionRequestSelector);

    const initFetch = useCallback(async() => {
        await dispatch(getAllCarModels());
        await dispatch(retriveCars());
        await dispatch(getAllTechInspections());
        await dispatch(getAllTechInspectionRequests());
        await dispatch(retriveEmplData());
    }, [dispatch]);

    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const renderList = () => {
        if (
            techInspections && techInspectionRequests && user &&
            cars && carModels && empls
        ) {
            return <ListTechInspections
                techInspections={techInspections}
                techInspRequests={techInspectionRequests}
                user={user.user}
                cars={cars}
                carModels={carModels}
                empls={empls}
            />
        } else {
            return <p>Ожидание загрузки списка тех. осмотров...</p>
        }
    };

    const renderCreate = () => {
        if (
            user, cars, carModels,
            techInspectionRequests, techInspections
        ) {
            return <CreateTechInpection
                user={user.user}
                cars={
                    Array.isArray(cars) && cars
                        .filter(car => car.status === 1)
                }
                carModels={carModels} 
                requests={techInspectionRequests}
            />
        } else {
            return <p>Ожидание загрузки формы добавления на тех. осмотра...</p>
        }
    };

    return (
        isAuthenticated ? (
            (!techInspections && !techInspectionRequests && !user &&
            !cars && !carModels &&!empls) ? (
                <div>Ожидание загрузки данных</div>
            ) : (
                <section>
                  <Row className="mt-3 justify-content-md-center">
                        <Fragment>
                            <Col xs="5">
                                {renderList()}
                            </Col>
                            {(user.user.is_tech_inspector ||
                            user.user.is_sales_director ||
                            user.user.is_superuser) ? (
                                <Col xs="3">
                                    {renderCreate()}
                                </Col>
                            ) : (
                                <></>
                            )}
                        </Fragment>
                    </Row>  
                </section>
            )
        ) : (
            <div>Страница не найдена</div>
        )
    );
};

export default TechInspections;