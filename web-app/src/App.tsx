import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LoginForm } from './components/auth/LoginForm';
import ResourceList from './components/resources/ResourceList';

import { Header } from './components/layout/Header';


function App() {
  return (
    <>

      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* <Header /> */}
          <Location></Location>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route
                path="/Home"
                element={<ResourceList />}
              />
              <Route
                path="/"
                element={<LoginForm />}
              />
            </Routes>
          </main>
        </div>
      </Router>



    </>




  );


  function Location() {

    const location = useLocation()


    if (location.pathname != "/") {
      return <Header></Header>
    } else {
      return null
    }



  }


}

export default App;
