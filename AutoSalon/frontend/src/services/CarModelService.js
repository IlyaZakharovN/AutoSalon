import httpCommon from "../http-common"; // axios instance

const getAllCarModels = () => {
    return httpCommon.get("/carmodels");
};

const getCarModel = id => {
    return httpCommon.get(`/carmodels/${id}`);
};

const createCarModel = data => {
    return httpCommon.post("/carmodels", data);
};

const updateCarModel = (id, data) => {
    return httpCommon.put(`/carmodels/${id}`, data);
};

const removeCarModel = id => {
    return httpCommon.delete(`/carmodels/${id}`);
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