import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { fetchCarModel, updateSingleCarModel, singleCarModelSelector } from "../../slices/singleCarModelSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const SingleCarModelCrud = () => {
    const { singleCarModel, loading: singleCarModelLoading, hasErrors: singleCarModelHasErrors } = useSelector(singleCarModelSelector);
    
    const initialSingleCarModelState = {
        id: null,
        brand: singleCarModel.brand,
        model: singleCarModel.model,
        // ...
    };

    const [currentCarModel, setCurrentCarModel] = useState(initialSingleCarModelState);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const handleInputChange = event => {
        const {name, value} = event.target;
        setCurrentCarModel({ ...currentCarModel, [name]: value});
    };

    ///// Update single car model /////
    const updateContent = (p) => {
        const data = {
            id: singleCarModel.id,
            brand: singleCarModel.brand,
            model: singleCarModel.model,
        };

        console.log('currentCarModel.id - ', singleCarModel.id);
        console.log('currentCarModel.brand - ', currentCarModel.brand);
        console.log('currentCarModel.model - ', currentCarModel.model);
        
        dispatch(updateSingleCarModel({ id: singleCarModel.id, data: currentCarModel }))
            .unwrap()
            .then(response => {
                console.log('response - ', response);
            })
            .catch(e => {
                console.log(e);
            });
    };

    // useEffect(() => {
    //     const id = params.id;
    //     dispatch(fetchCarModel(id));
    // }, [dispatch])

    return (
        <div className="edit-form">
            <form>
                <h4>Изменить модель автомобиля</h4>
                <div className='form-group'>
                    <label htmlFor="brand">Производитель </label>
                    <input
                        required
                        type="text"
                        id="brand"
                        name="brand"
                        value={currentCarModel.brand}
                        onChange={handleInputChange}    
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="model">Модель </label>
                    <input
                        required
                        type="text"
                        id="model"
                        name="model"
                        value={currentCarModel.model}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block"
                        onClick={updateContent}
                    >
                        Внести изменения
                    </button>
                </div>
                <div>
                    <br/>
                    <button 
                        type="submit" 
                        className="btn btn-secondary btn-block"
                        // onClick={handleSubmit}
                    >
                        Удалить модель
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SingleCarModelCrud;