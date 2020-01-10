const CLIENT_ID = '1sku76lv9g364073u1b50rn3no';

/**
 * Redirect user to oauth login
 */
export function login() {
  const redirect_uri =
    process.env.NODE_ENV === 'production'
      ? `${window.location.protocol}//${window.location.hostname}/callback`
      : `${window.location.protocol}//${window.location.hostname}:8080/callback`;
  window.location = `https://auth.samuelhornsey.com/login?scope=openid+profile&redirect_uri=${redirect_uri}&response_type=token&client_id=${CLIENT_ID}`;
}

/**
 * Check if the user is authenticated
 */
export function isAuthenticated() {
  if (window.localStorage.getItem('access_token')) {
    return true;
  }

  return false;
}

/**
 * Redirect the user to the oauth logout
 */
export function logout() {
  window.localStorage.removeItem('access_token');
  window.localStorage.removeItem('token_type');
  window.localStorage.removeItem('scope');
  window.localStorage.removeItem('expires_in');

  const logout_uri =
    process.env.NODE_ENV === 'production'
      ? `${window.location.protocol}//${window.location.hostname}/login`
      : `${window.location.protocol}//${window.location.hostname}:8080/login`;
      
  window.location = `https://auth.samuelhornsey.com/logout?client_id=${CLIENT_ID}&logout_uri=${logout_uri}`;
}
