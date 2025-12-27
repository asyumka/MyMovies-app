import { useRouteLoaderData } from "react-router";
import { stylingList } from "../../utils/listUtils";
import LikeButton from "./LikeButton";
import classes from "./MovieCard.module.css";

function MovieCard({ movieDetails }) {
  const user = useRouteLoaderData("root")?.user;
  const movieTitle =
    movieDetails.title === movieDetails.original_title
      ? movieDetails.title
      : `${movieDetails.title} (${movieDetails.original_title})`;
  const movieGenres = movieDetails.genres.map((genre) => genre.name);
  const movieGenresString = stylingList(movieGenres);
  return (
    <>
      <div className={classes["movie-card"]}>
        <div className={classes["movie-card-content"]}>
          <div className={classes["movie-card-img"]}>
            <img
              src={
                "https://image.tmdb.org/t/p/w500/" + movieDetails.poster_path
              }
              alt={movieDetails.title}
            />
          </div>

          <div className={classes["movie-card-text"]}>
            <div className={classes["movie-card-title"]}>
              <h2>{movieTitle}</h2>
              {user && <LikeButton movie={movieDetails} size={36} />}
            </div>

            <ul>
              <b>Genres:</b> &nbsp;
              {movieGenresString}
            </ul>
            <p>
              <b>Premiere: </b>
              {movieDetails.release_date}
            </p>
            <p>
              <b>Production country:</b>{" "}
              {movieDetails.production_countries[0]?.name || "-"}
            </p>
            <p>
              <b>Company:</b>{" "}
              {movieDetails.production_companies[0]?.name || "-"}
            </p>
            <p>
              <b>Rating: </b>
              {movieDetails.vote_average}
            </p>
          </div>
        </div>
        <p className={classes["movie-card-description"]}>
          {movieDetails.overview}
        </p>
      </div>
    </>
  );
}

export default MovieCard;
