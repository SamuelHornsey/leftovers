import { route } from "preact-router";

export function login() {
  const client_id =
    "548960858544-jibd56nvadkrujb7gv019fvnnnjfdj5k.apps.googleusercontent.com";
  const redirect_uri =
    process.env.NODE_ENV === "production"
      ? `${window.location.protocol}//${window.location.hostname}/callback`
      : `${window.location.protocol}//${window.location.hostname}:8080/callback`;
  window.location = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&redirect_uri=${redirect_uri}&response_type=token&client_id=${client_id}`;
}

export function isAuthenticated() {
  if (window.localStorage.getItem("access_token")) {
    return true;
  }

  return false;
}

export function getUserInfo() {
  console.log(`Basic ${window.localStorage.getItem("access_token")}`);
  const opts = {
    headers: new Headers({
      Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
    })
  };

  return new Promise((resolve, reject) => {
    fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", opts)
      .then(res => {
        if (res.ok) {
          return resolve(res.json());
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
}

export function logout() {
  window.localStorage.removeItem("access_token");
  window.localStorage.removeItem("token_type");
  window.localStorage.removeItem("scope");
  window.localStorage.removeItem("expires_in");
  route("/login", true);
}
