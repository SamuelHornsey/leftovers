import { h, Component } from "preact";
import { Router } from "preact-router";
import { route } from "preact-router";

import "./app.scss";

import Home from "./Home/Home";
import Search from "./Search/Search";
import Login from "./Login/Login";
import Callback from "./Callback/Callback";
import Settings from "./Settings/Settings";
import List from "./List/List";
import About from "./About/About";

import hamburger from '../assets/hamburger.png';
import home from '../assets/home.png';
import settings from '../assets/settings.png';
import question from '../assets/question.png';
import list from '../assets/list.png';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
  }

  _toggle(e) {
    e.preventDefault();
    this.setState({ open: !this.state.open });
  }

  _goTo(e) {
    e.preventDefault();
    route(e.target.href, true);
    this.setState({ open: false });
  }

  render() {
    return (
      <div class="Container">
        <nav class="Nav">
          <ul class="Nav__container">
            <li class="Nav__element Nav__element--heading">
              <h1 class="Nav__heading">Leftovers</h1>
            </li>
            <li class="Nav__element">
              <a onClick={e => this._goTo(e)} class="Nav__link" href="/">Home</a>
              <img src={home} alt="Home" />
            </li>
            <li class="Nav__element">
              <a onClick={e => this._goTo(e)} class="Nav__link" href="/list">List</a>
              <img src={list} alt="List" />
            </li>
            <li class="Nav__element">
              <a onClick={e => this._goTo(e)} class="Nav__link" href="/settings">Settings</a>
              <img src={settings} alt="Settings" />
            </li>
            <li class="Nav__element">
              <a onClick={e => this._goTo(e)} class="Nav__link" href="/about">About</a>
              <img src={question} alt="Questions" />
            </li>
          </ul>
        </nav>

        <div class={this.state.open ? "View View--open" : "View"}>
          <a onClick={e => this._toggle(e)} href="#" class="Hamburger">
            <img src={hamburger} alt="Menu" />
          </a>
          <Router>
            <Home path="/" />
            <Search path="/search" />
            <Login path="/login" />
            <Callback path="/callback" />
            <Settings path="/settings" />
            <About path="/about" />
            <List path="/list" />
          </Router>
        </div>

      </div>
    );
  }
}
