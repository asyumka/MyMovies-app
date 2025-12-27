import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getFavoriteMovies = async (accountId, sessionId) => {
  const response = await axios.get(
    `${BASE_URL}/account/${accountId}/favorite/movies`,
    {
      params: {
        api_key: API_KEY,
        session_id: sessionId,
        sort_by: "created_at.desc",
        page: 1,
      },
    }
  );

  return response.data.results;
};

export const getAccountStates = async (type, id, sessionId) => {
  const response = await axios.get(`${BASE_URL}/${type}/${id}/account_states`, {
    params: {
      api_key: API_KEY,
      session_id: sessionId,
    },
  });
  return response.data;
};

export const markFavorite = async (
  accountId,
  sessionId,
  type,
  mediaId,
  isFavorite
) => {
  await axios.post(
    `${BASE_URL}/account/${accountId}/favorite`,
    {
      media_type: type,
      media_id: mediaId,
      favorite: isFavorite,
    },
    {
      params: {
        api_key: API_KEY,
        session_id: sessionId,
      },
    }
  );
};
