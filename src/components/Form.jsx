import { useRef, useEffect } from 'react'
import randomWords from 'random-words'
import { joinRoom } from '../room'
import { useParams } from 'react-router-dom'
import { CUSTOM_ROOM } from '../../config.json'

export const Form = ({ name, setName, setRoomJoined }) => {
  const { customRoom: customRoomParam } = useParams()

  const setPersistedName = name => {
    if (name.trim() === '') return

    setName(name)
    window.localStorage.setItem('name', name)
  }

  const nameInputRef = useRef()
  const roomInputRef = useRef()

  const handleSubmit = async event => {
    event.preventDefault()
    joinRoom(roomInputRef.current.value)
    setRoomJoined(true)
    setPersistedName(nameInputRef.current.value)
  }

  useEffect(() => {
    // custom room support
    const customRoom = CUSTOM_ROOM || customRoomParam
    if (customRoom) {
      roomInputRef.current.value = customRoom
      joinRoom(customRoom)
      setRoomJoined(true)
    }
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type='text' name='name' defaultValue={name} ref={nameInputRef} />
      </label>
      <br />
      <br />
      <label>
        Room:
        <input
          type='text'
          name='room'
          disabled={!!(CUSTOM_ROOM || customRoomParam)}
          ref={roomInputRef}
        />
      </label>
      &nbsp;
      <button
        type='button'
        onClick={() => {
          roomInputRef.current.value = randomWords()
        }}
      >
        Random
      </button>
      <br />
      <br />
      <button type='submit'>Create/Join Session</button>
    </form>
  )
}
