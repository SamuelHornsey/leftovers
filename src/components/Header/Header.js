import { h } from "preact";
import { useState } from "preact/hooks";

import "./Header.scss";

import plus from "../../assets/plus.png";
import triangle from "../../assets/triangle.png";

const Header = (props) => {
  const [exclude, setExclude] = useState(false);
  const [input, setInput] = useState();

  const toggle = () => {
    setExclude(!exclude);
  }

  const onInput = (e) => {
    setInput(e.target.value);
  }

  const add = (e) => {
    if (e.key != 'Enter') {
      return;
    }

    if (input === '') {
      return;
    }

    props.onAdd(input.toLowerCase());
    setInput('');
  }

  const search = () => {
    props.search(exclude);
  }

  return (
    <header class="Header">
      <div class="Header__ingredients">
        <div class="Header__col">
          <input
            onKeyDown={add}
            onInput={onInput}
            value={input}
            class="Header__input"
            name="ingredient"
            type="text"
            placeholder="Ingredients..."
          />
        </div>
        <div class="Header__col">
          <a href="#" onClick={(e) => this._add(e)} class="Header__btn">
            <img src={plus} alt="Plus" />
          </a>
        </div>
      </div>

      <div class="Header__controls">
        <button
          onClick={toggle}
          class={
            exclude
              ? "Header__controls-btn Header__controls-btn--pink"
              : "Header__controls-btn Header__controls-btn--pink Header__controls-btn--disabled"
          }
        >
          Exclude Pantry Essentials
        </button>
        <button
          onClick={search}
          class="Header__controls-btn Header__controls-btn--green"
        >
          <div>Go!</div>
          <div class="Header__controls-triangle">
            <img src={triangle} alt="Go" />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;