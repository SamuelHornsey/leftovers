import { h } from "preact";
import { useContext } from "preact/hooks";

import { signInWithGoogle } from "../../services/firebase";
import UserContext from "../../services/user";

import Redirect from "../../components/Redirect/Redirect";

import "./Login.scss";

import logo from "../../assets/login.png";

const Login = () => {
  const user = useContext(UserContext);

  if (user) {
    return <Redirect location={"/"} />;
  }

  return (
    <div class="Login">
      <h1 class="Login__title">Leftovers</h1>

      <button onClick={signInWithGoogle} class="Login__btn">
        <div class="Login__btn-text">Login to Leftovers</div>
        <div class="Login__btn-logo">
          <img src={logo} alt="Logo" />
        </div>
      </button>

      <div class="Login__name">
        Made by{" "}
        <a
          href="https://github.com/SamuelHornsey"
          target="_blank"
          rel="noopener noreferrer"
        >
          Samuel Hornsey
        </a>
      </div>
    </div>
  );
};

export default Login;
