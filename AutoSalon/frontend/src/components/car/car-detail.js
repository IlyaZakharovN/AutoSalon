import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

const CarDetail = ({ car, carModel }) => {
    const { isAuthenticated, is_superuser, is_sales_director, is_puchase_manager } = useSelector(userSelector);

    return (
        <Fragment>
            <div>
                <h2>{car.VIN + " " + carModel.brand + " " + carModel.model + " " + carModel.year}</h2>
                <img src={carModel.main_photo}/>
                {/* <h5>Статус - {something.status}</h5> */}
                <p>Цена автомобиля - {car.price} руб.</p>
                <p>Базовая цена модели - от {carModel.base_price} руб.</p>
                {/* <p>Стоимость приобретения - {something.purchase_value}</p> */}
                {/* <p>Тип поступления - {something.name}</p> */}
                {/* <p>Пробег - {something.millage}</p> */}
                {/* <p>Дата поступления - {something.arrival_date}</p> */}
                <p>Год выпуска - {carModel.year}</p>
                <p>Примечание - {car.note} руб.</p>
                <p>Кузов - {carModel.body}</p>
                <p>Объем двигателя - {carModel.engine_volume} л.</p>
                <p>Мощность двигателя - {carModel.engine_power} л.с.</p>
                <p>Вид топлива - {carModel.fuel_type}</p>
                <p>Коробка передач - {carModel.transmission_type}</p>
                <p>Привод - {carModel.drive_unit}</p>
                <p>Комплектация - {carModel.package_name}</p>
                <p>Спецификация комплектации:<br />{carModel.package_descr}</p>
            </div>
        </Fragment>
    );
};