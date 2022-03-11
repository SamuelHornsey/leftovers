import { h } from 'preact';

import { getRecipesByIngredients } from '../../services/http';

import AuthBase from '../AuthBase/AuthBase';
import Recipe from '../Recipe/Recipe';

import timer from '../../assets/sand-clock.png';

import './Search.scss';

export default class Search extends AuthBase {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      loading: true
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const _ingredients = params.get('ingredients');

    if (!_ingredients) return;

    const ingredients = _ingredients.split(',');

    getRecipesByIngredients(ingredients)
      .then(recipes => this.setState({ recipes, loading: false }))
      .catch(() => this.setState({ error: true, loading: false }));
  }

  _renderRecipe() {
    const { recipes, loading, error } = this.state;
    const tiles = [];

    if (loading) {
      return (
        <div class="Search__loading">
          <img src={timer} alt="Loading" />
        </div>
      );
    }

    if (error) {
      return (
        <div class="Search__none">
          <h4>Oops. Something Went Wrong...</h4>
        </div>
      );
    }

    if (recipes.length === 0) {
      return (
        <div class="Search__none">
          <h4>No Results...</h4>
        </div>
      );
    }

    recipes.map((recipe, i) => {
      tiles.push(<Recipe {...recipe} />);
    });

    return tiles;
  }

  render() {
    return (
      <div class="Search">
        <h1 class="Search__title">Recipe's</h1>

        {this._renderRecipe()}
      </div>
    );
  }
}
