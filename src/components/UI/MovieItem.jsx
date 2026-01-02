import { Link, useRouteLoaderData } from "react-router";
import classes from "./MovieItem.module.css";
import { movieGenresToName } from "../../utils/genresUtils";
import { stylingList } from "../../utils/listUtils";
import Button from "./Button";
import LikeButton from "./LikeButton";
import SlicedText from "./SlicedText";

function MovieItem({ movieData }) {
  const user = useRouteLoaderData("root")?.user;
  const movieTitle =
    movieData.title === movieData.original_title
      ? movieData.title
      : `${movieData.title} (${movieData.original_title})`;

  const movieGenres = movieGenresToName(movieData.genre_ids);
  const movieGenresString = stylingList(movieGenres);

  return (
    <div className={classes["movie-card"]}>
      <div className={classes["movie-card-content"]}>
        <Link to={`/movies/${movieData.id}`}>
          <div className={classes["movie-card-img"]}>
            <img
              src={"https://image.tmdb.org/t/p/w500/" + movieData.poster_path}
              alt={movieData.title}
            />
          </div>
        </Link>

        <div className={classes["movie-card-text"]}>
          <Link to={`/movies/${movieData.id}`}>
            <h3>{movieTitle}</h3>
          </Link>

          <ul>
            <b>Genres:</b> &nbsp;
            {movieGenresString}
          </ul>
          <p>
            <b>Premiere: </b>
            {movieData.release_date}
          </p>
          <p>
            <b>Rating: </b>
            {movieData.vote_average}
          </p>
          <div className={classes["movie-card-description"]}>
            <SlicedText contentLength={movieData.overview.length}>
              <p>{movieData.overview}</p>
            </SlicedText>
          </div>
        </div>
      </div>
      <div className={classes["btns-group"]}>
        {user && <LikeButton movie={movieData} size={28} />}
        <Link to={`/movies/${movieData.id}`} style={{ color: "black" }}>
          <Button>Watch</Button>
        </Link>
      </div>
    </div>
  );
}

export default MovieItem;
