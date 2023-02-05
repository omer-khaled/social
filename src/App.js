import React from 'react';
import { Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Navbar from './Components/HomePage/Navbar';
import Landing from './Components/Landing';
import Login from './Components/LandingPage/Login';
import Signup from './Components/LandingPage/Signup';
import Profile from './Components/Profile';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/social/' element={<Landing />}>
            <Route path='' element={<Signup />} />
            <Route path='/social/login' element={<Login />} />
          </Route>
          <Route path='/social/Home' element={<Home />} />
          <Route path='/social/:id' element={
            <React.Fragment>
              <Navbar />
              <Profile />
            </React.Fragment>
          } />
        </Routes>
    </div>
  );
}

export default App;
