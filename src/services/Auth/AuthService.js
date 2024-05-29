import axios from "axios";
import $api from "../../api/Api";

class AuthService {
  static async login(login, password) {
    return $api.post("/UsersAuth", { login, password });
  }

  static async register(user) {
    try {
      const response = await $api.post("/Users", user);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
