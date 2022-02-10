import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import { userSelector, retriveUserData } from "../../slices/userSlice";

const CarDetail = ({ car, carModel, stock, arrivalType }) => { // 
    const { isAuthenticated, is_superuser, is_sales_director, is_puchase_manager } = useSelector(userSelector);
    
    return (
        <Fragment>
            {/* add styles... */}
            <div style={{textAlign: "left"}}> 
                <h3 className="mb-3" style={{textAlign: "center"}}>
                    {`${car.VIN} ${carModel.brand} ${carModel.model} ${carModel.year} в комплектации ${carModel.package_name}`}
                </h3>
                <img src={carModel.main_photo} className="mb-3"/>
                {/* <h5>Статус - {something.status}</h5> */}
                <p>Цена автомобиля - {car.price} руб.</p>
                {isAuthenticated && (
                    <p>Базовая цена модели - от {carModel.base_price} руб.</p>
                )}
                <p>Описание модели: <span>{carModel.model_descr}</span></p>
                {isAuthenticated && (
                    <div className="">
                        <p>Стоимость приобретения - {stock.purchase_value} руб.</p>
                        <p>Тип поступления - {arrivalType.name}</p>
                        <p>Дата поступления - {stock.arrival_date}</p>
                    </div>
                    // <p>Установлены допополнительные опции - {something.add_option_id}</p>
                    
                    // <p>Дата продажи - {something.date}</p>
                    // <p>Стоимость продажи - {something.date}</p>
                    // <p>Примечание продажи - {something.date}</p>
                )}
                <p>Пробег - {stock.millage} км.</p>
                <p>Год выпуска - {carModel.year}</p>
                {car.note && (
                    <p>Примечание - {car.note}.</p>
                )}
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

export default CarDetail;