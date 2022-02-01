import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import SingleCarModel from "../components/singleCarModel/SingleCarModel";
import SingleCarModelCrud from "../components/singleCarModel/crud";
import { fetchCarModel, singleCarModelSelector } from "../slices/singleCarModelSlice";
import { userSelector, retriveUserData } from "../slices/userSlice";

const CarModel = (props) => {
    const dispatch = useDispatch();
    const params = useParams();
    const { singleCarModel, loading: singleCarModelLoading, hasErrors: singleCarModelHasErrors } = useSelector(singleCarModelSelector);
    const { isAuthenticated, is_superuser, is_sales_director, is_puchase_manager } = useSelector(userSelector);

    useEffect(() => {
        const id = params.id;
        dispatch(fetchCarModel(id));
    }, [dispatch])

    const renderSingleCarModel = () => {
        if (singleCarModelLoading) return <p>Данные загружаются...</p>
        if (singleCarModelHasErrors) return <p>Невозможно отобразить данные.</p>
        return <SingleCarModel singleCarModel={singleCarModel} />
    };

    const renderUpdateForm = () => {
        if (singleCarModelLoading) return <p>Ожидание загрузки данных...</p>
        if (singleCarModelHasErrors) return <p>Невозможно загрузить форму обновления.</p>
        return <SingleCarModelCrud singleCarModel={singleCarModel} />
    }

    return (
        <section>
            {renderSingleCarModel()}

            { isAuthenticated && (is_superuser || is_sales_director || is_puchase_manager) &&
            <div>
                <br/>
                {/* {SingleCarModelCrud()} */}
                {renderUpdateForm()}
            </div> }
        </section>
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