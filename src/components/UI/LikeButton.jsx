import { useFavorites } from "../../context/FavoritesContext";
import classes from "./LikeButton.module.css";

const LikeButton = ({ movie, size }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const active = isFavorite(movie.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <button
      onClick={handleClick}
      className={`${classes.heart} ${active ? classes.active : ""}`}
      title={active ? "Remove from favorites" : "Add to favorites"}
      style={{ fontSize: size }}
    >
      {active ? "❤️" : "🤍"}
    </button>
  );
};

export default LikeButton;
