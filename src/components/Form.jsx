import { useRef, useEffect } from 'react'
import { joinRoom } from '../room'

const CUSTOM_ROOM = ''

export const Form = ({ name, setName, setRoomJoined }) => {
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
    if (CUSTOM_ROOM) {
      roomInputRef.current.value = CUSTOM_ROOM
      joinRoom(CUSTOM_ROOM)
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
          disabled={!!CUSTOM_ROOM}
          ref={roomInputRef}
        />
      </label>
      <br />
      <br />
      <button type='submit'>Join Session</button>
    </form>
  )
}
