import { h } from "preact";
import { useEffect, useContext, useReducer } from "preact/hooks";
import { collection, query, getDocs, onSnapshot } from "firebase/firestore";

import Item from "../../components/Item/Item";

import UserContext from "../../services/user";
import { db } from "../../services/firebase";

import "./List.scss";

const List = () => {
  const user = useContext(UserContext);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { loading: true, ingredients: [], err: false }
  );

  useEffect(() => {
    getDocs(collection(db, `users/${user.uid}/ingredients`))
      .then(docs => {
        const ingredients = [];
        docs.forEach(doc => {
          ingredients.push(doc.data());
        });

        setState({ingredients, loading: false});
      })
      .catch(() => setState({err: true, loading: false}));

    onSnapshot(query(collection(db, `users/${user.uid}/ingredients`)), snapshot => {
      const ingredients = [];

      snapshot.forEach(doc => {
        ingredients.push(doc.data());
      });

      setState({ingredients});
    });
  }, []);

  return (
    <div class="Search">
      <h1 class="Search__title">List</h1>

      {state.ingredients.map((ingredient, key) => {
        return (
          <Item
            index={key}
            title={ingredient.name}
            {...ingredient}
          />
        );
      })}
    </div>
  );
};

export default List;
