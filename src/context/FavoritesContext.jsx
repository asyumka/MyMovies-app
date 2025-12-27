import { createContext, useContext, useState, useEffect } from "react";
import { getFavoriteMovies, markFavorite } from "../api/account";
import { useRouteLoaderData } from "react-router";

const FavoritesContext = createContext();

const defaultContext = {
  favorites: [],
  isFavorite: () => false,
  toggleFavorite: () => console.warn("Favorites provider is missing"),
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    return defaultContext;
  }

  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set());

  const rootData = useRouteLoaderData("root");
  const user = rootData?.user;

  useEffect(() => {
    if (user?.sessionId && user?.id) {
      getFavoriteMovies(user.id, user.sessionId)
        .then((data) => {
          setFavorites(data);
          setFavoriteIds(new Set(data.map((movie) => movie.id)));
        })
        .catch((err) => console.error("Unable to load favorites", err));
    } else {
      setFavoriteIds(new Set());
    }
  }, [user?.sessionId, user?.id]);

  const toggleFavorite = async (movie) => {
    if (!user) {
      alert("You need to log in!");
      return;
    }

    const isCurrentlyFavorite = favoriteIds.has(movie.id);

    if (isCurrentlyFavorite) {
      setFavorites((prev) => prev.filter((m) => m.id !== movie.id));
      setFavoriteIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(movie.id);
        return newSet;
      });
    } else {
      setFavorites((prev) => [movie, ...prev]);
      setFavoriteIds((prev) => new Set(prev).add(movie.id));
    }

    try {
      await markFavorite(
        user.id,
        user.sessionId,
        "movie",
        movie.id,
        !isCurrentlyFavorite
      );
    } catch (error) {
      console.error("Like synchronization error", error);

      if (isCurrentlyFavorite) {
        setFavorites((prev) => [movie, ...prev]);
        setFavoriteIds((prev) => new Set(prev).add(movie.id));
      } else {
        setFavorites((prev) => prev.filter((m) => m.id !== movie.id));
        setFavoriteIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(movie.id);
          return newSet;
        });
      }
    }
  };

  const isFavorite = (id) => favoriteIds.has(id);

  return (
    <FavoritesContext.Provider
      value={{ isFavorite, toggleFavorite, favorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
