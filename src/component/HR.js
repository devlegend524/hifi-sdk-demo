import React from 'react'
import { useState } from "react";
import logo from '../asset/images/logo_small.png'
import './index.css'

export default function HR() {
  const [count, setCount] = useState(0);
  const handleClick = (e) => {
    e.preventDefault();
    setCount(count+1);
  }
  return (
    <div>
      <img src={logo} className="m-auto" alt='logo image'></img>
      <div className="text-[#FF00FF] text-[30px]">{count}</div>
      <button type="button" onClick={(e) => handleClick(e)}>Increase</button>
    </div>
  )
}
