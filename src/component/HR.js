import React from 'react'
import { useState } from "react";
import logo from '../asset/images/logo_small.png'
export default function HR() {
  const [count, setCount] = useState(0);
  const handleClick = (e) => {
    e.preventDefault();
    setCount(count+1);
  }
  return (
    <div>
      <img src={logo} alt='logo image'></img>
      <div style={{fontSize: '20px', fontColor: 'blue'}}>{count}</div>
      <button type="button" onClick={(e) => handleClick(e)}>Increase</button>
    </div>
  )
}
