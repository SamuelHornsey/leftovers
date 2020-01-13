import { h } from 'preact';
import { route } from 'preact-router';

import AuthBase from '../AuthBase/AuthBase';

import Header from '../Header/Header';
import Tile from '../Tile/Tile';

import './Home.scss';

export default class Home extends AuthBase {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      ingredients: []
    };
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    this.checkAuth();
  }

  /**
   * Component will mount
   */
  componentWillMount() {
    const params = new URLSearchParams(window.location.search);
    const _ingredients = params.get('ingredients');

    if (!_ingredients) return;

    const ingredients = _ingredients.split(',');

    this.setState({ ingredients });
  }

  /**
   * Push each ingredient to the URL
   */
  _updateUrl() {
    const { ingredients } = this.state;

    if (ingredients.length === 0) {
      route('/', true);
      return;
    }

    let search = ingredients[0];

    for (let i = 1; i < ingredients.length; i++) {
      search += `,${ingredients[i]}`;
    }

    route(`/?ingredients=${search}`, true);
  }

  /**
   * Add an ingredient to the list
   * @param {*} ingredient
   */
  _add(ingredient) {
    const { ingredients } = this.state;

    if (!ingredients.includes(ingredient)) {
      ingredients.push(ingredient);
      this.setState({ ingredients });
    }

    this._updateUrl();
  }

  /**
   * Remove an ingredient from the list
   * @param {*} key
   */
  _remove(key) {
    const { ingredients } = this.state;
    ingredients.splice(key, 1);
    this.setState({ ingredients });

    this._updateUrl();
  }

  /**
   * Render the tiles
   */
  _tiles() {
    const tiles = [];
    const { ingredients } = this.state;

    ingredients.map((ingredient, i) => {
      tiles.push(
        <Tile tile={i} remove={key => this._remove(key)} title={ingredient} />
      );
    });

    return tiles;
  }

  /**
   * Search for the ingredients
   */
  _search() {
    const { ingredients } = this.state;

    if (ingredients.length === 0) {
      return;
    }

    let search = ingredients[0];

    for (let i = 1; i < ingredients.length; i++) {
      search += `,${ingredients[i]}`;
    }

    route(`/search?ingredients=${search}`);
  }

  // Render
  render() {
    return (
      <div class="Home">
        <Header search={() => this._search()} onAdd={ingredient => this._add(ingredient)} />

        <div class="Home__ingredients">
          {
            this._tiles()
          }
        </div>
      </div>
    );
  }
}
