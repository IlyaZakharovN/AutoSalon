import React, { Fragment } from "react";
import { Breadcrumb, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import { userSelector, retriveUserData } from "../../slices/userSlice";

const CarModelDetail = ({ carModel, carModelsPhotos }) => {
    return (
        <Fragment>
            {/* <Breadcrumb>
                <Breadcrumb.Item href="/carmodels/">Каталог</Breadcrumb.Item>
            </Breadcrumb> */}
            <div style={{textAlign: "left"}}>
                <h2 className="mb-3" style={{textAlign: "center"}}>{`${carModel.brand} ${carModel.model} ${carModel.year} в комплектации ${carModel.package_name}`}</h2>
                <img src={carModel.main_photo}/>

                <p>{carModel.model_descr}</p>
                <p>Цена - от {carModel.base_price} руб.</p>
                <p>Год выпуска - {carModel.year}</p>
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

export default CarModelDetail;