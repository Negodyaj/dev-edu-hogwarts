import sun from '../../images/sun.svg';
import moon from '../../images/moon.svg';
import React, { useState, MouseEvent} from "react";
import '../Toggle/Toggle.scss';


 export type toggled={
   toggled: boolean
   onclick:(event: MouseEvent)=>void
 }

export const Toggle=(props: toggled)=> {

  return(
  <div className="toggle">
    <button onClick={props.onclick}  className={`circle${props.toggled ?"night":""}`}></button>
    <img src={moon} className={`moon${props.toggled ?"day":""}`}></img>
    <img src={sun} className={`sun${props.toggled ?"night":""}`}></img>
  </div>
  );
}