import MovieItem from "../UI/MovieItem";

function MoviesList({ movies }) {
  return (
    <section>
      {/* <h2>Choose a movie for a good evening</h2> */}
      <ul>
        {movies.map((movie) => (
          <MovieItem key={movie.id} movieData={movie} />
        ))}
      </ul>
    </section>
  );
}

export default MoviesList;
