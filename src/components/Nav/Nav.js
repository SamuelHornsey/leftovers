import { h } from 'preact';
import { Link } from 'preact-router';

import home from '../../assets/home.png';
import settings from '../../assets/settings.png';
import question from '../../assets/question.png';
import list from '../../assets/list.png';

import './Nav.scss';

const Nav = (props) => {
  const onChange = (e) => {
    props.onChange(e.target.href);
  }

  return (
    <nav class="Nav">
      <ul class="Nav__container">
        <li class="Nav__element Nav__element--heading">
          <h1 class="Nav__heading">Leftovers</h1>
        </li>
        <li class="Nav__element">
          <Link onClick={e => onChange(e)} class="Nav__link" href="/">Home</Link>
          <img src={home} alt="Home" />
        </li>
        <li class="Nav__element">
          <Link onClick={e => onChange(e)} class="Nav__link" href="/list">List</Link>
          <img src={list} alt="List" />
        </li>
        <li class="Nav__element">
          <Link onClick={e => onChange(e)} class="Nav__link" href="/settings">Settings</Link>
          <img src={settings} alt="Settings" />
        </li>
        <li class="Nav__element">
          <Link onClick={e => onChange(e)} class="Nav__link" href="/about">About</Link>
          <img src={question} alt="Questions" />
        </li>
      </ul>
    </nav>
  )
}

export default Nav;