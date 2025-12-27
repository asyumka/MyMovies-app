import PageContent from "../components/Layout/PageContent";
import MoviesList from "../components/Layout/MoviesList";
import { useLoaderData } from "react-router";
import Pagination from "../components/UI/Pagination";
import { moviesListLoader } from "../actions/loader";

function HomePage() {
  const { movies, totalPages } = useLoaderData();

  return (
    <PageContent title="Choose a movie for a good evening">
      <div className="title-logo"></div>
      <MoviesList movies={movies} />
      <Pagination totalPages={totalPages} />
    </PageContent>
  );
}

export default HomePage;

export const homeMoviesLoader = async ({ request }) => {
  const response = await moviesListLoader(request.url, "/movie/top_rated", {});

  return { ...response };
};
