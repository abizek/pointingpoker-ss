// TODO: add styles
// TODO: dark mode
// TODO: hide votes when a new player joins
import { Fragment, useRef, useState, useEffect } from 'react'
import { useSyncedStore } from '@syncedstore/react'
import { store, wsProvider, awareness, clientID } from './store'

const voteOptions = {
  '1 to 10': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  'modified fibonacci': [0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100],
  't-shirt sizes': ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']
}

const App = () => {
  const sharedState = useSyncedStore(store)

  const [name, setName] = useState(window.localStorage.getItem('name') ?? '')
  const setPersistedName = nameValue => {
    if (nameValue === '') return
    window.localStorage.setItem('name', nameValue)
    setName(nameValue)
    sharedState.players[nameValue] = {
      vote: null,
      active: true,
      clientIDs: [clientID] // to associate clientID with player object
    }
  }

  const inputRef = useRef()
  const handleSubmit = event => {
    event.preventDefault()
    setPersistedName(inputRef.current.value)
  }

  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const handleWSConnectionStatusChange = ({ status }) => {
      console.log(status) // logs "connected" or "disconnected"
      const isConnected = status === 'connected'
      setConnected(isConnected)
    }
    wsProvider.on('status', handleWSConnectionStatusChange)

    const handleWSSync = isSynced => {
      if (isSynced && name) {
        // initialise player object on reentry
        sharedState.players[name] = {
          ...(sharedState.players[name] ?? {}),
          active: true,
          clientIDs: [...(sharedState.players[name]?.clientIDs ?? []), clientID]
        }
      }
    }
    wsProvider.on('sync', handleWSSync)

    const handleAwarenessUpdate = ({ removed }) => {
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
    awareness.on('update', handleAwarenessUpdate)

    return () => {
      wsProvider.off('status', handleWSConnectionStatusChange)
      wsProvider.off('sync', handleWSSync)
      awareness.off('update', handleAwarenessUpdate)
    }
  }, [sharedState.players])

  const setVote = voteValue => {
    sharedState.players[name].vote = voteValue
    // show votes if you are the last person to vote
    if (
      Object.keys(sharedState.players).every(
        player => !!sharedState.players[player].vote
      )
    ) {
      sharedState.gameState.showVotes = true
    }
  }

  const kickPlayer = playerName => {
    delete sharedState.players[playerName]
  }

  const clearVotes = () => {
    Object.keys(sharedState.players).forEach(player => {
      sharedState.players[player].vote = null
    })
    sharedState.gameState.showVotes = false
  }

  useEffect(() => {
    if (connected && !sharedState.gameState.voteOptions) {
      sharedState.gameState.voteOptions = '1 to 10'
    }
  }, [connected, sharedState.gameState.voteOptions])

  return (
    <>
      {name
        ? (
          <>
            <h1>{name}</h1>
            {voteOptions[sharedState.gameState.voteOptions ?? '1 to 10'].map(i => (
              <button key={i} onClick={() => setVote(i)}>
                {i}
              </button>
            ))}
            <br />
            <br />
            {connected
              ? (
                <>
                  <button onClick={clearVotes}>Clear Votes</button>
                  &nbsp;
                  <button
                    onClick={() => {
                      sharedState.gameState.showVotes = true
                    }}
                  >
                    Show Votes
                  </button>
                  <br />
                  <br />
                  Vote Options: &nbsp;
                  <select
                    value={sharedState.gameState.voteOptions ?? '1 to 10'}
                    onChange={event => {
                      sharedState.gameState.voteOptions = event.target.value
                    }}
                  >
                    <option value='1 to 10'>1 to 10</option>
                    <option value='modified fibonacci'>modified fibonacci</option>
                    <option value='t-shirt sizes'>t-shirt sizes</option>
                  </select>
                  <br />
                  {Object.keys(sharedState.players).map(playerName => {
                    const vote = sharedState.players[playerName].vote
                    const active = sharedState.players[playerName].active
                    return (
                      playerName && (
                        <Fragment key={playerName}>
                          <br />
                          {`${playerName}${active ? '' : '(left)'}: ${
                            sharedState.gameState.showVotes && vote ? vote : '?'
                          }`}
                          &nbsp;
                          {!active && (
                            <button onClick={() => kickPlayer(playerName)}>
                              Kick
                            </button>
                          )}
                        </Fragment>
                      )
                    )
                  })}
                </>
                )
              : <>Connecting...</>}
          </>
          )
        : (
          <>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input type='text' name='name' ref={inputRef} />
              </label>
              <button type='submit'>Join Session</button>
            </form>
          </>
          )}
    </>
  )
}

export default App
