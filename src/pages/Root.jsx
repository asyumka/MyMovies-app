import { Outlet, useMatch } from "react-router";
import MainNavigation from "../components/Layout/MainNavigation";
import { FavoritesProvider } from "../context/FavoritesContext";

function RootLayout() {
  const isMovieDetailsPage = useMatch("/movies/:movieId");

  return (
    <>
      <FavoritesProvider>
        <div className={!isMovieDetailsPage ? "bg-img" : undefined}>
          <MainNavigation />
          <main>
            {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
            <Outlet />
          </main>
        </div>
      </FavoritesProvider>
    </>
  );
}

export default RootLayout;

export const rootLoader = () => {
  const sessionId = localStorage.getItem("session_id");
  const username = localStorage.getItem("username");
  const avatar = localStorage.getItem("avatar");
  const id = localStorage.getItem("user_id");

  return {
    user: sessionId ? { username, sessionId, avatar, id } : null,
  };
};
