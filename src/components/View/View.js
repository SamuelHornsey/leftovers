import { h } from "preact";

// Graphics
import hamburger from "../../assets/hamburger.png";

import "./View.scss";

const View = (props) => {
  return (
    <div class={props.open ? "View View--open" : "View"}>
      <a
        onClick={props.toggleNav}
        href="#"
        class={props.user ? "Hamburger" : "Hamburger Hamburger--hidden"}
      >
        <img src={hamburger} alt="Menu" />
      </a>
      {props.children}
    </div>
  );
};

export default View;
