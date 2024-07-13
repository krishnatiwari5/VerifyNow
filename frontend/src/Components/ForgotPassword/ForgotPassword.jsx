import React, { useState } from 'react'
import "./forgotpassword.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { toast } from 'react-toastify'

import axios  from 'axios'
 


function ForgotPassword() {
    
    const {id, token} = useParams();
    const [userFirstName, setUserFirstName] = useState("")
const [userLastName, setUserLastName] = useState("")
const [userEmail, setUserEmail] = useState("")
const [userPassword, setUserPassword] = useState("")

const navigate = useNavigate();

const handleForgotPasswordSendLink = (event)=> {
    event.preventDefault();
   axios.post(`/api/v1/users/reset-password-link`, 
    {userEmail}
      ).then(response => {
        console.log(response)
        if(response.data.success) {
          toast.success("Password reset link sent to your email")
          navigate("/")
        } 
      }).catch(error => {
    console.log(error)
  
navigate("/")
  })
  
      }




    return (
        <div className="forgotpasswordcon">
        
        <div className="forgotpassword">
        <div className='forgotpasswordpage'>
    <h1>Forgot Password </h1>
    <p>Enter the email address you signed up with to recieve a secure link</p>
         <div className="forgotpasswordleft">
            <form action="" className="forgotpasswordform">
  
  
            <div className="email-con form-div">
        <div className="dumdiv">
      <label htmlFor="email">Email</label>
  <input type="email" required id='email' name='userEmail'  value={userEmail} onChange={(e)=> setUserEmail(e.target.value)}/>
  </div>
  </div>

        <button className='forgotpasswordbtn' onClick={handleForgotPasswordSendLink}>Send</button>
        </form>

        </div>
  <Link to="/signin" className="backtologin">
<IoArrowBackCircleSharp className='backarrow'/>  <p> Back to log in</p>
       </Link>
        </div>
        </div>
  
        </div>
      )
}

export default ForgotPassword