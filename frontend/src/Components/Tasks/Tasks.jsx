import React from 'react'
import SrAccess from '../SecureRoute/SrAccess';
import SrDenied from '../SecureRoute/SrDenied';

function Tasks() {
    let loggedIn = localStorage.getItem("loggedIn");
    let userType = localStorage.getItem("userType");
  return (
    <div>
        {loggedIn ? <SrAccess/> : <SrDenied/> }
    </div>
  )
}

export default Tasks