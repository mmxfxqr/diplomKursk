import $api from "../../api/Api";

class AppealService {
  static async createAppeal(application) {
    try {
      const response = await $api.post("/Applications", application);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getAppeals() {
    try {
      const response = await $api.get("/Applications");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteAppeal(id) {
    try {
      const response = await $api.delete(`/Applications/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AppealService;
