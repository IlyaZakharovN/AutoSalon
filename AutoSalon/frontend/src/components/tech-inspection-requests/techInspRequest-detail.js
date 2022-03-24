import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const TechInpectionRequestDetail = ({
    techInspRequest, empl, car,
    carModels, techInspection
}) => {
    return (
        <Fragment>
            <h4 className="mb-3" style={{textAlign: "center"}}>
                {`Заявка на тех. осмотр №${techInspRequest.id} от ${new Date(techInspRequest.date).toLocaleDateString()}`}
            </h4>
            
            <div style={{textAlign: "left"}} className="info">
                {Array.isArray(car) && car.map(car => (
                    Array.isArray(carModels) && carModels
                    .filter(carModel => carModel.id === car.model_id)
                    .map(carModel => (
                        <Fragment>
                            {techInspection.length ? (
                                <p>Тех. осмотр
                                    <span>{` - `}
                                        <Link to={`/tech-inspections/${techInspection.id}`}>
                                            {techInspection.end_date ? (
                                                `закончен ${techInspection.end_date.toLocaleDateString()}`
                                            ) : (
                                                `начат ${techInspection.start_date.toLocaleDateString()}`
                                            )}
                                        </Link>
                                    </span>
                                </p>
                            ) : (
                                <p className="attention">
                                    Тех. осмотр по данной заявке еще не был начат.
                                </p>
                            )}
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
                            <p>Заявка оставлена
                                <span>
                                    {Array.isArray(empl) && empl
                                        .map(empl => (
                                            `- ${empl.name}, ${empl.email}`
                                        ))
                                    }
                                </span>
                            </p>
                            <p>Причина регистрации заявки
                                <span>
                                    {` - ${techInspRequest.reason}`}
                                </span>
                            </p>
                        </Fragment>
                    ))
                ))}
            </div>

        </Fragment>
    );
};