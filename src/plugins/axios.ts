import axios from "axios";
import { BASE_URL } from "@/appConstants";

const config = {
  timeout: 15 * 1000,
  baseURL: BASE_URL
};

const _axios = axios.create(config);

export default _axios;
