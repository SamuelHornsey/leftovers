import { h } from "preact";
import { route } from "preact-router";
import { login as doLogin, isAuthenticated } from "../../services/auth";

import "./Login.scss";

import google from "../../assets/google.png";

const Login = () => {
  if (isAuthenticated()) {
    return route("/", true);
  }

  const login = e => {
    e.preventDefault();
    doLogin();
  };

  return (
    <div class="Login">
      <h1 class="Login__title">Leftovers</h1>

      <button onClick={e => login(e)} class="Login__btn">
        <div class="Login__btn-text">Login with Google</div>
        <div class="Login__btn-logo">
          <img src={google} alt="Google" />
        </div>
      </button>

      <div class="Login__name">
        Made by{" "}
        <a href="https://github.com/SamuelHornsey" target="_blank">
          Samuel Hornsey
        </a>
      </div>
    </div>
  );
};

export default Login;
