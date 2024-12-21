import { openDB } from 'idb'
import type { Timeline } from '../types.d'

const DB_NAME = 'timelineDB'
const STORE_NAME = 'timelines'

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' })
    }
  }
})

// Save a single item
export const setIDBItem = async (key: string, value: Timeline[] | string) => {
  const db = await dbPromise
  await db.put(STORE_NAME, { id: key, value })
}

// Get a single item
export const getIDBItem = async (key: string) => {
  const db = await dbPromise
  const entry = await db.get(STORE_NAME, key)
  return entry?.value
}

// Remove an item
export const removeIDBItem = async (key: string) => {
  const db = await dbPromise
  await db.delete(STORE_NAME, key)
}
