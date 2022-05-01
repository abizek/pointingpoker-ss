// TODO: add styles
// TODO: dark mode
// TODO: hide votes until shown with show votes button
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
      vote: null,
      active: true,
      clientID
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
          vote: null,
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
    // TODO: persist vote
    sharedState.players[name].vote = voteValue
  }

  const kickPlayer = playerName => {
    delete sharedState.players[playerName]
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
      {connected &&
        Object.keys(sharedState.players).map(playerName => {
          const vote = sharedState.players[playerName].vote
          const active = sharedState.players[playerName].active
          return (
            playerName && (
              <Fragment key={playerName}>
                <br />
                {`${playerName}${active ? '' : '(left)'}: ${vote}`}
                &nbsp;
                {!active && (
                  <button onClick={() => kickPlayer(playerName)}>Kick</button>
                )}
              </Fragment>
            )
          )
        })}
    </>
  )
}

export default App
