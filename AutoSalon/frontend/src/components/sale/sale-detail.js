import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { userSelector } from "../../slices/userSlice";

const SaleDetail = ({ sale, car, carModel, purch_type, addOptions, empl }) => {
    // const dispatch = useDispatch();
    // console.log(sale);
    // console.log(car);
    // console.log(carModel);
    // console.log(purch_type);
    // console.log(addOptions);
    // console.log(empl);

    // const installed = Object.entries(addOptions).filter(([key, value]) => value.id === sale.add_option_id);
    // console.log(installed);

    return (
        <Fragment>
            <div style={{textAlign: "left"}}>
                <h3 className="mb-3" style={{textAlign: "center"}}>
                    {`Акт продажи №${sale.id}: ${sale.date}, ${sale.VIN}`}
                </h3>
                <img src={carModel.main_photo} className="mb-3"/>
                <p>{`Продавец: ${empl.name}, id-${sale.seller}, ${empl.email}`}</p>
                <p>{`Дата продажи - ${sale.date}`}</p>
                <p>
                    {`Автомобиль - `}
                    <Link to={`car/${car.VIN}`}>
                        {`${carModel.brand} ${carModel.model} ${carModel.year} ${car.VIN}`}
                    </Link>
                </p>
                <p>{`Стоимость продажи - ${sale.sale_price}`}</p>
                <p>{`Тип приобретения - ${purch_type.name}`}</p>
                {/* <p>{`Покупатель - ${customer.last_name} ${customer.first_name} ${customer.patronymic}`}</p> */}
                <p>{`Серия и номер пасспорта покупателя - ${sale.customer_passport}`}</p>
                <p>
                    {`Дополнительное оборудование - `} {addOptions ? (
                        <span>{`установлены:`}
                        {/* {{for (i in sale.add_option_id) {
                            <Link to={`add-options/${sale.add_option_id[i]}`}>
                                {addOptions.name}
                            </Link>
                        }}} */}
                        {/* {addOptions && Object.fromEntries(Object
                            .entries(addOptions)
                            .map(([key, { value }]) => [key, value])
                            // .filter(add => add.id === sale.add_option_id)
                            // .map((add, index) => {
                            // <>{add.name}
                            // <Link to={`add-options/${add.id}`} key={add.id}>
                            //     {add.name}
                            // </Link></>
                        )} */}
                        </span>
                    ) : (
                        <span>{`не установлены.`}</span>
                    )}
                </p>
                <p>
                    {`Примечание продажи - `} {sale.note ? (
                        <span>{`${sale.note}`}</span>
                    ) : (
                        <span>{`не указано.`}</span>
                    )}
                </p>
            </div>
        </Fragment>
    );
};

export default SaleDetail;