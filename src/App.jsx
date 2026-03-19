import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Man from './Components/man'
import Footer from './Components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <div className='min-h-[60vh]'>
      <Man />
    </div>
    <Footer />
    </>
  )
}

export default App
