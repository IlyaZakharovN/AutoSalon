import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { TechInpectionRequestDetail } from "../../components/tech-inspection-requests/techInspRequest-detail";
import { TechInpectionRequestUpdate } from "../../components/tech-inspection-requests/techInspectionRequest-patch";

import { 
    retriveCars, carsSelector 
} from "../../slices/carSlice";
import { 
    getAllCarModels, carModelsSelector 
} from "../../slices/carModelsSlice";
import { 
    fetchEmplData, retriveEmplData, employeeSelector 
} from "../../slices/employeeSlice";
import { 
    getAllTechInspections, techInspectionSelector
} from "../../slices/techInspectionSlice";
import { 
    getAllTechInspectionRequests, 
    fetchTechInspectionRequest,
    techInspectionRequestSelector 
} from "../../slices/techInspectionRequestSlice";
import { 
    userSelector, getUserDetails 
} from "../../slices/userSlice";

const TechInpectionRequest = () => {
    const dispatch = useDispatch();
    const params = useParams();

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
        // await dispatch(getAllTechInspectionRequests());
        await dispatch(fetchTechInspectionRequest(params.id));
        await dispatch(retriveEmplData());
    }, [dispatch]);

    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const renderDetail = () => {
        if (
            techInspectionRequests && empls && cars &&
            carModels && techInspections
        ) {
            // const theTIR = Array.isArray(techInspectionRequests) &&
            // techInspectionRequests
            //     .filter(tir => tir.id == params.id)[0];

            return <TechInpectionRequestDetail
                techInspRequest={techInspectionRequests}
                // empl={
                //     Array.isArray(empls) && empls
                //         .filter(empl => empl.id === theTIR.requester)
                // }
                empl={
                    Array.isArray(empls) && empls
                        .filter(empl => empl.id === techInspectionRequests.requester)
                }
                car={
                    Array.isArray(cars) && cars
                        .filter(car => car.VIN === techInspectionRequests.VIN)
                }
                carModels={carModels}
                techInspection={
                    Array.isArray(techInspections) && techInspections
                        .filter(tI => tI.request === techInspectionRequests.id)
                }
            />
        } else {
            return <p>Ожидание загрузки информации о заявке...</p>
        }
    };

    const renderUpdate = () => {
        if (
            techInspectionRequests && user && cars &&
            carModels && techInspections
        ) {
            return <TechInpectionRequestUpdate
                techInspRequest={techInspectionRequests}
                techInspection={
                    Array.isArray(techInspections) && techInspections
                        .filter(tI => tI.request === techInspectionRequests.id)
                }
                cars={
                    Array.isArray(cars) && cars
                        .filter(car => car.status === 1)
                }
                carModels={carModels}
            />
        } else {
            return <p>Ожидание загрузки формы обновления...</p>
        }
    };
    
    return (
        isAuthenticated ? (
            (!techInspectionRequests && !empls && !cars &&
            !carModels && !techInspections && !user) ? (
                <div>Ожидание загрузки данных</div>
            ) : (
                <section>
                    <Row className="mt-3 justify-content-md-center">
                        <Col xs lg="6">
                            {renderDetail()}
                        </Col>
                        {user.user.id === techInspectionRequests.requester ? (
                            <Col xs lg="4">
                                {renderUpdate()}
                            </Col>
                        ) : (
                            <></>
                        )}
                    </Row>
                </section>
            )
        ) : (
            <div>Страница не найдена</div>
        )
    );
};

export default TechInpectionRequest;