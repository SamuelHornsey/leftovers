import { getDB } from './db';

export async function addFavs(recipe) {
  const db = await getDB();

  db.put('favs', recipe);
}

export async function getFavs () {
  const db = await getDB();

  const list = await db.getAllFromIndex('favs', 'id');

  return list;
}