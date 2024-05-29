import $api from "../../api/Api";

class AttractionService {
  static async getAllAttractions() {
    try {
      const response = await $api.get("Attractions");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getAttractionById(id) {
    try {
      const response = await $api.get(`Attractions/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async createAttraction(attraction) {
    try {
      const response = await $api.post("Attractions", attraction);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateAttraction(id, attraction) {
    try {
      const response = await $api.put(`Attractions/${id}`, attraction);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteAttraction(id) {
    try {
      const response = await $api.delete(`Attractions/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AttractionService;
