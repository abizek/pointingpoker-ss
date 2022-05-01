// TODO: add styles
// TODO: dark mode
// TODO: hide votes when a new player joins
import { Fragment, useRef, useState, useEffect } from 'react'
import { useSyncedStore } from '@syncedstore/react'
import { store, wsProvider, awareness, clientID } from './store'

const App = () => {
  const sharedState = useSyncedStore(store)

  const [name, setName] = useState(window.localStorage.getItem('name') ?? '')
  const setPersistedName = nameValue => {
    if (nameValue === '') return
    window.localStorage.setItem('name', nameValue)
    setName(nameValue)
    sharedState.players[nameValue] = {
      vote: window.localStorage.getItem('vote'),
      active: true,
      clientID // TODO: make clientID array to support multiple windows
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
          vote: window.localStorage.getItem('vote'),
          active: true,
          clientID // to associate clientID with player object
        }
      }
    }
    wsProvider.on('sync', handleWSSync)

    const handleAwarenessUpdate = ({ removed }) => {
      removed.forEach(removedClientId => {
        const removedPlayer = Object.keys(sharedState.players).find(
          player => sharedState.players[player].clientID === removedClientId
        )
        if (removedPlayer) {
          sharedState.players[removedPlayer].active = false
        }
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
    window.localStorage.setItem('vote', voteValue)
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

  return (
    <>
      {name
        ? (
          <>
            <h1>{name}</h1>
            {/* TODO: options for fibonacci, t-shirt size */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
              <button key={i} onClick={() => setVote(i)}>
                {i}
              </button>
            ))}
            <br />
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
      {connected && (
        <>
          <br />
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
                    <button onClick={() => kickPlayer(playerName)}>Kick</button>
                  )}
                </Fragment>
              )
            )
          })}
        </>
      )}
    </>
  )
}

export default App
