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
  const [fName, setFName] = useState("")
  const [customerInfo, setCustomerInfo] = useState({})

  /* 
  const [customerInfo, setCustomerInfo] = useState({ // for testing
    customer_id: 1,
    cu_email: 'customer1@example.com',
    cu_phone: '123-456-7890',
    cu_type: 'I',
    address_id: 1,
    cu_password: 'password'
  })*/



  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} employee={employee} customerInfo={customerInfo} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} setEmployee={setEmployee} setFName={setFName} setCustomerInfo={setCustomerInfo}/>} />
          <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} setEmail={setEmail}/>} />
          <Route path="/manage" element={<Manage loggedIn={loggedIn} employee={employee}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;