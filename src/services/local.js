import { getDB } from './db';

export async function getAllRecipes () {
  console.log('Get all Recipe');
  return;
}

export async function setAllRecipes (recipes) {
  const db = await getDB();
  recipes.forEach(recipe => {
    const { id } = recipe;
    db.put('recipes', id, JSON.stringify(recipe));
  });
}

export async function setRecipe () {
  console.log('Set Recipe');
  return;
}

export async function getRecipe () {
  console.log('Get Recipe');
  return;
}