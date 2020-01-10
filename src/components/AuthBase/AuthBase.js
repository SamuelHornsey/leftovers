import { h, Component } from 'preact';
import { route } from 'preact-router';
import { isAuthenticated } from '../../services/auth';

export default class AuthBase extends Component {

  /**
   * Check that user is authenticated
   */
  checkAuth () {
    if (!isAuthenticated()) {
      return route('/login', true);
    }
  }
}