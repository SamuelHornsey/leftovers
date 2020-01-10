import { h } from 'preact';

import AuthBase from '../AuthBase/AuthBase';

import './Settings.scss';

export default class Settings extends AuthBase {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.checkAuth();
  }

  render() {
    return (
      <div>
        Settings
      </div>
    );
  }
}