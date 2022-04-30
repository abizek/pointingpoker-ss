// TODO: add styles
// TODO: dark mode
// TODO: hide votes until shown with show votes button
import { Fragment, useRef, useState, useEffect } from 'react'
import { useSyncedStore } from '@syncedstore/react'
import { store, wsProvider } from './store'

const App = () => {
  const [name, setName] = useState(window.localStorage.getItem('name') ?? '')
  const setPersistedName = (nameValue) => {
    window.localStorage.setItem('name', nameValue)
    setName(nameValue)
  }

  const inputRef = useRef()
  const handleSubmit = event => {
    event.preventDefault()
    setPersistedName(inputRef.current.value)
  }

  const [connected, setConnected] = useState(false)

  useEffect(() => {
    wsProvider.on('status', event => {
      console.log(event.status) // logs "connected" or "disconnected"
      if (event.status === 'connected') {
        setConnected(true)
      } else {
        setConnected(false)
      }
      // TODO: handle disconnected event
      // TODO: add player active flag, modify it on page-lifecycle and add option to kick user
    })
  }, [])

  const sharedState = useSyncedStore(store)

  const setVote = (voteValue) => {
    // TODO: persist vote
    sharedState.players[name] = voteValue
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
      {connected && Object.keys(sharedState.players).map(playerName => {
        const vote = sharedState.players[playerName]
        return (
          <Fragment key={playerName}>
            <br />
            {playerName + ': ' + vote}
          </Fragment>
        )
      }
      )}
    </>
  )
}

export default App
