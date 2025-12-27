import PageContent from "../components/Layout/PageContent";
import MoviesList from "../components/Layout/MoviesList";
import { useLoaderData } from "react-router";
import Pagination from "../components/UI/Pagination";
import { moviesListLoader } from "../actions/loader";

function MoviesPage() {
  const { movies, type, totalPages } = useLoaderData();
  let title = "Choose a movie for a good evening";
  switch (type) {
    case "popular":
      title = "List of movies ordered by popularity";
      break;
    case "upcoming":
      title = "List of movies that are being released soon";
      break;
    case "now_playing":
      title = "List of movies that are currently in theatres";
      break;

    default:
      break;
  }

  return (
    <PageContent title={title}>
      <div className="title-logo"></div>
      <MoviesList movies={movies} />
      <Pagination totalPages={totalPages} />
    </PageContent>
  );
}

export default MoviesPage;

export const moviesLoader = async ({ request, params }) => {
  const type = params.moviesType;
  const response = await moviesListLoader(request.url, `/movie/${type}`, {});

  return { ...response, type };
};
