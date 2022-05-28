/* global CF_PAGES_BRANCH */

import { useRef, useEffect } from 'react'
import randomWords from 'random-words'
import { joinRoom } from '../room'
import { useNavigate, useParams } from 'react-router-dom'
import { Icon } from '@rmwc/icon'
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
  const nonMainBranch =
    (CF_PAGES_BRANCH || import.meta.env.VITE_GIT_CURRENT_BRANCH) !== 'main' &&
    (CF_PAGES_BRANCH || import.meta.env.VITE_GIT_CURRENT_BRANCH)
  const customRoom = nonMainBranch || customRoomParam

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
    // TODO: form validation and error states
    // TODO: remove form?
    <form
      onSubmit={handleSubmit}
      css={{
        width: 'min(350px, 80vw)',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 16px'
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
          icon={<Icon icon='person' />}
          css={{ flexGrow: 1 }}
        />
        {customRoom && <Button type='submit'>Join Session</Button>}
      </div>
      {!customRoom && (
        <>
          <Input
            type='text'
            name='room'
            placeholder='Room (Optional)'
            ref={roomInputRef}
            icon={<Icon icon='room' />}
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
