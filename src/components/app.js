// Preact
import { h } from "preact";
import { useState } from "preact/hooks";
import { Router, Route } from "preact-router";
import { onAuthStateChanged } from "firebase/auth";

// Components
import Nav from "./Nav/Nav";
import GuardedRoute from "./GuardedRoute/GuardedRoute";
import View from "./View/View";

// Views
import Home from "../routes/Home/Home";
import Search from "../routes/Search/Search";
import Login from "../routes/Login/Login";
import List from "../routes/List/List";
import About from "../routes/About/About";
import Favs from "../routes/Favs/Favs";

// Services
import UserContext from "../services/user";
import { auth } from "../services/firebase";

// Styles
import "./app.scss";

const App = () => {
  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  const toggleNav = () => {
    setOpen(!open);
  };

  return (
    <div class="Container">
      <Nav toggleNav={toggleNav} />
      <View toggleNav={toggleNav} user={user} open={open}>
        <UserContext.Provider value={user}>
          <Router>
            <GuardedRoute path="/" component={Home} />
            <Route path="/login" component={Login} />
            <GuardedRoute path="/search" component={Search} />
            <GuardedRoute path="/about" component={About} />
            <GuardedRoute path="/list" component={List} />
            <GuardedRoute path="/favs" component={Favs} />
          </Router>
        </UserContext.Provider>
      </View>
    </div>
  );
};

export default App;