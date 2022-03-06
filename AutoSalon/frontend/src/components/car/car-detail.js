import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import { userSelector, retriveUserData } from "../../slices/userSlice";

const CarDetail = ({ car, carModel, stock, arrivalType, user, isAuthenticated }) => { // 
    // const { isAuthenticated, is_superuser, is_sales_director, is_puchase_manager } = useSelector(userSelector);
    console.log(arrivalType);
    
    return (
        <Fragment>
            {/* add styles... */}
            <div style={{textAlign: "left"}}> 
            {Array.isArray(carModel) && carModel.map((model, index) => (
                <Fragment>
                    <h3 className="mb-3" style={{textAlign: "center"}}>
                        {`${car.VIN} ${model.brand} ${model.model} ${model.year} в комплектации ${model.package_name}`}
                    </h3>
                    <img src={model.main_photo} className="mb-3"/>
                    {/* <h5>Статус - {something.status}</h5> */}
                    <p>Цена автомобиля - {car.price} руб.</p>
                    {isAuthenticated && (
                        <p>Базовая цена модели - от {model.base_price} руб.</p>
                        )}
                    <p>Описание модели: <span>{model.model_descr}</span></p>
                    {isAuthenticated && (
                        <div className="">
                        <p>Стоимость приобретения - {stock[0].purchase_value} руб.</p>
                        <p>Тип поступления - {arrivalType[0].name}</p>
                        <p>Дата поступления - {stock[0].arrival_date}</p>
                        </div>
                        // <p>Установлены допополнительные опции - {something.add_option_id}</p>
                        
                        // <p>Дата продажи - {something.date}</p>
                        // <p>Стоимость продажи - {something.date}</p>
                        // <p>Примечание продажи - {something.date}</p>
                        )}
                        <p>Пробег - {stock.millage} км.</p>
                        <p>Год выпуска - {model.year}</p>
                        {car.note && (
                            <p>Примечание - {car.note}.</p>
                            )}
                        <p>Кузов - {model.body}</p>
                        <p>Объем двигателя - {model.engine_volume} л.</p>
                        <p>Мощность двигателя - {model.engine_power} л.с.</p>
                        <p>Вид топлива - {model.fuel_type}</p>
                        <p>Коробка передач - {model.transmission_type}</p>
                        <p>Привод - {model.drive_unit}</p>
                        <p>Комплектация - {model.package_name}</p>
                        <p>Спецификация комплектации:<br />{model.package_descr}</p>
                </Fragment>
            ))}
            </div>
        </Fragment>
    );
};

export default CarDetail;