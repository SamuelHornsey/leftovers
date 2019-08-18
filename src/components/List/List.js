import { h } from "preact";

import AuthBase from '../AuthBase/AuthBase';

import './List.scss';

export default class List extends AuthBase {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        List
      </div>
    )
  }
}