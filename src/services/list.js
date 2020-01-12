import { getDB } from './db';

export async function addList(ingredient) {
  const db = await getDB();
  db.put('list', ingredient);
}

export async function addMultipleList(ingredients) {
  const db = await getDB();

  const tx = db.transaction('list', 'readwrite');

  ingredients.forEach(async ingredient => {
    const _ = await tx.store.get(ingredient.id);

    if (!_) {
      tx.store.add(ingredient);
    }
  });

  await tx.done;
}

export async function getList() {
  const db = await getDB();
  return await db.getAllFromIndex('list', 'id');
}

export async function deleteListItem(id) {
  const db = await getDB();
  await db.delete('list', id);
}
