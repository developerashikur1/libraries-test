import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ImgBBUpload from './ImbBBUpload'
import { toast } from 'react-toastify'

function App() {
  const [count, setCount] = useState(0)
  const notify = () => toast("Wow so easy!");

  return (
    <>
     <ImgBBUpload />
     <button onClick={notify}>Notify!</button>

    </>
  )
}

export default App
