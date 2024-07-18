import React from 'react'

import { FaAppleAlt, FaChargingStation } from "react-icons/fa";

import { BsCake2Fill } from "react-icons/bs";

 

export default function Icons() {

  return (

    <div className='container'>

      <h1 className='glow-text'>Icons page</h1>

      <h2>Test</h2>

      <FaAppleAlt className = 'h1' size={100} color="black" />
      <FaAppleAlt className = 'h1' style = {{color:"red"}} />
      <br/>

      <FaChargingStation className='glow-text h1' />

      <BsCake2Fill className='glow-text h1' />

    </div>

  )

}

// npm i react-icons


// https://react-icons.github.io/react-icons/


// https://html-css-js.com/css/generator/text-shadow/