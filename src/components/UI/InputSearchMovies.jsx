import { useState, useEffect } from "react";
import { moviesListLoader } from "../../actions/loader";

import { NavLink } from "react-router";

import classes from "./InputSearchMovies.module.css";
import OutsideArea from "../Layout/OutsideArea";

function InputSearchMovies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        searchTop5Popular(searchTerm).then((data) => setResults(data));
        setIsActive(true);
      }
    }, 500);
    setIsActive(false);
    setResults([]);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className={classes.drop}>
      <OutsideArea setIsActive={setIsActive}>
        <input
          type="search"
          placeholder="Enter movie name..."
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsActive(true)}
        />
        {results && (
          <div
            className={`${classes["dropped-block"]} ${
              isActive ? classes["active"] : ""
            }`}
          >
            {results.length > 0 && searchTerm.length > 0 ? (
              <ul className={classes["dropped-list"]}>
                {results.map((item) => (
                  <li key={item.id} className={classes["dropped-list-item"]}>
                    <NavLink
                      to={`/movies/${item.id}`}
                      className={isActive ? classes["active"] : undefined}
                      end
                      onClick={() => setIsActive(false)}
                    >
                      {item.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nothing found</p>
            )}
          </div>
        )}
      </OutsideArea>
    </div>
  );
}

export default InputSearchMovies;

async function searchTop5Popular(query) {
  try {
    const data = await moviesListLoader(
      "http://localhost:5173/",
      `/search/movie`,
      {
        query,
      }
    );
    console.log(data);

    if (!data.movies) return [];

    const sortedMovies = data.movies.sort(
      (a, b) => b.popularity - a.popularity
    );

    const top5 = sortedMovies.slice(0, 5);

    return top5;
  } catch (error) {
    return [];
  }
}
