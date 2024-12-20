import { useState } from 'react'
// import './App.css'
import { AdminDashboard } from './componant/admin/AdminDashboard'
import { Usershow } from './componant/usershow/userShow'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Test } from './componant/Test/Test';
import { AdminPanel } from './componant/admin/AdminPanel';
import Resource from './componant/Resources/Resource';




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <Router>
    <Routes>

      <Route path='/' element={  <AdminDashboard></AdminDashboard>}/>

      <Route path='/userShow' element={<Usershow></Usershow>}></Route>

      <Route path='/Test' element={<AdminPanel></AdminPanel>}></Route>

      <Route path='/Resource' element={<Resource></Resource>}></Route>

      
    </Routes>
  </Router>

   
    </>
  )
}

export default App
