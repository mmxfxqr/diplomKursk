import $api from "../../api/Api";

class PosterService {
  static async getAllPosters() {
    try {
      const response = await $api.get("Posters");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getPosterById(id) {
    try {
      const response = await $api.get(`/Posters/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async createPoster(poster) {
    try {
      const response = await $api.post("/Posters", poster);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updatePoster(id, poster) {
    try {
      const response = await $api.put(`/Posters/${id}`, poster);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deletePoster(id) {
    try {
      const response = await $api.delete(`/Posters/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default PosterService;
