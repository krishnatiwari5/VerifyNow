import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify'

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import "./resetpassword.css";

import axios from "axios";

function ResetPassword() {
  const { id, token } = useParams();

  const [userPassword, setUserPassword] = useState("");

  const navigate = useNavigate();

  
  const [visible, setVisiblity] = useState(false);


  const handlePasswordVisibilityAndPassword = () => {
    setVisiblity(!visible);
  }

  const handleResetPassword = (event) => {
    event.preventDefault();
    axios
      .get(`/api/v1/users/reset-password/${id}/${token}`)
      .then((response) => {
        console.log(response);
        toast.success("You have successfully Changed the password.");
        if (response.data.success) {
          navigate("/signin");
        }
      })
      .catch((error) => {
        toast.error(error.message)
        console.log(error);
        navigate("/")
      });
  };


  // try and catch way to implement above function same as promise then and catch

  const sendNewPassword = async (e) => {
    e.preventDefault();
try {

 const response = await axios
      .post(`/api/v1/users/${id}/${token}`, { userPassword })
      
        // navigate("/signin");
        console.log(response);
        if(response.data.success) {
          toast.success("You have successfully Changed the password.");
          navigate("/signin");
        }
 
  
} catch (error) {
  console.log(error);
  navigate("*")
}
    
  };

  return (
    <div className="resetpasswordcon">
      <div className="resetpassword">
        <div className="resetpasswordpage">
          <h1>Create New Password </h1>
          <p>This Password should be different from the previous password</p>

          <div className="resetpasswordright">
            <form action="" className="resetpasswordform">
              <div className="password-con form-div">
                <div className="dumdiv passwordfieldcon">
                  <label htmlFor="password">New Password</label>

                  <input type={visible ? "text" : "password" } required id='password'  minLength={8} maxLength={15} name='userPassword'  value={userPassword} onChange={(e)=> setUserPassword(e.target.value)}/>
                  { userPassword &&<span onClick={handlePasswordVisibilityAndPassword} > { visible ? <  FaEyeSlash className='passwordeyerp' /> :  <  FaEye className='passwordeyerp' />  } </span> }

                </div>
              </div>
              <div className="conf-password-con form-div">
                <div className="dumdiv">
                  <label htmlFor="confpassword">Confirmed Password</label>
                  <input
                    type="password"
                    id="confpassword"
                    required
                    minLength={8}
                    maxLength={15}
                  />
                </div>
              </div>

              <button
                className="resetpasswordbtn"
                type="submit"
                onClick={sendNewPassword}
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
