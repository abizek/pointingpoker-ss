// TODO: add styles
import { useRef, useState } from 'react'

function App () {
  const [name, setName] = useState('')
  const [value, setValue] = useState()
  const inputRef = useRef()

  const handleSubmit = event => {
    event.preventDefault()
    setName(inputRef.current.value)
  }

  return name
    ? (
      <>
        <h1>{name}</h1>
        {/* TODO: options for fibonacci, t-shirt size */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
          <button key={i} onClick={() => setValue(i)}>
            {i}
          </button>
        ))}
        <br />
        <br />
        {value && ' ' + name + ': ' + value}
      </>
      )
    : (
      <>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type='text' name='name' ref={inputRef} />
          </label>
          <button type='submit'>Join Session</button>
        </form>
      </>
      )
}

export default App
