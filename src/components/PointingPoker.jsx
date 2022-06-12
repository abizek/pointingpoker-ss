import { useState, useEffect } from 'react'
import { useSyncedStore } from '@syncedstore/react'
import { store } from '../store'
import { room } from '../room'
import { Menu, ScoreBoard, ShareSessionLink, VoteButtonGroup } from '.'

export const PointingPoker = ({ name }) => {
  const sharedState = useSyncedStore(store)

  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const { wsProvider, awareness, clientID } = room
    const onConnectionStatusChange = ({ status }) => {
      if (status !== 'connected') setConnected(false)
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

        if (!sharedState.gameState.selectedVoteOptionsLabel) {
          sharedState.gameState.selectedVoteOptionsLabel = '0 to 10' // default
        }
        sharedState.voteOptions['0 to 10'] = [
          0,
          0.5,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10
        ]
        sharedState.voteOptions['Modified fibonacci'] = [
          0.5,
          1,
          2,
          3,
          5,
          8,
          13,
          20,
          40,
          100
        ]
        sharedState.voteOptions['T-shirt sizes'] = [
          'XS',
          'S',
          'M',
          'L',
          'XL',
          '2XL',
          '3XL'
        ]
        setConnected(true)
      }
    }
    wsProvider.on('sync', onSync)

    const onAwarenessUpdate = ({ removed }) => {
      removed.forEach(removedClientId => {
        Object.keys(sharedState.players).forEach(player => {
          const index = sharedState.players[player].clientIDs.indexOf(
            removedClientId
          )
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
    <main css={{ padding: '24px', width: 'min(462px, 80vw)' }}>
      {/* // TODO: make name editable? */}
      <header
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}
      >
        <h1 css={{ margin: 0 }}>{name}</h1>
        <ShareSessionLink />
      </header>
      {connected
        ? (
          <>
            <VoteButtonGroup name={name} />
            <Menu />
            <ScoreBoard />
          </>
          )
        : (
          <>Connecting...</>
          )}
    </main>
  )
}
