const API_KEY = "365472e17c15489c92783ea1dd0d282c";
const API_URL = "api.spoonacular.com";

export function getRecipesByIngredients(ingredients) {
  let search = ingredients[0];

  for (let i = 1; i < ingredients.length; i++) {
    search += `,${ingredients[i]}`;
  }

  return fetch(`https://${API_URL}/recipes/findByIngredients?ingredients=${search}&number=10&apiKey=${API_KEY}`)
    .then(res => res.json());
}

export function getRecipeById(id) {
  return fetch(`https://${API_URL}/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`)
    .then(res => res.json());
}

