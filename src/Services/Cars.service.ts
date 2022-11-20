import SearchCarFilters from "../Models/SearchCarFilters.model";
import http from "./http-common";

class CarsService {
  private BASE_URL = "cars";

  searchCars(filters: SearchCarFilters) {
    return http.post(this.BASE_URL + "/search", filters);
  }

  getCarById(id: number) {
    return http.get(this.BASE_URL + "/" + id);
  }

  getAll() {
    return http.get(this.BASE_URL);
  }

  createCar(data: any) {
    return http.post(this.BASE_URL, data);
  }

  getAllClientCars() {
    return http.get(this.BASE_URL + "/client");
  }

  deleteCar(id: number) {
    return http.delete(`${this.BASE_URL}/${id}`)
  }

  updateCar(data: any, id: number) {
    return http.put(`${this.BASE_URL}/${id}`, data)
  }
}

export default new CarsService();
