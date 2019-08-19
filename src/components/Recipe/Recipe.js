import { h, Component } from "preact";

import { getRecipeById } from '../../services/http';

import './Recipe.scss';

export default class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    }
  }

  _expand(e) {
    e.preventDefault();
    this.setState({ expanded: !this.state.expanded });
    getRecipeById(this.props.id)
      .then(recipe => {
        const { sourceUrl } = recipe;
        this.setState({ sourceUrl });
      });
  }

  _open (e) {
    e.preventDefault();
    window.open(this.state.sourceUrl, '_blank');
  }

  render() {
    return (
      <div onClick={e => this._expand(e)} class={this.state.expanded ? "Recipe Recipe--open" : "Recipe"}>
        <div class="Recipe__container">
          <div class="Recipe__col Recipe__col--hidden">
            <a class="Recipe__link" href="#" onClick={e => this._open(e)}>
              View >>>
            </a>
          </div>
          <div class="Recipe__col">
            <div class="Recipe__title">
              {
                this.props.title
              }
            </div>
          </div>

          <div class="Recipe__col">
            <div class="Recipe__btn">
              <img src={this.props.image} alt="Image" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}