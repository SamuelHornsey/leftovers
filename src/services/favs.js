import { getDB } from './db';

export async function addFavs(recipe) {
  const db = await getDB();

  db.put('favs', recipe);
}

export async function getFavs () {
  const db = await getDB();
  return await db.getAllFromIndex('favs', 'id');
}

export async function deleteFav (id) {
  const db = await getDB();
  await db.delete('favs', id);
}