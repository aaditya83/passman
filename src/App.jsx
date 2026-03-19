import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Man from './Components/man'
import Footer from './Components/Footer'
import { SpeedInsights } from '@vercel/speed-insights/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <div className='min-h-[60vh]'>
      <Man />
    </div>
    <Footer />
    <SpeedInsights />
    </>
  )
}

export default App
