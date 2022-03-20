import { h } from "preact";
import { useEffect, useReducer } from "preact/hooks";
import { httpsCallable } from "firebase/functions";

import { functions } from "../../services/firebase";

import Recipe from "../../components/Recipe/Recipe";

import timer from "../../assets/sand-clock.png";

import "./Search.scss";

const Search = () => {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { loading: true, recipes: [], err: null }
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ingredients = params.get("ingredients");

    if (!ingredients) {
      setState({ loading: false });
    }

    const getRecipes = httpsCallable(functions, "searchRecipes");

    getRecipes({ ingredients })
      .then((res) => setState({ loading: false, recipes: res.data }))
      .catch(() => setState({ loading: false, err: true }));
  }, []);

  const recipes = () => {
    if (state.loading) {
      return (
        <div class="Search__loading">
          <img src={timer} alt="Loading" />
        </div>
      );
    }

    if (state.err) {
      return (
        <div class="Search__none">
          <h4>Oops. Something Went Wrong...</h4>
        </div>
      );
    }

    if (state.recipes.length === 0) {
      return (
        <div class="Search__none">
          <h4>No Results...</h4>
        </div>
      );
    }

    return state.recipes.map((recipe, i) => {
      return <Recipe {...recipe} />;
    });
  };

  return (
    <div class="Search">
      <h1 class="Search__title">Recipes</h1>

      {recipes()}
    </div>
  );
};

export default Search;
