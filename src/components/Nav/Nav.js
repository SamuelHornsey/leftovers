import { h } from "preact";
import { Link } from "preact-router";

import { logout } from '../../services/auth';

import home from "../../assets/home.png";
import settings from "../../assets/settings.png";
import question from "../../assets/question.png";
import list from "../../assets/list.png";
import logoutIcon from "../../assets/logout.png";
import favourite from "../../assets/favorite.png";

import "./Nav.scss";

const Nav = props => {
  const onChange = e => {
    props.onChange(e.target.href);
  };

  const _logout = e => {
    e.preventDefault();
    logout();
  }

  return (
    <nav class="Nav">
      <ul class="Nav__container">
        <li class="Nav__element Nav__element--heading">
          <h1 class="Nav__heading">Leftovers</h1>
        </li>
        <li class="Nav__element">
          <Link onClick={e => onChange(e)} class="Nav__link" href="/">
            Home
          </Link>
          <img src={home} alt="Home" />
        </li>
        <li class="Nav__element">
          <Link onClick={e => onChange(e)} class="Nav__link" href="/list">
            List
          </Link>
          <img src={list} alt="List" />
        </li>
        <li class="Nav__element">
          <Link onClick={e => onChange(e)} class="Nav__link" href="/favs">
            Favs
          </Link>
          <img src={favourite} alt="Favourite" />
        </li>
        <li class="Nav__element">
          <Link onClick={e => onChange(e)} class="Nav__link" href="/settings">
            Settings
          </Link>
          <img src={settings} alt="Settings" />
        </li>
        <li class="Nav__element">
          <Link onClick={e => onChange(e)} class="Nav__link" href="/about">
            About
          </Link>
          <img src={question} alt="Questions" />
        </li>
        <li class="Nav__element">
          <a onClick={e => _logout(e)} class="Nav__link" href="/about">
            Logout
          </a>
          <img src={logoutIcon} alt="Logout" />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
