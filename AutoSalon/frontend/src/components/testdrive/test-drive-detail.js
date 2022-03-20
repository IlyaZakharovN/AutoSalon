import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const TestDriveDetail = ({ 
    testdrives, testDriveStatuses, cars, 
    carModels, empls, user 
}) => {
    // console.log(empls);

    return (
        <Fragment>
            <h3 className="mb-3" style={{textAlign: "center"}}>
                {`Тест драйв №${testdrives.id} - ${new Date(testdrives.date_time).toLocaleString()}`}
            </h3>

            <div style={{textAlign: "left"}} className="info">
                {Array.isArray(cars) && cars.map(car => (
                    Array.isArray(carModels) && carModels
                        .filter(carModel => carModel.id === car.model_id)
                        .map(carModel => (                   
                            Array.isArray(testDriveStatuses) && testDriveStatuses
                                .filter(tds => tds.id === testdrives.status)
                                .map((tds, index) => (
                                    <Fragment>
                                        <p>Статус 
                                            <span> - {tds.name}</span>
                                        </p>
                                        {(tds.id === 2 ? (
                                            <Fragment>
                                                <p>Предполагаемые дата и время проведения
                                                    <span> - {new Date(testdrives.date_time).toLocaleString()}</span>
                                                </p>
                                                <p className="attention">
                                                    Необходимо назначить ответственного за проведение
                                                </p>
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <p>Установленные дата и время проведения 
                                                    <span> - {new Date(testdrives.date_time).toLocaleString()}</span>
                                                </p>
                                                <p>Отвественный за проведение 
                                                    <span> - {empls[0].name}</span>
                                                </p>
                                            </Fragment>
                                        ))}
                                        <p>Имя клиента 
                                            <span> - {testdrives.client_name}</span>
                                        </p>
                                        <p>Номер телефона клиента
                                            <span> - {testdrives.client_phone}</span>
                                        </p>
                                        <p>Автомобиль:</p>
                                        <img src={carModel.main_photo} className="mb-3"/>
                                        <Link to={`/car/${car.VIN}`}>
                                            {car.VIN}, {carModel.brand} {carModel.model} {carModel.year} в комплектации {carModel.package_name}
                                        </Link>
                                    </Fragment>
                                ))
                        ))
                ))}
            </div>
        </Fragment>
    );
};