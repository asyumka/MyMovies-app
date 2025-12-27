import { Form, redirect } from "react-router";
import { createRequestToken } from "../api/auth";
import PageContent from "../components/Layout/PageContent";
import Button from "../components/UI/Button";

export const loginAction = async () => {
  const token = await createRequestToken();
  const returnUrl = `${window.location.origin}/approved`;

  window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${returnUrl}`;

  return null;
};

const LoginPage = () => {
  return (
    <PageContent>
      <div className="login-container">
        <h1>Log in to your account</h1>
        <p>To log in, you will be redirected to the TMDB website</p>

        <Form method="post" action="/login">
          <Button type="submit">Sign in via TMDB</Button>
        </Form>
      </div>
    </PageContent>
  );
};

export default LoginPage;
