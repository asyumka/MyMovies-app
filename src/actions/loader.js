import { getData } from "../api/axios";

export const moviesListLoader = async (requestUrl, urlReq, options) => {
  const url = new URL(requestUrl);
  const page = url.searchParams.get("page") || 1;

  const response = await getData(urlReq, options, page);

  const movies = response.results;

  if (!movies || movies.length === 0) {
    throw new Response("Not found anything", { status: 404 });
  }
  const totalPages = response.total_pages > 10 ? 10 : response.total_pages;

  return { movies, totalPages, currentPage: response.page };
};
