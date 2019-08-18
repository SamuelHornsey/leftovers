export function login() {
  const client_id = '548960858544-jibd56nvadkrujb7gv019fvnnnjfdj5k.apps.googleusercontent.com';
  window.location = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&redirect_uri=${window.location.protocol}//${window.location.hostname}:8080/callback&response_type=token&client_id=${client_id}`
}

export function isAuthenticated() {
  if (window.localStorage.getItem('access_token')) {
    return true;
  }

  return false;
} 