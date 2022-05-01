import { useEffect, useState } from "react";
import { NotificationItem } from "./NotificationItem/NotificationItem"
import "./NotificationsContainer.scss";
import {SvgOk} from '../SvgIcon/SvgFiles/NotificationSvg/SvgOk';
import {SvgFail} from '../SvgIcon/SvgFiles/NotificationSvg/SvgFail';
import React from 'react';

export type Notifs = {
  id: number;
  img: any;
  text: string;
}

const notifs: Notifs[] = [
  {
    id: 1,
    img: <SvgOk />,
    text: 'Всё заебись',
    //visible: vis
  },
  {
    id: 2,
    img: <SvgFail />,
    text: 'Что-то пошло не так',
    //visible: vis
  }];

  

export const NotificationsContainer = () => {
  let container: JSX.Element[] = [];
  const Spawn = (props: Notifs) => {
    container.push(<NotificationItem data={props}/>);
    console.log(props.text);
  }
  return (
    <>
     <button onClick={() => Spawn(notifs[0])}>Хороший нотиф</button>
     <button onClick={() => Spawn(notifs[1])}>Плохой нотиф</button>
     <div>
        {container.map((component, index) => (
        <React.Fragment key={index}>
          {component}
        </React.Fragment>
      ))}
     </div>
    </>
  )
}