import classes from "./StarRating.module.css";

function StarRating({ starsSelected, totalStars = 10 }) {
  return (
    <div>
      {[...Array(totalStars)].map((star, index) => (
        <Star key={index} selected={index < starsSelected} />
      ))}
    </div>
  );
}

export default StarRating;

const Star = ({ selected = false }) => (
  <div className={`${classes.star} ${selected ? classes.selected : ""}`}></div>
);
