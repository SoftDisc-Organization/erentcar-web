import CreateClient from "../Models/CreateClient.model";
import UpdateClient from "../Models/UpdateClient.model";
import http from "./http-common";

class ClientService {
  private BASE_URL = "clients";

  createClient(data: CreateClient) {
    return http.post(this.BASE_URL, data);
  }

  updateClient(data: UpdateClient) {
    return http.put(this.BASE_URL, data);
  }

  getClientByToken() {
    return http.get(this.BASE_URL + "/token");
  }
}

export default new ClientService();