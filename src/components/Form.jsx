import { useRef } from 'react'
import { joinRoom } from '../room'

export const Form = ({ setName }) => {
  const setPersistedName = name => {
    if (name.trim() === '') return

    setName(name)
    window.localStorage.setItem('name', name)
  }

  const nameInputRef = useRef()
  const roomInputRef = useRef()

  const handleSubmit = async event => {
    event.preventDefault()
    window.localStorage.setItem('room', roomInputRef.current.value)
    await joinRoom(roomInputRef.current.value)
    setPersistedName(nameInputRef.current.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type='text' name='name' ref={nameInputRef} />
      </label>
      <br />
      <br />
      <label>
        Room:
        <input type='text' name='room' ref={roomInputRef} />
      </label>
      <br />
      <br />
      <button type='submit'>Join Session</button>
    </form>
  )
}
