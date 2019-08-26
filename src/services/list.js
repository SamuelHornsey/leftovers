import { getDB } from './db';

export async function addList(recipe) {
  const db = await getDB();

  db.put('list', recipe);
}

export async function getList () {
  const db = await getDB();

  const list = await db.getAllFromIndex('list', 'id');

  return list;
}