import React, { Fragment } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// import SingleCarModelUpdate from "./crud";
import "bootstrap/dist/css/bootstrap.min.css";
import { userSelector, retriveUserData } from "../../slices/userSlice";

const SingleCarModel = ({ singleCarModel }) => {
    const { isAuthenticated, is_superuser, is_sales_director, is_puchase_manager } = useSelector(userSelector);

    return (
        <Fragment>
            {/* <Breadcrumb>
                <Breadcrumb.Item href="/carmodels/">Каталог</Breadcrumb.Item>
            </Breadcrumb> */}
            <div>
                <h2>{singleCarModel.brand + " " + singleCarModel.model + " " + singleCarModel.year}</h2>
                <img src={singleCarModel.main_photo}/>
                <p>{singleCarModel.model_descr}</p>
                <p>Цена - {singleCarModel.price} руб.</p>
                <p>Год выпуска - {singleCarModel.year}</p>
                <p>Кузов - {singleCarModel.body}</p>
                <p>Объем двигателя - {singleCarModel.engine_volume} л.</p>
                <p>Мощность двигателя - {singleCarModel.engine_power} л.с.</p>
                <p>Вид топлива - {singleCarModel.fuel_type}</p>
                <p>Коробка передач - {singleCarModel.transmission_type}</p>
                <p>Привод - {singleCarModel.drive_unit}</p>
                <p>Комплектация - {singleCarModel.package_name}</p>
                <p>Спецификация комплектации:<br />{singleCarModel.package_descr}</p>
                {/* <p>{singleCarModel.package_descr}</p> */}
            </div>
        </Fragment>
    );
};

export default SingleCarModel;