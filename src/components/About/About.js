import { h } from 'preact';

import AuthBase from '../AuthBase/AuthBase';

import './About.scss';

export default class About extends AuthBase {

  /**
   * Component did mount
   */
  componentDidMount () {
    this.checkAuth();
  }

  /**
   * Render
   */
  render() {
    return (
      <div>
        About
      </div>
    );
  }
}