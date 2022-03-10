import React, { Fragment } from "react";
import { Breadcrumb, Carousel, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import { userSelector, retriveUserData } from "../../slices/userSlice";

const CarDetail = ({ 
    car, carModel, stock, 
    arrivalType, user, isAuthenticated, 
    carStatus, purpose, carPhotos, 
    carModelPhotos }) => { // 
    console.log(carModelPhotos);
    
    return (
        <Fragment>
            {/* add styles... */}
            <div style={{textAlign: "left"}}> 
            {Array.isArray(carModel) && carModel.map((model, index) => (
                <Fragment>
                    {isAuthenticated ? (
                        <h3 className="mb-3" style={{textAlign: "center"}}>
                            {`${car.VIN} ${model.brand} ${model.model} ${model.year} в комплектации ${model.package_name}`}
                        </h3>
                    ) : (
                        <h3 className="mb-3" style={{textAlign: "center"}}>
                            {`${model.brand} ${model.model} ${model.year} в комплектации ${model.package_name}`}
                        </h3>
                    )}

                    <Row className="car-carModel" style={{textAlign: "center"}}>
                        <img src={model.main_photo} className="mb-3"/>
                    </Row>
                    
                    {isAuthenticated && (
                        <Fragment>
                            <h5>Статус - {carStatus[0].name}</h5>
                            <h5>Назначение - {purpose[0].name}</h5>
                        </Fragment>
                    )}
                    
                    <div className="info">
                        <p>Цена автомобиля - 
                            <span> {car.price} руб.</span>
                        </p>

                        {isAuthenticated && (
                            <p>Базовая цена модели  
                                <span> - от {model.base_price} руб.</span>
                            </p>
                        )}

                        <p>Описание модели: <span>{model.model_descr}</span></p>
                    

                    {isAuthenticated && (
                        <div className="info">
                            <p>Стоимость приобретения - 
                                <span> {stock[0].purchase_value} руб.</span>
                            </p>
                            <p>Тип поступления - 
                                <span> {arrivalType[0].name}</span>
                            </p>
                            <p>Дата поступления - 
                                <span> {stock[0].arrival_date}</span>
                            </p>
                        </div>
                        // <p>Установлены допополнительные опции - {something.add_option_id}</p>
                        
                        // <p>Дата продажи - {something.date}</p>
                        // <p>Стоимость продажи - {something.date}</p>
                        // <p>Примечание продажи - {something.date}</p>
                    )}

                        <p>Пробег - 
                            <span> {stock[0].millage} км.</span>
                        </p>
                        <p>Год выпуска - 
                            <span> {model.year} г.</span>
                        </p>
                        {car.note && (
                            <p>Примечание - 
                                <span> {car.note}.</span>
                            </p>
                        )}
                        <p>Кузов - 
                            <span> {model.body}</span>
                        </p>
                        <p>Объем двигателя - 
                            <span> {model.engine_volume} л.</span>
                        </p>
                        <p>Мощность двигателя - 
                            <span> {model.engine_power} л.с.</span>
                        </p>
                        <p>Вид топлива - 
                            <span> {model.fuel_type}</span>
                        </p>
                        <p>Коробка передач - 
                            <span> {model.transmission_type}</span></p>
                        <p>Привод - 
                            <span> {model.drive_unit}</span>
                        </p>
                        <p>Комплектация - 
                            <span> {model.package_name}</span>
                        </p>
                        <p>Спецификация комплектации:<br />
                            <span> {model.package_descr}</span>
                        </p>

                        {carPhotos.length ? (
                            <Row className="mt-5 mb-5">
                                {isAuthenticated ? (
                                    <h6 className="mb-3" style={{textAlign: "center"}}>
                                        {`Фото автомобиля ${car.VIN} ${model.brand} ${model.model} ${model.year} в комплектации ${model.package_name}`}
                                    </h6>
                                ) : (
                                    <h6 className="mb-3" style={{textAlign: "center"}}>
                                        {`Фото автомобиля ${model.brand} ${model.model} ${model.year} в комплектации ${model.package_name}`}
                                    </h6>
                                )}
                                <Carousel className="carousel-main">
                                    {Array.isArray(carPhotos) && carPhotos
                                        .map((photo, index) => (
                                            <Carousel.Item interval={2000} key={photo.id} className="carousel-item">
                                            <img 
                                                src={photo.photo}
                                                alt="Изображение автомобиля"
                                                />
                                            </Carousel.Item>
                                        ))
                                    }
                                </Carousel>
                            </Row>
                        ) : (<></>)}

                        {carModelPhotos.length ? (
                            <Row className="mt-5 mb-5">
                                <h6 className="mb-3" style={{textAlign: "center"}}>
                                    {`Фото модели автмобиля ${model.brand} ${model.model} ${model.year} в комплектации ${model.package_name}`}
                                </h6>
                                <Carousel className="carousel-main">
                                    {Array.isArray(carModelPhotos) && carModelPhotos
                                        .map((photo, index) => (
                                            <Carousel.Item interval={3000} key={photo.id} className="carousel-item">
                                            <img 
                                                src={photo.photo}
                                                alt="Изображение модели автомобиля"
                                                />
                                            </Carousel.Item>
                                        ))
                                    }
                                </Carousel>
                            </Row>
                        ) : (<></>)
                        }
                    </div>
                </Fragment>
            ))}
            </div>
        </Fragment>
    );
};

export default CarDetail;