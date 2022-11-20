import http from "./http-common"

class CarModelsService {
    private BASE_URL = "/car-models"

    getAllCarModels() {
        return http.get(this.BASE_URL)
    }
}

export default new CarModelsService();