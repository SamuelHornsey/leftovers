import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { Route } from "preact-router";

import UserContext from "../../services/user";

import Redirect from '../Redirect/Redirect';

const GuardedRoute = (props) => {
  const user = useContext(UserContext);

  return (
    user ? <Route {...props}></Route> : <Redirect location={'/login'}></Redirect>
  )
}

export default GuardedRoute;