/** @jsxImportSource @emotion/react */
// TODO: add styles
// TODO: dark mode
import { useState } from 'react'
import { Form, PointingPoker } from './components'

const App = () => {
  const [name, setName] = useState(window.localStorage.getItem('name') ?? '')
  const [roomJoined, setRoomJoined] = useState(false)

  return (
    <div
      css={{
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)'
      }}
    >
      {name && roomJoined
        ? <PointingPoker name={name} />
        : <Form name={name} setName={setName} setRoomJoined={setRoomJoined} />}
    </div>
  )
}

export default App
