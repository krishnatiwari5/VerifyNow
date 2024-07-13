import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify'
import "../Register/signin.css"
import { auth, provider } from '../../../auth/fbConfig';
import {signInWithPopup} from "firebase/auth";
// import {setCookie} from "react-cookie"

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function Signin() {

 
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const navigate = useNavigate()


  const [visible, setVisiblity] = useState(false);


  const handlePasswordVisibilityAndPassword = () => {
    setVisiblity(visiblity => !visiblity);
  }


  // useEffect(() => {
  //   const auth = localStorage.getItem("user")
  //   if(auth) {
  //     navigator("/")
  //   }
  // },[])  


const singInwithGoogle = ()=> {

signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    toast.success("Your login was successful.")

    const user = result.user;
    const userFullName = user.displayName;
    const userFirstName = userFullName.substring(0, userFullName.indexOf(" "));
console.log(userFirstName);

if(user) {
  // setCookie("accessToken", token);
  localStorage.setItem("user", userFirstName)
  localStorage.setItem("loggedIn", true);
  navigate("/")
}
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    // const email = error.customData.email;
    // The AuthCredential type that was used.
    // const credential = provider.credentialFromError(error);
    // ...
  });

}

  const handleLogin = async (e) => { 
    e.preventDefault();
    axios.post("/api/v1/users/signin",  
      {userEmail, userPassword} 
        ).then(response => {

          console.log(response)
          toast.success("Your login was successful.")

          if(response.data.success) {
            localStorage.setItem("user", response.data.data.userFirstName)
            localStorage.setItem("userType", response.data.data.userType)
            localStorage.setItem("loggedIn", true);
navigate("/")
          }
        }).catch(error => {
      console.log(error)
    })

    // if(result.userEmail) {
    //   localStorage.setItem("user", JSON.stringify(result))
    //   navigate("/")
    // }  else {
    //   toast.error("Please enter correct details")
    // }
    

  }

    return (
      <div className="signincon">
      
      <div className="signin">
      <div className='signinpage'>
  <h1>Welcome back !</h1>
       <div className="signinleft">
          <form action="" className="signinform">


          <div className="email-con form-div">
      <div className="dumdiv">
    <label htmlFor="email">Email</label>
<input type="email" required id='email' name='userEmail'  value={userEmail} onChange={(e)=> setUserEmail(e.target.value)}/>
</div>
</div>
<div className="password-con form-div">
<div className="dumdiv passwordfieldcon">
<label htmlFor="password">Password</label>
 <input type={visible ? "text" : "password" } required id='password'  minLength={8} maxLength={15} name='userPassword'  value={userPassword} onChange={(e)=> setUserPassword(e.target.value)}/>
 { userPassword &&<span onClick={handlePasswordVisibilityAndPassword} > { visible ? <  FaEye className='passwordeye' /> :  <  FaEyeSlash className='passwordeye' />  } </span> }
<p className='forgotpass'><Link to="/forgot-password" className='linktext' style={{fontSize: "13px"}}>Forgot Password ?</Link></p>

</div>
</div>
      <button className='signinbtn' onClick={handleLogin}>Sign In</button>
      </form>
      <div className="or-con-signin">
      <hr />
 <p> OR continue with </p>
 <hr />
 </div>
 <div className="otherloginscon">
 <div className="otherlogin-loginpage " onClick={singInwithGoogle}>
 
 <img className='google-logo-loginpage otherLoginLogo' src="./public/images/google-black.png" alt="Google Logo" />
 </div>
 <div className="otherlogin-loginpage ">
 <img className='github-logo otherLoginLogo' src="./public/images/github.png" alt="Github Logo" />
</div>


 </div>
<div className="signupoption">
<p>Are you new ? <Link to="/register" className='linktext'>Create an Account</Link></p>
</div>
      </div>


    
      </div>
      </div>

      </div>
    )
  }
  
  export default Signin