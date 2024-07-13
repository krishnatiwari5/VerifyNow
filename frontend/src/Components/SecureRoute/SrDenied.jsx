import React from 'react'
import "./srdenied.css"
import { RxCross1 } from "react-icons/rx";


function SrDenied() {
  return (
    <div className="srdenied-con">
    <div className='srdenied'>
        {/* <div className="srdenied-message"> */}
        <div className="deniedlogocon">
        <RxCross1 className='deniedlogo'/>
        </div>
        <h1>Access Denied</h1>
        {/* </div> */}
        <h2>This page is protected. Please sign in or sign up to access it.</h2>
    </div>
    </div>
  )
}

export default SrDenied