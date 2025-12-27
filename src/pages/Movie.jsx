import { useLoaderData, Await } from "react-router";
import { getData } from "../api/axios";
import MovieCard from "../components/UI/MovieCard";
import classes from "../components/UI/MovieCard.module.css";
import VideoPlayer from "../components/UI/VideoPlayer";
import { FullScreenContainer } from "../context/FullScreenContainer.jsx";
import { VideoPlayerContainer } from "../context/VideoPlayerContainer.jsx";
import { Suspense } from "react";
import ReviewsList from "../components/UI/ReviewsList";

function MoviePage() {
  const { movie, movieVideos, reviews } = useLoaderData();
  const imgUrl = "https://image.tmdb.org/t/p/w1280/" + movie.backdrop_path;

  const trailer =
    movieVideos?.results?.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    ) || movieVideos?.results?.[0];

  const videoKey = trailer ? trailer.key : null;
  return (
    <>
      <section
        className={classes["bg-img"]}
        style={{ backgroundImage: `url(${imgUrl})` }}
      >
        <div className={classes["wrapper-content"]}>
          <MovieCard movieDetails={movie} />
          {videoKey ? (
            <VideoPlayerContainer>
              <FullScreenContainer className={classes["fullscreen"]}>
                <VideoPlayer videoId={videoKey} cover={imgUrl} />
              </FullScreenContainer>
            </VideoPlayerContainer>
          ) : (
            <div className={classes["fall-text"]}>
              <p>
                <b>Video unavailable for this movie</b> 😔
              </p>
            </div>
          )}
          <Suspense fallback={<p>Loading reviews...</p>}>
            <Await resolve={reviews}>
              {(loadedReviews) =>
                loadedReviews.results.length !== 0 && (
                  <ReviewsList
                    reviews={loadedReviews.results}
                    title={movie.title}
                  />
                )
              }
            </Await>
          </Suspense>
        </div>
      </section>
    </>
  );
}

export default MoviePage;

export async function loader({ request, params }) {
  const id = params.moviesId;

  const movie = await getData(`/movie/${id}`);

  const movieVideos = await getData(`/movie/${id}/videos`);

  const reviews = getData(`/movie/${id}/reviews`);

  if (!movie) {
    throw new Response("Not found anything", { status: 404 });
  }

  return { movie, movieVideos, reviews };
}
