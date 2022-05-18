// TODO: use fluid font sizing and spacing
// TODO: dark mode
// TODO: Github corner link
// TODO: meta tags for link previews
// TODO: robots.txt
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
