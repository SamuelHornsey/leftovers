import { h, Component } from "preact";

import "./About.scss";

export default class About extends Component {
  /**
   * Render
   */
  render() {
    return (
      <div class="About">
        <h1 class="About__title">About</h1>
        <p class="About__text">
          Leftovers is a useful app to find recipes that much your leftover
          ingredients. For bugs and issues please report on{" "}
          <a
            href="https://github.com/SamuelHornsey/leftovers"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          .
        </p>
        <div class="About__name">
          Made by{" "}
          <a
            href="https://github.com/SamuelHornsey"
            target="_blank"
            rel="noopener noreferrer"
          >
            Samuel Hornsey
          </a>
        </div>{" "}
      </div>
    );
  }
}
