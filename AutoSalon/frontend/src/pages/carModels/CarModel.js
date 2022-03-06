import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CarModelDelete from "../../components/carModels/carModel-delete";
import CarModelDetail from "../../components/carModels/carModel-detail";
import CarModelUpdate from "../../components/carModels/carModel-patch";
import CarModelPhotosUpload from "../../components/carModels/carModelPhotos-upload";
import { getAllCarModels, fetchCarModel, carModelsSelector } from "../../slices/carModelsSlice";
import { userSelector, retriveUserData, isAuthenticated } from "../../slices/userSlice";
import { carModelPhotosSelector, getAllCarModelPhotos } from "../../slices/carModelPhotosSlice";

const CarModel = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const carModel = useSelector(carModelsSelector);
    const carModelPhotos = useSelector(carModelPhotosSelector);
    const { user, isAuthenticated } = useSelector(userSelector);

    const initFetch = useCallback(async() => {
        const id = params.id;
        await dispatch(fetchCarModel(id));
        await dispatch(getAllCarModelPhotos())
    }, [dispatch, params.id]);

    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const renderCarModelDetail = () => {
        if (carModel && carModelPhotos) {
            return <CarModelDetail 
                carModel={carModel} 
                carModelsPhotos={Array.isArray(carModelPhotos) && carModelPhotos
                    .filter(photo => photo.model_id === carModel.id)
                }
            />
        } else {
            return <p>Ожидание загрузки информации об автомобиле...</p>
        }
    };

    const renderCarModelUpdate = () => {
        if (carModel && carModelPhotos) {
            return <CarModelUpdate carModel={carModel}/>
        } else {
            return <p>Ожидание загрузки формы обновления...</p>
        }
    };

    const renderDeleteFeature = () => {
        if (carModel && carModelPhotos) {
            return <CarModelDelete carModel={carModel} />
        } else {
            return <p>Ожидание загрузки функции удаления...</p>
        }
    };

    const renderCarModelPhotoUpload = () => {
        if (carModel) {
            return <CarModelPhotosUpload carModel={carModel}/>
        } else {
            return <p>Ожидание загрузки формы добавления изображений...</p>
        }
    };

    return (
        (!carModel && !carModelPhotos) ? (
            <div>Ожидание загрузки данных</div>
        ) : (
            <section>
                <Row className="mt-3 justify-content-md-center">
                    { isAuthenticated && (user.user.is_superuser || user.user.is_sales_director || user.user.is_puchase_manager) ? (
                        <Fragment>
                            <Col xs lg="6">
                                {renderCarModelDetail()}
                            </Col> 
                            <Col xs lg="4">
                                {renderCarModelUpdate()}
                                <div className="mt-5">
                                    {renderCarModelPhotoUpload()}
                                </div>
                                {user.user.is_superuser || user.user.is_sales_director ? (
                                    <div className="mt-5"> 
                                        {renderDeleteFeature()}
                                    </div>
                                ) : (<></>)}
                            </Col>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Col xs lg="6">
                                {renderCarModelDetail()}
                            </Col>
                        </Fragment>
                    )}
                </Row>
            </section>
        )
    );
};

// const CarModel = (props) => {
//     const initialCarModelState = {
//         id: null,
//         brand: "",
//         model: "",
//         year: null,
//         body: "",
//         engine_volume: "",
//         engine_power: null,
//         fuel_type: "",
//         transmission_type: "",
//         drive_unit: "",
//         package_name: "",
//         package_descr: "",
//         price: "",
//         main_photo: "",
//         model_descr: ""
//     };

//     const [currentCarModel, setCurrentCarModel] = useState(initialCarModelState);
//     // const [message, setMessage] = useState(""); // for displaying messages during updating, creating, deleting
//     const dispatch = useDispatch();
//     const params = useParams();

//     const getCarModel = id => {
//         CarModelDataService.getCarModel(id).then(
//             response => {
//                 console.log(id);
//                 setCurrentCarModel(response.data);
//                 console.log(response.data);
//                 // console.log({...currentCarModel, [currentCarModel.brand]: response.data.brand});
//             }).catch(e => {
//                 console.log(e);
//             });
//     };

//     useEffect(() => {
//         dispatch(getCarModel(params.id));
//         // console.log(currentCarModel);
//     }, [dispatch]);

//     // for editing, add later:
//     // const handleInputChange = event => {
//     //     const { name, value } = event.target;
//     //     setCurrentCarModel({ ...currentCarModel, [name]: value });
//     // };

//     // get CarModels:
//     // const initFetch = useCallback(() => {
//     //     dispatch(getCarModel(params.id));
//     // }, [dispatch])

//     // useEffect(() => {
//     //     initFetch()
//     // }, [initFetch])
//     // end get Carmodels

//     return (
//         <div>
//             {currentCarModel ? (
//                 <p></p>
//             ) : (
//                 <div>
//                     <br/>
//                     <p>Выберите модель автомобиля...</p>
//                 </div>
//             )}
//         </div>
//     );
// };

export default CarModel;