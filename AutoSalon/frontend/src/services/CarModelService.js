import axiosDefault from "../http-common"; // axios instance

const getAllCarModels = () => {
    return axiosDefault.get("/carmodels");
};

const getCarModel = id => {
    return axiosDefault.get(`/carmodels/${id}`);
};

const createCarModel = data => {
    return axiosDefault.post("/carmodels", data);
};

const updateCarModel = (id, data) => {
    return axiosDefault.put(`/carmodels/${id}`, data);
};

const removeCarModel = id => {
    return axiosDefault.delete(`/carmodels/${id}`);
};

// search??

const CarModelDataService = {
    getAllCarModels,
    getCarModel,
    createCarModel,
    updateCarModel,
    removeCarModel
};

export default CarModelDataService;