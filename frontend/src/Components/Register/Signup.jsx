import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../Register/signup.css"
import { toast } from 'react-toastify'
import axios from "axios"
function Signup() {

const [userFirstName, setUserFirstName] = useState("")
const [userLastName, setUserLastName] = useState("")
const [userEmail, setUserEmail] = useState("")
const [userPassword, setUserPassword] = useState("")

const navigate = useNavigate();

// useEffect(() => {
//   const auth = localStorage.getItem("user")
//   if(auth) {
//     navigate("/")
//   }
// },[])



const collectUserData = (event)=> {
  event.preventDefault();
 axios.post("/api/v1/users/register", 
  {userFirstName, userLastName, userEmail, userPassword}
    ).then(response => {
      console.log(response)
      if(response.data.success) {
        toast.success("You have successfully registered.")
        navigate("/signin")
      }
    }).catch(error => {
  console.log(error)
})

    }


    
// const collectUserData = async (event)=> {
//   event.preventDefault();
//   console.log(userFirstName, userLastName, userEmail, userPassword);
//   let result = await fetch("/api/v1/users/register", {
//     method : "Post",
//     headers : {
//       "Content-Type" : "application/json"
//     },
//     body : JSON.stringify({userFirstName, userLastName, userEmail, userPassword})
//   })
 
//   result = await result.json()
//   console.log(result)
//   toast.success("You have successfully registered.")
//   localStorage.setItem( "user" , JSON.stringify(result) )
//   if(result) {
//     navigate("/")
//   }


// }




  return (
    <div className="signupcon">
    <div className='signup'>
        <div className="signuppage">
            
<div className="signupright">
    <form action="" className="signupform">
                <h1>Welcome</h1>
                <h3>Register for free !</h3>
           
                  <div  className=" user-name name-con form-div">
                  <div className="dumdiv firstname-con">
                    <label htmlFor="firstname">First Name</label>
                 <input type="text"  required id='firstname' name='userFirstName' value={userFirstName} onChange={(e)=> setUserFirstName(e.target.value)}/>
                 </div>
    <div className="dumdiv lastname-con">
    <label htmlFor="lastname">Last Name</label>
    <input type="text" required  id='lastname' name='userLastName' value={userLastName} onChange={(e)=> setUserLastName(e.target.value)}/>
    </div>
    </div>

    <div className="email-con form-div">
      <div className="dumdiv">
    <label htmlFor="email">Email</label>
<input type="email" required id='email' name='userEmail'  value={userEmail} onChange={(e)=> setUserEmail(e.target.value)}/>
</div>
</div>
<div className="password-con form-div">
<div className="dumdiv">
<label htmlFor="password">Password</label>
<input type="password" required id='password'  minLength={8} maxLength={15} name='userPassword'  value={userPassword} onChange={(e)=> setUserPassword(e.target.value)}/>
</div>
</div>
<div className="conf-password-con form-div">
<div className="dumdiv">
<label htmlFor="confpassword">Confirmed Password</label>
<input type="password" id='confpassword' required  minLength={8} maxLength={15}/>
</div>
</div>
<div className="signupinbtn-con">
<button className='signupbtn' type='submit' onClick={collectUserData}>Sign Up</button>
<p>Already A Member ? <Link to="/signin" className='linktext'>Log In</Link></p>
</div>
 </form>
 <div className="or-con">
  <hr />
  OR sign up with
  <hr />
 </div>
 <div className="otherLoginsCon">
 <div className="otherlogin otherlogin-google">
 
  <img className='google-logo otherLoginLogo' src="./public/images/google-black.png" alt="Google Logo" />
  </div>
  <div className="otherlogin ">
  <img className='github-logo otherLoginLogo' src="./public/images/github.png" alt="Github Logo" />
</div>
 </div>
</div>

</div>
</div>
</div>
  )
}

export default Signup