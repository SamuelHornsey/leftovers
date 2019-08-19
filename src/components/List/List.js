import { h } from "preact";

import AuthBase from '../AuthBase/AuthBase';

import './List.scss';

export default class List extends AuthBase {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    this.checkAuth();
  }

  render() {
    return (
      <div>
        List
      </div>
    )
  }
}