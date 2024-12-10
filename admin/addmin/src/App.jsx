import { useState } from 'react'
// import './App.css'
import { AdminDashboard } from './componant/admin/AdminDashboard'
import { Usershow } from './componant/usershow/userShow'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <Router>
    <Routes>

      <Route path='/' element={  <AdminDashboard></AdminDashboard>}/>

      <Route path='/userShow' element={<Usershow></Usershow>}></Route>

      
    </Routes>
  </Router>

   
    </>
  )
}

export default App
