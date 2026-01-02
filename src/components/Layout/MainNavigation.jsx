import { Link, NavLink, Form, useRouteLoaderData } from "react-router";

import classes from "./MainNavigation.module.css";
import logoImg from "../../assets/svg/logo.svg";
import burgerMenuBtn from "../../assets/svg/burger-menu-svgrepo-com.svg";
import closeBtn from "../../assets/svg/arrow-up-svgrepo-com.svg";
import DropDown from "../UI/DropDown";
import { GENRES_ARRAY } from "../../utils/genresUtils";
import { useFavorites } from "../../context/FavoritesContext";
import LikeButton from "../UI/LikeButton";
import InputSearchMovies from "../UI/InputSearchMovies";
import { useState } from "react";

function MainNavigation() {
  const [navIsClosed, setNavIsClosed] = useState(true);
  const rootData = useRouteLoaderData("root");
  const { favorites } = useFavorites();

  function toggleNav() {
    setNavIsClosed((prev) => !prev);
  }

  const user = rootData?.user;

  return (
    <header className={classes.header}>
      <nav className={navIsClosed ? classes.active : undefined}>
        <Link to="/">
          <img src={logoImg} alt="logo" className={classes.logo} />
        </Link>

        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          {navIsClosed && (
            <>
              <li>
                <NavLink
                  to="/popular"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  end
                >
                  Popular
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/upcoming"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  end
                >
                  Upcoming
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/now_playing"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  end
                >
                  Now Playing
                </NavLink>
              </li>
            </>
          )}
        </ul>
        {navIsClosed && <InputSearchMovies />}
        {navIsClosed && (
          <DropDown
            title="Genres"
            list={GENRES_ARRAY}
            renderItem={(genre) => (
              <NavLink
                to={`/genres/${genre.name.toLowerCase()}?id=${genre.id}`}
                className={({ isActive }) =>
                  isActive ? classes["active"] : undefined
                }
                end
              >
                {genre.name}
              </NavLink>
            )}
          />
        )}

        {user && (
          <DropDown
            title="Favorites"
            list={favorites}
            renderItem={(favorite) => (
              <div className={classes["dropdown-item-wrap"]}>
                <NavLink
                  to={`/movies/${favorite.id}`}
                  className={({ isActive }) =>
                    isActive ? classes["active"] : undefined
                  }
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w45${favorite.poster_path}`}
                    alt={favorite.title}
                    style={{ width: 30, borderRadius: 4 }}
                  />
                  <span>{favorite.title}</span>
                </NavLink>
                <div className={classes["dropdown-favorites__btn"]}>
                  <LikeButton movie={favorite} size={20} />
                </div>
              </div>
            )}
          />
        )}

        {!user && (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Log In
          </NavLink>
        )}
        {user && (
          <Form method="post" action="/logout">
            <div className={classes["btn-submit"]}>
              <button type="submit">Log Out</button>
            </div>
          </Form>
        )}

        <button className={classes["burger-btn"]} onClick={toggleNav}>
          {!navIsClosed ? (
            <img
              src={burgerMenuBtn}
              alt="burger Menu Button"
              className={classes.icon}
            />
          ) : (
            <img
              src={closeBtn}
              alt="close Menu Button"
              className={classes.icon}
            />
          )}
        </button>
      </nav>
    </header>
  );
}

export default MainNavigation;
