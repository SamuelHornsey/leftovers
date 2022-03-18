import { h, Component } from 'preact';

import Item from './Item';

import { getList, deleteListItem } from '../../services/list';

import './List.scss';

export default class List extends Component {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      loading: true
    };
  }

  /**
   * Component will mount
   */
  componentWillMount() {
    this._loadList();
  }

  /**
   * Load the list of ingredients
   */
  async _loadList() {
    const ingredients = await getList();
    const loading = false;

    this.setState({
      ingredients,
      loading
    });
  }

  /**
   * Remove an ingredient
   * @param {*} ingredient
   */
  async _remove(ingredient) {
    const { id } = ingredient;
    await deleteListItem(id);
    this._loadList();
  }

  /**
   * Render ingredients
   */
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

  // Render
  render() {
    return (
      <div class="Search">
        <h1 class="Search__title">List</h1>

        {this._renderIngredients()}
      </div>
    );
  }
}
