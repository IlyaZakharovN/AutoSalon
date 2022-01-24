import React, { useState, useEffect, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { retriveCarModels } from "../slices/carModelsSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const CarModelsList = () => {
    const [currentCarModel, setCurrentCarModel] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchCarModel, setSearchCarModel] = useState(""); // for searching, add later

    const carModels = useSelector(state => state.carModels);
    const dispatch = useDispatch();

    // get CarModels:
    const initFetch = useCallback(() => {
        dispatch(retriveCarModels());
    }, [dispatch])

    useEffect(() => {
        initFetch()
    }, [initFetch])
    // end get Carmodels

    const refreshData = () => {
        setCurrentCarModel(null);
        setCurrentIndex(-1);
    };

    const setActiveCarModel = (carModel, index) => {
        setCurrentCarModel(carModel);
        setCurrentIndex(index);
    };

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>Модели автомобилей</h4>
                <ul>
                    {carModels && carModels.map((carModel, index) =>(
                        <li 
                            className={"list-group item " + (index === currentIndex ? "active" : "")}
                            onClick={() => setActiveCarModel(carModel, index)}
                            key={index}
                        >
                            <a href="#">{carModel.brand + " " + carModel.model + " " + carModel.year}</a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="col-md-6">
                {currentCarModel ? (
                    <div>
                        <h4>Выбранная модель автомобиля:</h4>
                        <div>
                            <label>
                                <strong>{currentCarModel.model}:</strong>
                                {/* <strong>{currentCarModel.main_photo}:</strong> */} {/* add photo display */}
                            </label>
                        </div>
                        <div>
                            <Link 
                                to={"/carmodels/" + currentCarModel.id}
                                className=""
                            >
                                Просмотреть подробнее
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Выберите модель автомобиля...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarModelsList;



// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// import { retriveCarModels } from "../actions/carmodelsActions";

// const CarModelsList = () => {
//     const [currentCarModel, setCurrentCarModel] = useState(null);
//     const [currentIndex, setCurrentIndex] = useState(-1);
//     const [searchCarModel, setSearchCarModel] = useState(""); // for searching, add later

//     const carmodels = useSelector(state => state.carmodels);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(retriveCarModels());
//         console.log('dispatched')
//     }, []);

//     // const onChangeSearchCarModel ...

//     const refreshData = () => {
//         setCurrentCarModel(null);
//         setCurrentIndex(-1);
//     };

//     const setActiveCarModel = (carmodel, index) => {
//         setCurrentIndex(null);
//         setCurrentIndex(-1);
//     };
    
//     // const findBy...

//     return (
//         <div className="list row">
//             <div className="col-md-6">
//                 <h4>Модели автомобилей</h4>
//                 <ul className="list-group">
//                     <li>Qwe</li>
//                     {carmodels && carmodels.map((carmodel, index) => (
//                         <li
//                             className={"list-group-item " + (index === currentIndex ? "active" : "")}
//                             onClick={() => setActiveCarModel(carmodel, index)}
//                             key={index}
//                         >
//                             {carmodel.brand}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
            
//             <div className="col-md-6">
//                 {currentCarModel ? (
//                     <div>
//                         <h4>Модель автомобиля</h4>
//                         <div>
//                             <label>
//                                 <strong>Title:</strong>
//                             </label>{" "}
//                             {currentCarModel.brand}
//                         </div>
//                         <div>
//                             <label>
//                                 <strong>Description:</strong>
//                             </label>{" "}
//                             {currentCarModel.model}
//                         </div>
//                         <div>
//                             {/* <label>
//                                 <strong>Status:</strong>
//                             </label>{" "}
//                             {currentCarModel.published ? "Published" : "Pending"} */}
//                         </div>

//                         {/* <Link
//                         to={"/carmodels/" + currentCarModel.id}
//                         className="badge badge-warning"
//                         >
//                         Edit
//                         </Link> */}
//                     </div>
//                 ) : (
//                     <div>
//                         <br />
//                         <p>Please click on a Tutorial...</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CarModelsList;