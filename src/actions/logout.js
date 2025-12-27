import { redirect } from "react-router";

export const logoutAction = async () => {
  const sessionId = localStorage.getItem("session_id");
  if (sessionId) {
    try {
      await deleteSession(sessionId);
    } catch (e) {
      console.error(e);
    }
  }

  localStorage.removeItem("session_id");
  localStorage.removeItem("user_id");
  localStorage.removeItem("username");

  return redirect("/");
};
