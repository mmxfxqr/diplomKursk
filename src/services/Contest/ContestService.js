import $api from "../../api/Api";

class ContestService {
  static async getAllContests() {
    try {
      const response = await $api.get("Сontest");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getContestById(id) {
    try {
      const response = await $api.get(`/Сontest/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async createContest(contest) {
    try {
      const response = await $api.post("/Сontest", contest);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateContest(id, contest) {
    try {
      const response = await $api.put(`/Сontest/${id}`, contest);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteContest(id) {
    try {
      const response = await $api.delete(`/Сontest/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ContestService;
