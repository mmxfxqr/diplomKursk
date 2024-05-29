import $api from "../../api/Api";

class NewsService {
  static async getAllNews() {
    try {
      const response = await $api.get("News");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getNewsById(id) {
    try {
      const response = await $api.get(`/News/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async createNews(news) {
    try {
      const response = await $api.post("/News", news);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateNews(id, news) {
    try {
      const response = await $api.put(`/News/${id}`, news);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteNews(id) {
    try {
      const response = await $api.delete(`/News/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getCategories() {
    try {
      const response = await $api.get("/Categories");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default NewsService;
