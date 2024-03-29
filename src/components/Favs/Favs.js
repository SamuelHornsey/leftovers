import { h } from 'preact';

import AuthBase from '../AuthBase/AuthBase';
import Recipe from '../Recipe/Recipe';

import { getFavs, deleteFav } from '../../services/favs';

import './Favs.scss';
import timer from '../../assets/sand-clock.png';

export default class Favs extends AuthBase {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      loading: true
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
  componentWillMount () {
    this._loadRecipes();
  }

  /**
   * Load recipes
   */
  async _loadRecipes() {
    const recipes = await getFavs();
    const loading = false;

    this.setState({
      recipes,
      loading
    });
  }

  /**
   * Remove a recipe
   * @param {*} recipe
   */
  async _remove(recipe) {
    const { id } = recipe;
    await deleteFav(id);
    this._loadRecipes();
  }

  /**
   * Render recipes
   */
  _renderRecipe() {
    const { recipes, loading, error } = this.state;
    const tiles = [];

    if (loading) {
      return (
        <div class="Favs__loading">
          <img src={timer} alt="Loading" />
        </div>
      );
    }

    if (error) {
      return (
        <div class="Favs__none">
          <h4>Oops. Something Went Wrong...</h4>
        </div>
      );
    }

    if (recipes.length === 0) {
      return (
        <div class="Favs__none">
          <h4>No Results...</h4>
        </div>
      );
    }

    recipes.map((recipe, i) => {
      tiles.push(
        <Recipe
          index={i}
          remove={index => this._remove(index)}
          variant={'remove'}
          {...recipe}
        />
      );
    });

    return tiles;
  }

  // Render
  render() {
    return (
      <div class="Favs">
        <h1 class="Favs__title">Favourites</h1>

        {this._renderRecipe()}
      </div>
    );
  }
}
