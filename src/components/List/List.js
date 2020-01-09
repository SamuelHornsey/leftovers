import { h } from "preact";

import AuthBase from "../AuthBase/AuthBase";
import Item from './Item';

import { getList } from "../../services/list";

import "./List.scss";

import timer from "../../assets/sand-clock.png";

export default class List extends AuthBase {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      loading: true
    };
  }

  async componentDidMount() {
    this.checkAuth();

    const recipes = await getList();
    const loading = false;

    this.setState({
      recipes,
      loading
    });
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
      tiles.push(
        <Recipe
          id={recipe.id}
          missedIngredientCount={recipe.missedIngredientCount}
          title={recipe.title}
          image={recipe.image}
          key={i}
        />
      );
    });

    return tiles;
  }

  render() {
    return (
      <div class="Search">
        <h1 class="Search__title">List</h1>

        {/* <Item title="Apples" status={true} /> */}

        {/* {this._renderRecipe()} */}
      </div>
    );
  }
}
