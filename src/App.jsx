// TODO: add styles
// TODO: dark mode
import { Fragment, useState } from 'react'
import { Form, PointingPoker } from './components'

const App = () => {
  const [name, setName] = useState(window.localStorage.getItem('name') ?? '')
  const [roomJoined, setRoomJoined] = useState(false)

  return (
    <>
      {name && roomJoined
        ? <PointingPoker name={name} />
        : <Form name={name} setName={setName} setRoomJoined={setRoomJoined} />}
    </>
  )
}

export default App
