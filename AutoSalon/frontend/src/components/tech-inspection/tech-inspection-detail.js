import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { handlePDFDownload } from "../../http-common";

export const DetailizeTechInpection = ({
    techInspection, techInspectionRequest, empl,
    car, carModels
}) => {
    return (
        <Fragment>
            <h4 className="mb-3" style={{textAlign: "center"}}>
                {`Тех. осмотр №${techInspection.id}`}
            </h4>

            <div style={{textAlign: "left"}} className="info">
                {Array.isArray(car) && car.map(car => (
                    Array.isArray(carModels) && carModels
                        .filter(carModel => carModel.id === car.model_id)
                        .map(carModel => (
                            <p>Автомобиль 
                                <span>{` - `}
                                    <Link to={`/car/${car.VIN}`}>
                                        {`${car.VIN}, ${carModel.brand} 
                                        ${carModel.model} ${carModel.year}
                                         в комплектации ${carModel.package_name}`}
                                    </Link>
                                </span>
                                <img src={carModel.main_photo} className="mb-3"/>
                            </p>
                        ))
                ))}

                {techInspectionRequest.length ? (
                    <p>Тех. осмотр проводится по заявке
                        <span>{` - `}
                            <Link to={`/tech-inspection-requests/${techInspectionRequest[0].id}`}>
                                {`№${techInspectionRequest[0].id}
                                от ${new Date(techInspectionRequest[0].date)
                                    .toLocaleDateString()}`}
                            </Link>
                        </span>
                    </p>
                ) : (
                    <></>
                )}

                <p>Ответственный за тех. осмотр
                    {empl.length ? (
                        <span>{` - ${empl[0].name}, ${empl[0].email}`}</span>
                    ) : (
                        <></>
                    )}
                </p>

                <p>Дата начала
                    <span>
                        {` - ${new Date(techInspection.start_date).toLocaleDateString()}`}
                    </span>
                </p>

                <p>Дата окончания
                    <span>
                        {` - `}{techInspection.end_date ? (
                            `${new Date(techInspection.end_date).toLocaleDateString()}`
                        ) : (
                            `тех. осмотр не закончен.`
                        )}
                    </span>
                </p>

                {techInspection.conclusion_file ? (
                    <p>
                        {/* <Link
                            onClick={() => handlePDFDownload(`${String(techInspection.conclusion_file).slice(22)}`)}
                        >{techInspection.conclusion_file}</Link> */}
                    </p>
                ) : (
                    <></>
                )}

            </div>
        </Fragment>
    );
};