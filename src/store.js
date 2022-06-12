import { syncedStore, getYjsValue } from '@syncedstore/core'

export const store = syncedStore({
  players: {},
  gameState: {},
  voteOptions: {}
})

export const yDoc = getYjsValue(store)
