// Preact
import { h, Component } from "preact";
import { Router } from "preact-router";

// Components
import Home from "./Home/Home";
import Search from "./Search/Search";
import Login from "./Login/Login";
import Callback from "./Callback/Callback";
import Settings from "./Settings/Settings";
import List from "./List/List";
import About from "./About/About";
import Nav from "./Nav/Nav";
import Favs from "./Favs/Favs";

// Graphics
import hamburger from "../assets/hamburger.png";

// Styles
import "./app.scss";

export default class App extends Component {
  /**
   * Constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  /**
   * Toggle Nav
   * @param {*} e
   */
  _toggle(e) {
    e.preventDefault();
    this.setState({ open: !this.state.open });
  }

  /**
   * When user changes view
   */
  _goTo() {
    this.setState({ open: false });
  }

  /**
   * Render
   */
  render() {
    return (
      <div class="Container">
        <Nav onChange={() => this._goTo()} />

        <div class={this.state.open ? "View View--open" : "View"}>
          <a
            onClick={e => this._toggle(e)}
            href="#"
            class={
              window.location.pathname != "/login"
                ? "Hamburger"
                : "Hamburger Hamburger--hidden"
            }
          >
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
            <Favs path="/favs" />
          </Router>
        </div>
      </div>
    );
  }
}
