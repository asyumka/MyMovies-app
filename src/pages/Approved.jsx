import { redirect } from "react-router";
import { createSessionId, getAccountDetails } from "../api/auth";

export const approvedLoader = async ({ request }) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("request_token");
  const approved = url.searchParams.get("approved");

  if (approved === "true" && token) {
    try {
      const sessionId = await createSessionId(token);

      const user = await getAccountDetails(sessionId);

      localStorage.setItem("session_id", sessionId);
      localStorage.setItem("user_id", user.id);
      localStorage.setItem("username", user.username);

      const avatarPath = user.avatar?.tmdb?.avatar_path || null;

      if (avatarPath) {
        localStorage.setItem("avatar", avatarPath);
      }

      return redirect("/");
    } catch (error) {
      console.error("Ошибка авторизации", error);
      return redirect("/error");
    }
  }

  return redirect("/");
};

const ApprovedPage = () => <div>Autorization...</div>;

export default ApprovedPage;
