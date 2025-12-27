import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// 1. Получение временного токена
export const createRequestToken = async () => {
  const response = await axios.get(`${BASE_URL}/authentication/token/new`, {
    params: { api_key: API_KEY },
  });
  return response.data.request_token;
};

// 2. Обмен подтвержденного токена на Session ID
export const createSessionId = async (requestToken) => {
  const response = await axios.post(
    `${BASE_URL}/authentication/session/new`,
    { request_token: requestToken },
    { params: { api_key: API_KEY } }
  );
  return response.data.session_id;
};

// 3. Получение данных аккаунта (чтобы узнать имя и ID пользователя)
export const getAccountDetails = async (sessionId) => {
  const response = await axios.get(`${BASE_URL}/account`, {
    params: { api_key: API_KEY, session_id: sessionId },
  });
  return response.data;
};

// 4. Удаление сессии (Logout)
export const deleteSession = async (sessionId) => {
  await axios.delete(`${BASE_URL}/authentication/session`, {
    params: { api_key: API_KEY },
    data: { session_id: sessionId },
  });
};
