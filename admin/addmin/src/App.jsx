import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { AdminDashboard } from './admin/AdminDashboard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <AdminDashboard></AdminDashboard>
    </>
  )
}

export default App
