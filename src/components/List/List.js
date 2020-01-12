import { h } from "preact";

import AuthBase from "../AuthBase/AuthBase";
import Item from "./Item";

import { getList, deleteListItem } from "../../services/list";

import "./List.scss";

import timer from "../../assets/sand-clock.png";

export default class List extends AuthBase {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      loading: true
    };
  }

  componentDidMount() {
    this.checkAuth();
  }

  componentWillMount() {
    this._loadList();
  }

  async _loadList() {
    const ingredients = await getList();
    const loading = false;

    this.setState({
      ingredients,
      loading
    });
  }

  async _remove(ingredient) {
    const { id } = ingredient;
    await deleteListItem(id);
    this._loadList();
  }

  _renderIngredients() {
    const ingredients = [];

    this.state.ingredients.map((ingredient, i) => {
      const { name } = ingredient;
      ingredients.push(
        <Item
          index={i}
          title={name}
          remove={ingredient => this._remove(ingredient)}
          {...ingredient}
        />
      );
    });

    return ingredients;
  }

  render() {
    return (
      <div class="Search">
        <h1 class="Search__title">List</h1>

        {this._renderIngredients()}
      </div>
    );
  }
}
