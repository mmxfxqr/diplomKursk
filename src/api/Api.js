import axios from "axios";

export const API_URL = "https://a27673-2ce6.t.d-f.pw/api";
const $api = axios.create({
  baseURL: API_URL,
});
export default $api;
