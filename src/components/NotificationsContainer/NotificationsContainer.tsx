import { useEffect, useState } from "react";
import { NotificationItem } from "./NotificationItem/NotificationItem"
import "./NotificationsContainer.scss";
import {SvgOk} from '../SvgIcon/SvgFiles/NotificationSvg/SvgOk';
import {SvgFail} from '../SvgIcon/SvgFiles/NotificationSvg/SvgFail';
import React from 'react';

export type Notifs = {
  img: any;
  text: string;
  type: string;
}

const notifs: Notifs[] = [
  {
    img: <SvgOk />,
    text: 'Вы успешно зарегистрипровались!',
    type: 'good',
  },
  {
    img: <SvgFail />,
    text: 'Что-то пошло не так =(',
    type: 'bad',
  }];

export function NotificationsContainer() {
  const empty: any[] = []
  const [containerState, setContainerState] = useState(empty);

  function handleClick(notif: Notifs) {
    setContainerState(containerState.concat(notif))
  }

  return(
    <>
      <button onClick={() => handleClick(notifs[0])}>Хороший нотиф</button>
      <button onClick={() => handleClick(notifs[1])}>Плохой нотиф</button>
      
      <div className="notifications-container">
        {containerState.map((item, i) => (
          <NotificationItem
            data={item}
            key={i}
          />
        ))}
      </div>
    </>
  )
}