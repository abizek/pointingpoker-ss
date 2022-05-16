// TODO: use fluid font sizing and spacing
// TODO: dark mode
import { useState } from 'react'
import { Form, PointingPoker, Layout } from './components'

const App = () => {
  const [name, setName] = useState(window.localStorage.getItem('name') ?? '')
  const [roomJoined, setRoomJoined] = useState(false)

  return (
    <Layout>
      {
        name && roomJoined
          ? <PointingPoker name={name} />
          : <Form name={name} setName={setName} setRoomJoined={setRoomJoined} />
      }
    </Layout>
  )
}

export default App
