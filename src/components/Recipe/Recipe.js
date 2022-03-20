import { h } from "preact";
import { useState, useContext } from "preact/hooks";
import { httpsCallable } from "firebase/functions";
import { doc, setDoc, deleteDoc, writeBatch } from "firebase/firestore";

import UserContext from "../../services/user";
import { functions, db } from "../../services/firebase";

import "./Recipe.scss";

const Recipe = (props) => {
  const user = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);
  const [recipe, setRecipe] = useState({});

  const expand = () => {
    setExpanded(!expanded);
  };

  const getRecipeById = async (id) => {
    if (recipe.id) {
      console.log("from cache");
      return recipe;
    }

    const func = httpsCallable(functions, "getRecipeById");
    const res = await func({ id });

    setRecipe(res.data);
    return res.data;
  };

  const open = () => {
    getRecipeById(props.id).then((recipe) => {
      window.open(recipe.sourceUrl, "_blank");
    });
  };

  const remove = () => {
    deleteDoc(doc(db, `users/${user.uid}/favourites/${props.id}`));
  };

  const list = () => {
    getRecipeById(props.id).then((recipe) => {
      const batch = writeBatch(db);

      recipe.extendedIngredients.forEach((ingredient) => {
        batch.set(
          doc(db, `users/${user.uid}/ingredients/${ingredient.id}`),
          ingredient
        );
      });

      batch.commit();
    });
  };

  const favs = () => {
    setDoc(doc(db, `users/${user.uid}/favourites/${props.id}`), props);
  };

  return (
    <div onClick={expand} class={expanded ? "Recipe Recipe--open" : "Recipe"}>
      <div class="Recipe__container">
        <div class="Recipe__col Recipe__col--hidden">
          <a class="Recipe__link" onClick={open}>
            View
          </a>
          <a class="Recipe__link Recipe__link--list" href="#" onClick={list}>
            Add to List
          </a>

          {props.variant === "remove" ? (
            <a class="Recipe__link Recipe__link--remove" onClick={remove}>
              Remove
            </a>
          ) : (
            <a class="Recipe__link Recipe__link--favs" onClick={favs}>
              Add to Favs
            </a>
          )}
        </div>

        <div class="Recipe__col Recipe__col--hidden Recipe__col--missing">
          <span class="Recipe__missing">{props.missedIngredientCount}</span>
          missing ingredient(s)
        </div>

        <div class="Recipe__col">
          <div class="Recipe__title">{props.title}</div>
        </div>

        <div class="Recipe__col">
          <div class="Recipe__btn">
            <img src={props.image} alt="Image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
