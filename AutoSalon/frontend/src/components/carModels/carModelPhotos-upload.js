import React, { Fragment, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

import { uploadCarModelPhoto, getAllCarModelPhotos } from "../../slices/carModelPhotosSlice";

const CarModelPhotosUpload = ({ carModel }) => {
    const initialCarModelPhotoState = Object.freeze({
        model_id: carModel.id,
    });

    const [carModelPhoto, setCarModelPhoto] = useState(initialCarModelPhotoState);
    // const [carModelImage, setCarModelImage] = useState(null);
    const [carModelImages, setCarModelImage] = useState([]);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',});

    const handleInputChange = event => {
        console.log(event.target.name, " - ", event.target.value);

        if ([event.target.name] == 'photo') {
            // setCarModelImage({
            //     image: event.target.files,
            // });
            setCarModelImage(carModelImages => [...carModelImages, event.target.files]);
            console.log(event.target.files);
        } else {
            setCarModelPhoto({ ...carModelPhoto, [event.target.name]: event.target.value });
        }
    };

    const uploadPhoto = async (event) => {
        event.preventDefault();
        
        try {
            // console.log(typeof(carModelImages));
            console.log(Object.values(carModelImages[0]));
            // for (const key of Object.keys(carModelImages)) {
            //     console.log(carModelImages[key]);
            // }
            console.log(`${carModelImages[0]} - ${carModelImages[0].length} items`);
            
            if (carModelImages.length) { 
                // console.log(`${carModelImages} - ${carModelImages.length} items`);
                for (let i=0; i<=carModelImages[0].length-1; i++) { // const i of Object.keys(carModelImages)
                    let newPhotoData = new FormData();
                    newPhotoData.append('model_id', carModel.id);
                    // console.log(newPhotoData.getAll('model_id'));
                    newPhotoData.append('photo', carModelImages[0][i]);
                    console.log(newPhotoData.getAll('photo'));
                    await dispatch(uploadCarModelPhoto(newPhotoData))
                        .unwrap()
                        .catch(e => {
                            console.log('Error happened while running uploadPhoto');
                            console.log(e);
                        });
                };
                // console.log(newPhotoData.getAll('photo'));
            } else {
                console.log(`something went wrong`);
            }

            // await dispatch(uploadCarModelPhoto(newPhotoData))
            //     .unwrap()
            //     .catch(e => {
            //         console.log('Error happened while running uploadPhoto');
            //         console.log(e);
            //     });

            await dispatch(getAllCarModelPhotos());
            window.location.reload();
        } catch (err) {
            alert("Что-то пошло не так, проверьте выбраны ли изображения.");
            console.log(err)
        }
    };
    
    return(
        <Fragment>
            <h4>Добавить изображения модели</h4>
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
                        value={carModelPhoto.photo}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                {errors.photo && <p>Необходимо выбрать изображения модели автомобиля.</p>}

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

export default CarModelPhotosUpload;