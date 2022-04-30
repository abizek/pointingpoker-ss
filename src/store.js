import {
  syncedStore,
  getYjsValue
} from '@syncedstore/core'
import { WebsocketProvider } from 'y-websocket'

export const store = syncedStore({
  players: {}
})

const doc = getYjsValue(store)
export const wsProvider = new WebsocketProvider(
  'wss://floating-reef-83846.herokuapp.com',
  'yjs-pointing-poker',
  doc
)
