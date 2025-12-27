import { useLoaderData } from "react-router";
import PageContent from "../components/Layout/PageContent";
import MoviesList from "../components/Layout/MoviesList";
import Pagination from "../components/UI/Pagination";
import { moviesListLoader } from "../actions/loader";

function MoviesWithGenres() {
  const { movies, genre, totalPages } = useLoaderData();
  const title = `Top movies in the ${genre} genre`;
  return (
    <PageContent title={title}>
      <div className="title-logo"></div>
      <MoviesList movies={movies} />
      <Pagination totalPages={totalPages} />
    </PageContent>
  );
}

export default MoviesWithGenres;

export const moviesLoaderWithGenres = async ({ request, params }) => {
  const { genre } = params;
  const url = new URL(request.url);
  const genreId = url.searchParams.get("id");

  const response = await moviesListLoader(request.url, `/discover/movie`, {
    with_genres: genreId,
  });

  return { ...response, genre };
};
