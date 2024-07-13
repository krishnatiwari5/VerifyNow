import React, { useEffect } from 'react'
import "../Navbar/navbar.css"
import {NavLink, useNavigate} from "react-router-dom"
import { FaUserCircle } from "react-icons/fa";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { IoSettings } from "react-icons/io5";


import { RiLogoutCircleFill } from "react-icons/ri";
import axios from 'axios';
import { toast } from 'react-toastify'



function Navbar() {

  

  let loggedInUserName = localStorage.getItem("user");
  let loggedIn = localStorage.getItem("loggedIn")

  
  const navigate = useNavigate();
  const handleLogout = () => {
    axios.get("/api/v1/users/logout").then((response) => {
      console.log(response);
if(response.data.success) {
localStorage.clear();
// loggedIn = "";
  navigate('/')
}
    } ).catch((err) => {
      console.log(err);
    })
  }

 
  return (
    <div className="navbarmaincon">
    <div className="navbarcon"> 
    <div className='navbar'>
        <div className="websitenamenav">
        <img className='websitelogonav' src="./public/images/tick.png" alt="" />
        <p className='websiteName'><NavLink to="/" className="websiteNameLink">VerifyNow</NavLink></p>
 </div>
 <ul className='navoptions'>
  <NavLink to='/about' className="navbarLinks"><li>About Us</li></NavLink>
  <NavLink to='/dashboard' className="navbarLinks"> <li>Dashboard</li></NavLink>
  <NavLink to='/tasks' className="navbarLinks"><li>Tasks</li></NavLink>
  <NavLink to='/clients' className="navbarLinks"> <li>Clients</li></NavLink>
 </ul>

 <ul className='navoptionslogo'>
{/* <IoNotificationsCircleSharp className='navoptionlogo'/> */}
{/* <AiFillMessage className='navoptionlogo'/> */}
<div className={loggedIn ?"usernameloginbtncon"  : ""}>
<NavLink to={loggedIn ? "/" :"/signin"} className="userlogolink"><FaUserCircle className={loggedIn ? "disablenavoptionlogo" : 'navoptionlogo'}  /></NavLink>
{loggedIn ? <span style={{color : "Orange", marginLeft : "10px"}}>{loggedInUserName}</span> : ""}
</div>
{loggedIn ? <button className="userlogolink userlogolinkbtn" onClick={handleLogout} ><RiLogoutCircleFill className='navoptionlogo'/></button>  : ""}
 
<NavLink to="/settings" className="userlogolink settingslogo"><IoSettings className='navoptionlogo'  /></NavLink>

 </ul>

      </div>
    </div>
    </div>
  )
}

export default Navbar