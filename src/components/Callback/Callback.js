import { h } from 'preact';
import { route } from 'preact-router';

import { isAuthenticated } from '../../services/auth';

const Callback = () => {
  const query = new URLSearchParams(window.location.hash.replace('#', ''));

  query.forEach((entry, key) => {
    window.localStorage.setItem(key, entry);
  });

  if (isAuthenticated()) {
    return route('/', true);
  }
  return route('/login', true);
  
};

export default Callback;