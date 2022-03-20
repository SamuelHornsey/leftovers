import { h, Component } from "preact";
import { useState, useEffect } from "preact/hooks";
import { route } from "preact-router";

import Header from "../../components/Header/Header";
import Tile from "../../components/Tile/Tile";

import "./Home.scss";

const Home = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    updateUrl();
  }, [ingredients]);

  const updateUrl = () => {
    if (ingredients.length === 0) {
      return route("/", true);
    }

    return route(`/?ingredients=${ingredients.join(",")}`, true);
  };

  const addIngredient = (ingredient) => {
    if (ingredients.includes(ingredient)) {
      return;
    }

    setIngredients([...ingredients, ingredient]);
  };

  const removeIngredient = (index) => {
    setIngredients((ingredients) => {
      return ingredients.filter((value, i) => i !== index);
    });
  };

  const search = (exclude) => {
    if (ingredients.length < 1) {
      return;
    }

    const path = `/search?ingredients=${ingredients.join(",")}`;
    if (exclude) {
      return route(`${path}&exclude=true`, true);
    }
    return route(path, true);
  };

  return (
    <div class="Home">
      <Header search={search} onAdd={addIngredient} />

      <div class="Home__ingredients">
        {ingredients.map((ingredient, i) => (
          <Tile tile={i} remove={removeIngredient} title={ingredient} />
        ))}
      </div>
    </div>
  );
};

export default Home;
