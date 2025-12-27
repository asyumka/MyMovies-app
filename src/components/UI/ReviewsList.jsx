import { formatDateReadable } from "../../utils/dateUtils";
import classes from "./ReviewsList.module.css";
import SlicedText from "./SlicedText";
import StarRating from "./StarRating";

function ReviewsList({ reviews, title }) {
  return (
    <div className={classes["reviews-block"]}>
      <h3>Reviews of the film {title}:</h3>
      <ul>
        {reviews.map((review) => (
          <li className={classes["reviews-item"]} key={review.id}>
            <div className={classes["user"]}>
              <div className={classes["user-avatar"]}>
                {review.author_details.avatar_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`}
                    alt={`Avatar of ${review.author_details.username}`}
                  />
                ) : (
                  <p className={classes["user-avatar-fallback"]}>
                    {review.author_details.username[0].toUpperCase()}
                  </p>
                )}
              </div>
              <div className={classes["user-info"]}>
                <p className={classes["user-name"]}>
                  {review.author_details.username}
                </p>
                <div className={classes["user-rating"]}>
                  {review.author_details.rating ? (
                    <StarRating starsSelected={review.author_details.rating} />
                  ) : (
                    "No rating"
                  )}
                </div>
              </div>
            </div>
            <div className={classes["review"]}>
              <SlicedText contentLength={review.content.length} maxLength={650}>
                <p className={classes["review-text"]}>{review.content}</p>
              </SlicedText>
              <p className={classes["review-date"]}>
                {formatDateReadable(review.created_at)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewsList;
