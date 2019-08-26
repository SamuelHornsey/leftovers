const API_KEY = "3e9410c7d40a4f98bf34f1a094e8c2d2";
const API_URL = "api.spoonacular.com";

export function getRecipesByIngredients(ingredients) {
  let search = ingredients[0];

  for (let i = 1; i < ingredients.length; i++) {
    search += `,${ingredients[i]}`;
  }

  return new Promise((resolve, reject) => {
    fetch(
      `https://${API_URL}/recipes/findByIngredients?ingredients=${search}&number=10&apiKey=${API_KEY}`
    ).then(async res => {
      if (!res.ok) {
        return reject();
      }

      return resolve(res.json());
    });
  });
}

export function getRecipeById(id) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://${API_URL}/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`
    ).then(res => {
      if (!res.ok) {
        return reject();
      }
      return resolve(res.json());
    });
  });
}
