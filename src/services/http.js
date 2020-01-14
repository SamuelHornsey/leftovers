const API_URL = (process.env.NODE_ENV === 'production') ? 'https://leftovers.samuelhornsey.com' : 'http://localhost:8080';

export function getRecipesByIngredients(ingredients) {
  let search = ingredients[0];

  for (let i = 1; i < ingredients.length; i++) {
    search += `,${ingredients[i]}`;
  }

  return new Promise((resolve, reject) => {
    fetch(
      `${API_URL}/api/recipes/findByIngredients?ingredients=${search}&number=10`
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
      `${API_URL}/api/recipes/${id}/information?includeNutrition=false`
    ).then(res => {
      if (!res.ok) {
        return reject();
      }
      return resolve(res.json());
    });
  });
}
