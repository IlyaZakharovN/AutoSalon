import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { SingleCarModel } from "../components/SingleCarModel";
import { fetchCarModel, singleCarModelSelector } from "../slices/singleCarModelSlice";

const CarModel = (props) => {
    const dispatch = useDispatch();
    const params = useParams();
    const { singleCarModel, loading: singleCarModelLoading, hasErrors: singleCarModelHasErrors } = useSelector(singleCarModelSelector);

    useEffect(() => {
        const id = params.id;
        dispatch(fetchCarModel(id));
    }, [dispatch])

    const renderSingleCarModel = () => {
        if (singleCarModelLoading) return <p>Loading the post...</p>
        if (singleCarModelHasErrors) return <p>Unable to display the post.</p>
        return <SingleCarModel singleCarModel={singleCarModel} />
    };

    return (
        <section>
            {renderSingleCarModel()}
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