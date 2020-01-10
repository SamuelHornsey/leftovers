import { h, Component } from 'preact';

import './Header.scss';

import plus from '../../assets/plus.png';
import triangle from '../../assets/triangle.png';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exclude: false
    };
  }

  _add(e) {
    if (e.target === this.input) {
      if (e.key != 'Enter') {
        return;
      }
    }

    if (this.input.value === '') {
      return;
    }

    this.props.onAdd(this.input.value.toLowerCase());
    this.input.value = '';
  }

  _toggleDisabled(e) {
    e.preventDefault();
    this.setState({ exclude: !this.state.exclude });
  }

  _search(e) {
    e.preventDefault();
    this.props.search();
  }

  render() {
    return (
      <header class="Header">
        <div class="Header__ingredients">
          <div class="Header__col">
            <input onKeyDown={e => this._add(e)} ref={input => this.input = input} class="Header__input" name="ingredient" type="text" placeholder="Ingredients..." />
          </div>
          <div class="Header__col">
            <a href="#" onClick={e => this._add(e)} class="Header__btn">
              <img src={plus} alt="Plus" />
            </a>
          </div>
        </div>

        <div class="Header__controls">
          <button onClick={e => this._toggleDisabled(e)} class={this.state.exclude ? 'Header__controls-btn Header__controls-btn--pink' : 'Header__controls-btn Header__controls-btn--pink Header__controls-btn--disabled'}>
            Exclude Pantry Essentials
          </button>
          <button onClick={e => this._search(e)} class="Header__controls-btn Header__controls-btn--green">
            <div>
              Go!
            </div>
            <div class="Header__controls-triangle">
              <img src={triangle} alt="Go" />
            </div>
          </button>
        </div>
      </header>
    );
  }
}