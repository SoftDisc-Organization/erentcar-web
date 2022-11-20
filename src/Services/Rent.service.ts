import CreateRent from "../Models/CreateRent.model";
import http from "./http-common";

class RentService {
  private BASE_URL = "rents";

  getRentsByToken() {
    return http.get(this.BASE_URL);
  }

  createRent(data: CreateRent) {
    return http.post(this.BASE_URL, data);
  }
}

export default new RentService();
