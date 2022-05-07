// TODO: add styles
// TODO: dark mode
import { Fragment, useState } from 'react'
import { Form, PointingPokerSection } from './components'

const App = () => {
  // TODO: maybe add random session generator?
  const [name, setName] = useState(window.localStorage.getItem('name') ?? '')
  const [roomJoined, setRoomJoined] = useState(false)

  return (
    <>
      {name && roomJoined
        ? <PointingPokerSection name={name} />
        : <Form name={name} setName={setName} setRoomJoined={setRoomJoined} />}
    </>
  )
}

export default App
