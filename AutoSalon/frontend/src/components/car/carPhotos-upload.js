import React, { Fragment, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

import { uploadCarPhoto, getAllCarPhotos } from "../../slices/carPhotosSlice";

const CarPhotosUpload = ({ car }) => {
    const initialCarPhotoState = Object.freeze({
        VIN: car.VIN,
    });

    const [carPhoto, setCarPhoto] = useState(initialCarPhotoState);
    const [carImages, setCarImage] = useState([]);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',});

    const handleInputChange = event => {
        console.log(event.target.name, " - ", event.target.value);

        if ([event.target.name] == 'photo') {
            setCarImage(carImages => [...carImages, event.target.files]);
            // console.log(event.target.files);
        } else {
            setCarPhoto({ ...carPhoto, [event.target.name]: event.target.value });
        }
    };

    const uploadPhoto = async (event) => {
        event.preventDefault();
        
        try {
            // console.log(Object.values(carImages[0]));
            // console.log(`${carImages[0]} - ${carImages[0].length} items`);
            
            if (carImages.length) { 
                for (let i=0; i<=carImages[0].length-1; i++) {
                    let newPhotoData = new FormData();
                    newPhotoData.append('VIN', car.VIN);
                    newPhotoData.append('photo', carImages[0][i]);
                    console.log(newPhotoData.getAll('photo'));
                    await dispatch(uploadCarPhoto(newPhotoData))
                        .unwrap()
                        .catch(e => {
                            console.log('Error happened while running uploadPhoto');
                            console.log(e);
                        });
                };
            } else {
                console.log(`something went wrong`);
            }

            await dispatch(getAllCarPhotos());
            window.location.reload();
        } catch (err) {
            alert("Что-то пошло не так, проверьте выбраны ли изображения.");
            console.log(err)
        }
    };
    
    return(
        <Fragment>
            <h4>Добавить изображения автомобиля</h4>
            <Form>
                <Form.Group>
                    <Form.Label className='mb-1' htmlFor="photo">Изображения</Form.Label>
                    <Form.Control
                        {...register("photo", { required: true })}
                        className="form-control"
                        size="md"
                        type="file"
                        accept="image/*"
                        multiple
                        id="photo"
                        name="photo"
                        value={carPhoto.photo}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                {errors.photo && <p>Необходимо выбрать изображения автомобиля.</p>}

                <div>
                    <button 
                        type="submit" 
                        className="mt-3 btn btn-primary btn-block"
                        onClick={uploadPhoto}
                    >
                        Загрузить изображения в каталог
                    </button>
                </div>
            </Form>
        </Fragment>
    );
};

export default CarPhotosUpload;