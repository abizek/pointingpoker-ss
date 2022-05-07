// TODO: add styles
// TODO: dark mode
import { Fragment, useState, useEffect } from 'react'
import { Form, PointingPokerSection } from './components'
import { joinRoom } from './room'

const App = () => {
  // TODO: maybe add random session generator?
  // TODO: revisit name state logic
  const [name, setName] = useState('')

  useEffect(() => {
    const room = window.localStorage.getItem('room')
    if (room) {
      ;(async () => {
        await joinRoom(room)
        setName(window.localStorage.getItem('name') ?? '')
      })()
    }
  }, [])

  return (
    <>
      {name ? <PointingPokerSection name={name} /> : <Form setName={setName} />}
    </>
  )
}

export default App
