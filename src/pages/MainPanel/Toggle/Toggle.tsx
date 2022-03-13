import sun from '../../images/sun.svg';
import moon from '../../images/moon.svg';
import React, { useState } from "react";
import '../Toggle/Toggle.scss';


export const Toggle=()=>{

  return(
  <div className="toggle">
    <button  className="circle"></button>
    <img src={moon} className="moon"></img>
    <img src={sun} className="sun"></img>
  </div>
  )
}