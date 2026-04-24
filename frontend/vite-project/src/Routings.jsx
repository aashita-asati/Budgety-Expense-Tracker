import React from 'react'
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
}from "react-router-dom";
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';

const Routings = () => {
  return (
    <div>
      <Router >
        <Routes>
          <Route path='/' element={<Root/>} />
          <Route path='/login' exact element={<Login/>} />
          <Route path='/signUp' exact element={<SignUp/>}/>
          <Route path='/dashboard' exact element={<Home/>} />
          <Route path='/income' exact element={<Income/>} />
          <Route path='/expense' exact element={<Expense/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default Routings

const Root=()=>{
  const isAuthenticated= !!localStorage.getItem("token");
  return isAuthenticated?(
    <Navigate to="/dashboard" />
  ):(
    <Navigate to="/login" />
  );
};
