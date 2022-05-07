import { useState, useEffect } from 'react'
import { useSyncedStore } from '@syncedstore/react'
import { store } from '../store'
import { room } from '../room'
import { Menu, ScoreBoard, VoteOptionsButtonGroup } from './'

export const PointingPokerSection = ({ name }) => {
  const sharedState = useSyncedStore(store)

  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const { wsProvider, awareness, clientID } = room
    const onConnectionStatusChange = ({ status }) => {
      console.log(status) // logs "connected" or "disconnected"
      const isConnected = status === 'connected'
      setConnected(isConnected)
    }
    wsProvider.on('status', onConnectionStatusChange)

    const onSync = isSynced => {
      if (isSynced && name) {
        if (!sharedState.players[name]) {
          sharedState.gameState.showVotes = false // hide votes if new player joins
        }

        // create/update player object on join/reentry
        sharedState.players[name] = {
          vote: null,
          ...(sharedState.players[name] ?? {}),
          active: true,
          clientIDs: [...(sharedState.players[name]?.clientIDs ?? []), clientID]
        }

        if (!sharedState.gameState.voteOptions) {
          sharedState.gameState.voteOptions = '1 to 10' // default vote options
        }
      }
    }
    wsProvider.on('sync', onSync)

    const onAwarenessUpdate = ({ removed }) => {
      removed.forEach(removedClientId => {
        Object.keys(sharedState.players).forEach(player => {
          const index = sharedState.players[player].clientIDs.indexOf(removedClientId)
          if (index > -1) {
            sharedState.players[player].clientIDs.splice(index, 1)
            if (sharedState.players[player].clientIDs.length === 0) {
              sharedState.players[player].active = false
            }
          }
        })
      })
    }
    awareness.on('update', onAwarenessUpdate)

    return () => {
      wsProvider.off('status', onConnectionStatusChange)
      wsProvider.off('sync', onSync)
      awareness.off('update', onAwarenessUpdate)
    }
  }, [sharedState.players])

  return (
    <>
      {/* // TODO: make name editable? */}
      <h1>{name}</h1>
      {connected
        ? (
          <>
            <VoteOptionsButtonGroup name={name} />
            <br />
            <br />
            <Menu />
            <br />
            <ScoreBoard />
          </>
          )
        : (
          <>Connecting...</>
          )}
    </>
  )
}
