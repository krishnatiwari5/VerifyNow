import React from 'react'
import SrAccess from '../SecureRoute/SrAccess';
import NotAdmin from '../SecureRoute/NotAdmin';

function Settings() {
    let loggedIn = localStorage.getItem("loggedIn");
    let userType = localStorage.getItem("userType");
  return (
    <div>
{
    userType === 'admin' ? <SrAccess/> : <NotAdmin/>
}
    </div>
  )
  
}

export default Settings