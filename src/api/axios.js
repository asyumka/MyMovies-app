import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function getData(url, params, page = 1) {
  try {
    const response = await axios.get(BASE_URL + url, {
      params: {
        api_key: API_KEY,
        page,
        ...params,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Request error:", error);
    return [];
  }
}
