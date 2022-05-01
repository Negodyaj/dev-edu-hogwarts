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

export function NotificationsContainer() {
  let container: JSX.Element[] = [];
  const [containerState, setContainerState] = useState(container);
  const [containerRender, setContainerRender] = useState(containerState);
  
  return (
    <>
     <button onClick={() => setContainerState(containerState.concat(<NotificationItem data={notifs[0]}/>))}>Хороший нотиф</button>
     <button onClick={() => setContainerState(containerState.concat(<NotificationItem data={notifs[1]}/>))}>Плохой нотиф</button>
     <div>
        {containerState.map((component, index) => (
        <React.Fragment key={index}>
          {component}
        </React.Fragment>
      ))}
     </div>
    </>
  )
}