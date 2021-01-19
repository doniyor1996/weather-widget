import _axios from "@/plugins/axios";
import { API_KEY_PARAM } from "@/appConstants";

interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherLocation {
  id: number;
  order: number;
  coord: {
    lat: number;
    lon: number;
  };
  name: string;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  country: string;
  visibility: number;
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  };
  wind: {
    deg: number;
    speed: number;
  };
}

function formatResponse(response: any) {
  const location: WeatherLocation = {
    id: 0,
    order: 0,
    name: response.name,
    coord: response.coord,
    main: response.main,
    weather: response.weather[0],
    country: response.sys.country,
    wind: response.wind,
    visibility: response.visibility
  };

  return location;
}

export const weatherAPI = {
  getByCoordinates: async (cord: Coordinates) => {
    const response = await _axios.get("weather", {
      params: {
        ...API_KEY_PARAM,
        ...cord
      }
    });
    return formatResponse(response.data);
  },
  getByName: async (name: string) => {
    const response = await _axios.get("weather", {
      params: {
        ...API_KEY_PARAM,
        q: name
      }
    });
    return formatResponse(response.data);
  }
};
