import { useRef, useEffect } from 'react'
import randomWords from 'random-words'
import { joinRoom } from '../room'
import { useNavigate, useParams } from 'react-router-dom'
import '@material/mwc-icon/mwc-icon.js'
import { CUSTOM_ROOM } from '../../config.json'
import { Button, Input } from '.'

export const Form = ({ name, setName, setRoomJoined }) => {
  const setPersistedName = name => {
    if (name.trim() === '') return

    setName(name)
    window.localStorage.setItem('name', name)
  }

  const nameInputRef = useRef()
  const roomInputRef = useRef()

  const navigate = useNavigate()

  const { customRoom: customRoomParam } = useParams()
  const customRoom = CUSTOM_ROOM || customRoomParam

  const handleSubmit = async event => {
    event.preventDefault()
    const nameValue = nameInputRef.current.value
    if (!nameValue) {
      nameInputRef.current.focus()
      return
    }
    setPersistedName(nameValue)

    if (customRoom || !roomInputRef.current.value) {
      return
    }
    navigate(`/${roomInputRef.current.value}`)
  }

  useEffect(() => {
    // custom room support
    if (customRoom) {
      joinRoom(customRoom)
      setRoomJoined(true)
    }
  }, [customRoomParam])

  return (
    <form
      onSubmit={handleSubmit}
      css={{
        width: 'min(350px, 80vw)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <h4 css={{ textAlign: 'center', marginBottom: 32, marginTop: 0 }}>
        {customRoom ? 'Join' : 'Create'} Pointing Session
      </h4>
      <div
        css={{
          display: 'flex',
          columnGap: 12,
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        <Input
          type='text'
          name='name'
          placeholder='Name'
          defaultValue={name}
          ref={nameInputRef}
          icon={<mwc-icon>person</mwc-icon>}
          css={{ flexGrow: 1 }}
        />
        {customRoom && <Button type='submit'>Join Session</Button>}
      </div>
      {!customRoom && (
        <>
          <Input
            type='text'
            name='room'
            placeholder='Room'
            ref={roomInputRef}
            icon={<mwc-icon>room</mwc-icon>}
            css={{ flexGrow: 1 }}
          />
          <Button
            type='submit'
            css={{ display: 'block', margin: '16px auto 0' }}
            onClick={() => {
              if (!roomInputRef.current.value) {
                roomInputRef.current.value = randomWords({
                  exactly: 2,
                  join: '-'
                })
              }
            }}
          >
            Create session
          </Button>
        </>
      )}
    </form>
  )
}
