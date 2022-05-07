import {
  syncedStore,
  getYjsValue
} from '@syncedstore/core'

export const store = syncedStore({
  players: {},
  gameState: {}
})

export const yDoc = getYjsValue(store)
