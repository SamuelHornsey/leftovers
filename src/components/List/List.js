import { h } from 'preact';

import AuthBase from '../AuthBase/AuthBase';
import Item from './Item';

import './List.scss';

// import timer from "../../assets/sand-clock.png";

export default class List extends AuthBase {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      loading: true
    };
  }

  componentWillMount() {
    this.checkAuth();
  }

  render() {
    return (
      <div class="Search">
        <h1 class="Search__title">List</h1>

        <Item title="Apples" status />
      </div>
    );
  }
}
