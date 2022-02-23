import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import { userSelector } from "../../slices/userSlice";

export const TestDriveDetail = ({ testdrives, testDriveStatuses, cars, carModels, empls, purposes, user }) => {
    return (
        <Fragment>
            <h3 className="mb-3" style={{textAlign: "center"}}>
                {`Тест драйв №${testdrives.id}, ${testdrives.date_time}`}
            </h3>

            <div style={{textAlign: "left"}}>
                {(testDriveStatuses) && testDriveStatuses
                    .filter(tds => tds.id === testdrives.status)
                    .map((tds, index) => (
                        <Fragment>
                            <p>Статус - {tds.name}</p>
                            {(tds.id === 2 ? (
                                <Fragment>
                                    <p>Предполагаемые дата и время проведения - {testdrives.date_time}</p>
                                    <p>Необходимо назначить ответсвенного за проведение</p>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <p>Установленные дата и время проведения - {testdrives.date_time}</p>
                                    <p>Отвественный за проведение - {empls[0].name}</p>
                                </Fragment>
                            ))
                            }
                            <p>Имя клиента - {testdrives.client_name}</p>
                            <p>Номер телефона клиента - {testdrives.client_phone}</p>
                            <p>Автомобиль:</p>
                            <img src={carModels.main_photo} className="mb-3"/>
                            <p>{cars.VIN}, {carModels.brand} {carModels.model} {carModels.year} в комплектации {carModels.package_name}</p>
                        </Fragment>
                        // <p>Дата</p>
                ))}

                {/* <p>Дата - {`${}`}</p> */}
                
            </div>
        </Fragment>
    );
};