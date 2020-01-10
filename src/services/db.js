import { openDB } from 'idb';

export async function getDB() {
  const db = await openDB('leftovers', '2', {
    upgrade(db) {
      // const recipes = db.createObjectStore('recipes'); for later
      const favs = db.createObjectStore('favs', {
        keyPath: 'id'
      });
      const list = db.createObjectStore('list', {
        keyPath: 'id'
      });

      favs.createIndex('id', 'id');
      list.createIndex('id', 'id');
    }
  });

  return db;
}
