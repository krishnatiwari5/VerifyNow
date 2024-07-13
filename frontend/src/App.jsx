
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from "./Components/Register/Signup"
import Signin from "./Components/Register/Signin"
import HomePage from './Components/HomePage/HomePage'
import Navbar from './Components/Navbar/Navbar'
import SrDenied from './Components/SecureRoute/SrDenied'
import SrAccess from './Components/SecureRoute/SrAccess'
import AboutUs from './Components/AboutUs/AboutUs'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import ErrorPage from './Components/ErrorPage/ErrorPage'
import Dashboard from './Components/Dashboard/Dashboard'
import Tasks from './Components/Tasks/Tasks'
import Settings from './Components/Settings/Settings'
import Clients from './Components/Clients/Clients'

import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


function App() {

  let loggedIn = localStorage.getItem("loggedIn");
  let userType = localStorage.getItem("userType");


  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element= {<HomePage/>} />
      {/* <Route path='/' element= {<SrAccess/>} /> */}
      <Route path='/register' element = {<Signup/>} />
      <Route path='/signin' element = {<Signin/>} />
      <Route path='/about' element = {<AboutUs/>} />
      <Route path='/dashboard' element = {<Dashboard/>} />
      <Route path='/tasks' element = {<Tasks/>} />
      <Route path='/clients' element = {<Clients/>} />
      <Route path='/settings' element = {<Settings/> } />
      {/* <Route path='/dashboard' element = {loggedIn ? <SrAccess/> : <SrDenied/> } />
      <Route path='/tasks' element = {loggedIn ? <SrAccess/> : <SrDenied/> } />
      <Route path='/settings' element = {loggedIn ? <SrAccess/> : <SrDenied/> } /> */}

      <Route path='/forgot-password' element = {<ForgotPassword/>} />
      <Route path='/reset-password/:id/:token' element = {<ResetPassword/>} />
      <Route path='*' element = {<ErrorPage/>} />
     
     
     </Routes>
     <ToastContainer position="top-left" autoClose={3000} />
     </BrowserRouter>
    </>
  ) 
}

export default App
