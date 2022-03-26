import React, { 
    Fragment, useState, useEffect, useCallback 
} from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { CreateTechInpectionRequest } from "../../components/tech-inspection-requests/techInspRequest-create";
import { TechInpectionRequestsList } from "../../components/tech-inspection-requests/techInspRequest-list";

import { 
    retriveCars, carsSelector 
} from "../../slices/carSlice";
import { 
    getAllCarModels, carModelsSelector } from "../../slices/carModelsSlice";
import { 
    fetchEmplData, retriveEmplData, employeeSelector 
} from "../../slices/employeeSlice";
import { 
    getAllTechInspections, techInspectionSelector
} from "../../slices/techInspectionSlice";
import { 
    getAllTechInspectionRequests, techInspectionRequestSelector 
} from "../../slices/techInspectionRequestSlice";
import { 
    userSelector, getUserDetails 
} from "../../slices/userSlice";

const TechInspectionRequests = () => {
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
        await dispatch(getUserDetails());
    }, [dispatch]);

    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const renderTechInspectionRequestList = () => {
        if (
            techInspectionRequests && user && cars && 
            carModels && empls && techInspections
        ) {
            return <TechInpectionRequestsList 
                techInspRequests={techInspectionRequests} 
                user={user.user}
                cars={cars}
                carModels={carModels}
                empls={empls}
                techInspections={techInspections}
            />;
        } else {
            return <p>Ожидание загрузки списка заявок на тех. осмотры...</p>
        }
    };

    const renderCreateTechInpectionRequest = () => {
        if (
            user && cars && carModels
        ) {
            return <CreateTechInpectionRequest 
                user={user.user}
                cars={
                    Array.isArray(cars) && cars
                        .filter(car => car.status === 1)
                } 
                carModels={carModels} 
            />;
        } else {
            return <p>Ожидание загрузки формы добавления заявки на тех. осмотр...</p>
        }
    };

    return (
        <section>
            {(isAuthenticated) ? (
                (!techInspectionRequests && !user && !cars && 
                !carModels && !empls && !techInspections) ? (
                    <div>Ожидание загрузки данных</div>
                ) : (
                    <Row className="mt-3 justify-content-md-center">
                        <Fragment>
                            <Col xs lg="6">
                                {renderTechInspectionRequestList()}
                            </Col>
                            <Col xs lg="4">
                                {renderCreateTechInpectionRequest()}
                            </Col>
                        </Fragment>
                    </Row>
                )
            ) : (
                <h6>У вас нет прав доступа к этой странице</h6>
            )} 
        </section>
    );
};

export default TechInspectionRequests;