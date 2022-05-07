import { WebsocketProvider } from 'y-websocket'
import { yDoc } from './store'

export const room = { wsProvider: null, awareness: null, clientID: null }

export const joinRoom = roomName => {
  if (roomName === '') return

  // TODO: use webrtc provider and use WS/Turn as fallback
  room.wsProvider = new WebsocketProvider(
    'wss://floating-reef-83846.herokuapp.com', // TODO: use env var
    `yjs-pointing-poker-${roomName}`,
    yDoc
  )
  room.awareness = room.wsProvider.awareness
  room.clientID = room.wsProvider.awareness.clientID
}
