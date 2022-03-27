import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { DeleteTechInspection } from "../../components/tech-inspection/tech-inspection-delete";
import { DetailizeTechInpection } from "../../components/tech-inspection/tech-inspection-detail";
import { UpdateTechInpection } from "../../components/tech-inspection/tech-inspection-patch";

import { 
    retriveCars, 
    carsSelector 
} from "../../slices/carSlice";
import { 
    getAllCarModels, 
    carModelsSelector 
} from "../../slices/carModelsSlice";
import { 
    fetchEmplData, 
    retriveEmplData, 
    employeeSelector 
} from "../../slices/employeeSlice";
import { 
    fetchTechInspection, 
    techInspectionSelector
} from "../../slices/techInspectionSlice";
import { 
    getAllTechInspectionRequests, 
    techInspectionRequestSelector 
} from "../../slices/techInspectionRequestSlice";
import { 
    userSelector, 
    getUserDetails 
} from "../../slices/userSlice";

const TechInspection = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const { user, isAuthenticated } = useSelector(userSelector);
    const cars = useSelector(carsSelector);
    const carModels = useSelector(carModelsSelector);
    const empls = useSelector(employeeSelector);
    const techInspection = useSelector(techInspectionSelector);
    const techInspectionRequests = useSelector(techInspectionRequestSelector);

    const initFetch = useCallback(async() => {
        await dispatch(getAllCarModels());
        await dispatch(retriveCars());
        await dispatch(fetchTechInspection(params.id));
        await dispatch(getAllTechInspectionRequests());
        await dispatch(retriveEmplData());
    }, [dispatch]);

    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const renderDetail = () => {
        if (
            techInspection && techInspectionRequests && empls &&
            cars && carModels
        ) {
            return <DetailizeTechInpection
                techInspection={techInspection}
                techInspectionRequest={
                    Array.isArray(techInspectionRequests) &&
                    techInspectionRequests
                        .filter(tir => tir.id == techInspection.request)
                }
                empl={
                    Array.isArray(empls) && empls
                        .filter(empl => empl.id == techInspection.inspector)
                }
                car={
                    Array.isArray(cars) && cars
                        .filter(car => car.VIN == techInspection.VIN)
                }
                carModels={carModels}
            />
        }
    };

    const renderUpdate = () => {
        if (
            techInspection && techInspectionRequests && user && 
            cars && carModels
        ) {
            return <UpdateTechInpection
                techInspection={techInspection}
                techInspectionRequest={
                    Array.isArray(techInspectionRequests) &&
                    techInspectionRequests
                        .filter(tir => tir.id == techInspection.request)
                }
                user={user.user}
                cars={cars}
                carModels={carModels}
                empls={
                    Array.isArray(empls) && empls
                        .filter(empl => (
                            empl.is_tech_inspector ||
                            empl.is_sales_director
                        ))
                }
            />
        } else {
            return <p>Ожидание загрузки формы обновления...</p>
        }
    };

    const renderDelete = () => {
        if (
            techInspection && techInspectionRequests && cars
        ) {
            return <DeleteTechInspection
                techInspection={techInspection}
                techInspectionRequest={
                    Array.isArray(techInspectionRequests) &&
                    techInspectionRequests
                        .filter(tir => tir.id == techInspection.request)
                }
                car={
                    Array.isArray(cars) && cars
                        .filter(car => car.VIN == techInspection.VIN)
                }

            />
        } else {
            return <p>Ожидание загрузки функции удаления...</p>
        }
    };

    return (
        isAuthenticated ? (
            (!techInspection && !techInspectionRequests && !user &&
            !cars && !carModels && !empls) ? (
                <div>Ожидание загрузки данных</div>
            ) : (
                <section>
                    <Row className="mt-3 justify-content-md-center">
                        <Col xs lg="6">
                            {renderDetail()}
                        </Col>
                        {((user.user.is_tech_inspector &&
                        user.user.id === techInspection.inspector) ||
                        user.user.is_sales_director ||
                        user.user.is_superuser) ? (
                            <Col xs lg="4">
                                {renderUpdate()}

                                <div className="mt-3"> 
                                    {renderDelete()}
                                </div>
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

export default TechInspection;