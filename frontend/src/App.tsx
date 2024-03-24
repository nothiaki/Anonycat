import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const handleCount = () => {
    setCount(count + 1);
  }

  return (
    <>
      <h1>{ count }</h1>
      <button onClick={handleCount}></button>
    </>
  )
}

export default App
