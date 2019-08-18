import { h, Component } from "preact";
import { route } from 'preact-router';
import { isAuthenticated } from '../../services/auth';

export default class AuthBase extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    if (!isAuthenticated()) {
      return route('/login', true);
    }
  }
}