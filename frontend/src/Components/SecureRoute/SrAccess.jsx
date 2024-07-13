import React from 'react'
import "./sraccess.css"
import { TiTick } from "react-icons/ti";

function SrAccess() {
  return (
    <div className="sraccess-con">
    <div className='sraccess'>  
        <div className="successlogocon">
    <TiTick className='successlogo'/>
    </div>
    <h1>Access Granted</h1>
    <h2>Enjoy your experience !</h2>
   </div>
   </div>
  )
}

export default SrAccess