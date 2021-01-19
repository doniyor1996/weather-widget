import _axios from "@/plugins/axios";
import { API_KEY_PARAM } from "@/appConstants";

interface Coordinates {
  lat: number;
  lon: number;
}

export const weatherAPI = {
  getByCoordinates: async (cord: Coordinates) => {
    const response = await _axios.get("weather", {
      params: {
        ...API_KEY_PARAM,
        ...cord
      }
    });
    return response.data;
  },
  getByName: async (name: string) => {
    const response = await _axios.get("weather", {
      params: {
        ...API_KEY_PARAM,
        q: name
      }
    });
    return response.data;
  }
};
