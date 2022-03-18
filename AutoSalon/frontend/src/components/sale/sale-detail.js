import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { userSelector } from "../../slices/userSlice";

const SaleDetail = ({ 
        sale, car, carModels, 
        purch_type, addOptions, empls, 
        saleType, saleStatus 
    }) => {
    // console.log(Object.values(sale.add_option_id));

    return (
        <Fragment>
            {Array.isArray(empls) && empls
                .filter(empl => empl.id === sale.seller)
                .map((empl) => (
                    Array.isArray(car) && car
                        .map((car) => (
                            Array.isArray(carModels) && carModels
                                .filter(carModel => carModel.id === car.model_id)
                                .map((carModel) => (
                                    <div style={{textAlign: "left"}}>
                                        <h3 className="mb-3" style={{textAlign: "center"}}>
                                            {`Акт продажи №${sale.id}: ${sale.date}, ${sale.VIN}`}
                                        </h3>
                                        <img src={carModel.main_photo} className="mb-3"/>

                                        <div className="info">
                                            <p>Продавец:
                                                <span>{` ${empl.name}, id-${sale.seller}, ${empl.email}`}</span>
                                            </p>
                                            <p>Дата продажи - 
                                                <span>{` ${sale.date}`}</span>
                                            </p>
                                            <p key={carModel.id}>{`Автомобиль`}
                                                <span>{` - `}
                                                    <Link to={`/car/${car.VIN}/`}>
                                                        {` ${carModel.brand} ${carModel.model} ${carModel.year} ${car.VIN}`}
                                                    </Link>
                                                </span>
                                            </p>
                                            <p>Стоимость продажи
                                                <span>{` - ${sale.sale_price} руб.`}</span>
                                            </p>
                                            <p>Тип приобретения
                                                <span>{` - ${purch_type[0].name}`}</span>
                                            </p>
                                            <p>Тип продажи
                                                <span>{` - ${saleType[0].name}`}</span>
                                            </p>
                                            <p>Статус продажи
                                                <span>{` - ${saleStatus[0].name}`}</span>
                                            </p>
                                            <p>Информация о покупателе
                                                <span>{` - ${sale.customer_info}`}</span>
                                            </p>
                                            <p>
                                                {`Дополнительное оборудование`} {(Object.keys(sale.add_option_id).length) ? (
                                                    <span>{` - установлены:`}
                                                        {Array.isArray(Object.values(sale.add_option_id)) && Object.values(sale.add_option_id)
                                                            .map((addOpt, index) => (
                                                                Array.isArray(addOptions) && addOptions
                                                                .filter(addOption => addOption.id === addOpt)
                                                                .map((addOption, index) => (
                                                                    <span key={addOpt}><br/>
                                                                    <Link to={`/add-options/${addOption.id}`} >{`${addOption.name} (${addOption.price} руб.)`}</Link>
                                                                    </span>
                                                                ))    
                                                            ))
                                                        }
                                                    </span>
                                                ) : (
                                                    <span>{`не установлены.`}</span>
                                                )}
                                            </p>
                                            <p>
                                                {`Примечание продажи`} {sale.note ? (
                                                    <span>{` - ${sale.note}`}</span>
                                                ) : (
                                                    <span>{` - не указано.`}</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ))
                        ))
                ))    
            }
        </Fragment>
    );
};

export default SaleDetail;