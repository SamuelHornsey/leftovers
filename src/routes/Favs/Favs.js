import { h } from "preact";
import { useReducer, useContext, useEffect } from "preact/hooks";
import { collection, query, getDocs, onSnapshot } from "firebase/firestore";

import UserContext from "../../services/user";
import { db } from "../../services/firebase";

import Recipe from "../../components/Recipe/Recipe";

import "./Favs.scss";
import timer from "../../assets/sand-clock.png";

const Favs = () => {
  const user = useContext(UserContext);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { loading: true, recipes: [], err: false }
  );

  useEffect(() => {
    // Get all recipes
    getDocs(collection(db, `users/${user.uid}/favourites`))
      .then((docs) => {
        const recipes = [];
        docs.forEach((doc) => {
          recipes.push(doc.data());
        });

        setState({ recipes, loading: false });
      })
      .catch(() => setState({ loading: false, err: true }));

    // On recipes update
    onSnapshot(
      query(collection(db, `users/${user.uid}/favourites`)),
      (snapshot) => {
        const recipes = [];
        snapshot.forEach((doc) => {
          recipes.push(doc.data());
        });

        setState({ recipes });
      }
    );
  }, []);

  const recipes = () => {
    if (state.loading) {
      return (
        <div class="Favs__loading">
          <img src={timer} alt="Loading" />
        </div>
      );
    }

    if (state.err) {
      return (
        <div class="Favs__none">
          <h4>Oops. Something Went Wrong...</h4>
        </div>
      );
    }

    if (state.recipes.length === 0) {
      return (
        <div class="Favs__none">
          <h4>No Results...</h4>
        </div>
      );
    }

    return state.recipes.map((recipe, i) => {
      return <Recipe index={i} variant={"remove"} {...recipe} />;
    });
  };

  return (
    <div class="Favs">
      <h1 class="Favs__title">Favourites</h1>

      {recipes()}
    </div>
  );
};

export default Favs;
