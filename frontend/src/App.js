import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Tasks from './components/Tasks';


function App() {

  const isAuthenticated = !!localStorage.getItem("access");

  return (
    <Router>
      <Routes>
        <Route 
        path = "/"
        element = {isAuthenticated ? <Tasks/> : <Navigate to = "/login" />}>
        </Route>
        <Route path = "/register" element = {<Register />} />
        <Route path = "/login" element = {<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
