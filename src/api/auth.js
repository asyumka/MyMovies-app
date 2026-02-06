import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const createRequestToken = async () => {
  const response = await axios.get(`${BASE_URL}/authentication/token/new`, {
    params: { api_key: API_KEY },
  });
  return response.data.request_token;
};

export const createSessionId = async (requestToken) => {
  const response = await axios.post(
    `${BASE_URL}/authentication/session/new`,
    { request_token: requestToken },
    { params: { api_key: API_KEY } }
  );
  return response.data.session_id;
};

export const getAccountDetails = async (sessionId) => {
  const response = await axios.get(`${BASE_URL}/account`, {
    params: { api_key: API_KEY, session_id: sessionId },
  });
  return response.data;
};

export const deleteSession = async (sessionId) => {
  await axios.delete(`${BASE_URL}/authentication/session`, {
    params: { api_key: API_KEY },
    data: { session_id: sessionId },
  });
};
