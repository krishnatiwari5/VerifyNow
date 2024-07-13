import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {
    let loggedIn = localStorage.getItem("loggedIn");
let userType = localStorage.getItem("userType");
  return (
    <div>



    </div>
  )
}

export default ProtectedRoute