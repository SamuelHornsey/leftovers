import { h, Component } from 'preact';

import { getRecipeById } from '../../services/http';
import { addFavs } from '../../services/favs';

import './Recipe.scss';

export default class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  _expand(e) {
    e.preventDefault();

    if (
      e.target != this.view &&
      e.target != this.favs &&
      e.target != this.list
    ) {
      this.setState({ expanded: !this.state.expanded });
    }
  }

  async _open(e) {
    e.preventDefault();

    if (!this.state.recipe) {
      await getRecipeById(this.props.id).then(recipe => {
        this.setState({ recipe });
      });
    }

    window.open(this.state.recipe.sourceUrl, '_blank');
  }

  async _list(e) {
    e.preventDefault();
    if (!this.state.recipe) {
      await getRecipeById(this.props.id).then(recipe => {
        this.setState({ recipe });
      });
    }

    const { extendedIngredients } = this.state.recipe;

    extendedIngredients.forEach(ingredient => {

    });
  }

  _favs(e) {
    e.preventDefault();
    addFavs(this.props);
  }

  _remove (e) {
    e.preventDefault(e);
    this.props.remove(this.props);
  }

  render() {
    return (
      <div
        onClick={e => this._expand(e)}
        class={this.state.expanded ? 'Recipe Recipe--open' : 'Recipe'}
      >
        <div class="Recipe__container">
          <div class="Recipe__col Recipe__col--hidden">
            <a
              ref={link => (this.view = link)}
              class="Recipe__link"
              href="#"
              onClick={e => this._open(e)}
            >
              View
            </a>
            <a
              ref={link => (this.list = link)}
              class="Recipe__link Recipe__link--list"
              href="#"
              onClick={e => this._list(e)}
            >
              Add to List
            </a>

            {this.props.variant === 'remove' ? (
              <a
                ref={link => (this.favs = link)}
                class="Recipe__link Recipe__link--remove"
                href="#"
                onClick={e => this._remove(e)}
              >
                Remove
              </a>
            ) : (
              <a
                ref={link => (this.favs = link)}
                class="Recipe__link Recipe__link--favs"
                href="#"
                onClick={e => this._favs(e)}
              >
                Add to Favs
              </a>
            )}
          </div>

          <div class="Recipe__col Recipe__col--hidden Recipe__col--missing">
            <span class="Recipe__missing">
              {this.props.missedIngredientCount}
            </span>
            missing ingredient(s)
          </div>

          <div class="Recipe__col">
            <div class="Recipe__title">{this.props.title}</div>
          </div>

          <div class="Recipe__col">
            <div class="Recipe__btn">
              <img src={this.props.image} alt="Image" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
