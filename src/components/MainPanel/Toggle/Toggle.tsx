import sun from '../../images/sun.svg';
import moon from '../../images/moon.svg';
import React, { useState, MouseEvent } from "react";
import './Toggle.scss';

export type ToggleProps = {
  isToggled: boolean
  onClick: (event: MouseEvent) => void
}

export const Toggle = (props: ToggleProps) => {

  return (
    <button className="toggle" onClick={props.onClick}>
      <button className={`circle${props.isToggled ? "-night" : ""}`}></button>
      <img src={moon} className={`moon${props.isToggled ? "-day" : ""}`}></img>
      <img src={sun} className={`sun${props.isToggled ? "-night" : ""}`}></img>
    </button>
  );
}