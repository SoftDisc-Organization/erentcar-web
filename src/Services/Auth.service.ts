import UserLogin from "../Models/UserLogin.model";
import UserRegister from "../Models/UserRegister.model";
import http from "./http-common";

class AuthService {
  private BASE_URL = "users/auth";

  login(data: UserLogin) {
    return http.post(this.BASE_URL + "/sign-in", data);
  }

  register(data: UserRegister) {
    return http.post(this.BASE_URL + "/sign-up", data);
  }
}

export default new AuthService();