import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Signup from './signup';
import Manage from './manage';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [employee, setEmployee] = useState(false)
  const [email, setEmail] = useState("")


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} employee={employee} setEmployee={setEmployee} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} setEmployee={setEmployee} />} />
          <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} setEmail={setEmail} setEmployee={setEmployee} />} />
          <Route path="/manage" element={<Manage loggedIn={loggedIn} employee={employee}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;