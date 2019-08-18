import { h } from "preact";

import AuthBase from '../AuthBase/AuthBase';

import './About.scss';

export default class About extends AuthBase {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div>
        About
      </div>
    )
  }
}