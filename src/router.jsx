import { createBrowserRouter } from "react-router";
import RootLayout, { rootLoader } from "./pages/Root.jsx";
import HomePage, { homeMoviesLoader } from "./pages/Home.jsx";
import ErrorPage from "./pages/Error.jsx";
import MoviePage, { loader as movieLoader } from "./pages/Movie.jsx";
import MoviesPage, { moviesLoader } from "./pages/Movies.jsx";
import MoviesWithGenres, {
  moviesLoaderWithGenres,
} from "./pages/MoviesWithGenres.jsx";
import LoginPage, { loginAction } from "./pages/Login.jsx";
import ApprovedPage, { approvedLoader } from "./pages/Approved.jsx";
import { logoutAction } from "./actions/logout.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <div className="loading-screen">Loading...</div>,
    loader: rootLoader,
    id: "root",
    children: [
      { index: true, element: <HomePage />, loader: homeMoviesLoader },
      {
        path: "login",
        element: <LoginPage />,
        action: loginAction, // Привязываем экшн
      },
      {
        path: "approved",
        element: <ApprovedPage />,
        loader: approvedLoader, // Привязываем лоадер обработки
      },
      // Кнопка выхода
      {
        path: "logout",
        action: logoutAction, // Опишу ниже
      },
      {
        path: "/:moviesType",
        element: <MoviesPage />,
        loader: moviesLoader,
      },
      {
        path: "/genres/:genre",
        element: <MoviesWithGenres />,
        loader: moviesLoaderWithGenres,
      },
      {
        path: "/movies/:moviesId",
        element: <MoviePage />,
        loader: movieLoader,
      },
    ],
  },
]);

export default router;
