import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import FirstComponent from './components/FirstComponent'
import AnotherCompoonents from './components/AnotherCompoonents'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div> 

       <h2>Hello React!</h2>
       <FirstComponent></FirstComponent>
       <AnotherCompoonents></AnotherCompoonents>
       
       </div>
    </>
  )
}

export default App
