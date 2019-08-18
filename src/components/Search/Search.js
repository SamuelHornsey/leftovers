import { h } from "preact";

import AuthBase from '../AuthBase/AuthBase';

import './Search.scss';

export default class Search extends AuthBase {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div>
        Search
      </div>
    )
  }
}