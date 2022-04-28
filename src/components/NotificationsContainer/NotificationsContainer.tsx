import { useEffect, useState } from "react";
import { NotificationItem } from "./NotificationItem/NotificationItem"
import "./NotificationsContainer.scss";
import {SvgOk} from '../SvgIcon/SvgFiles/NotificationSvg/SvgOk';
import {SvgFail} from '../SvgIcon/SvgFiles/NotificationSvg/SvgFail';



export const NotificationsContainer = () => {
  const [vis, setVis] = useState(false);
  const [changeVis, setChangeVis] = useState(false);
  let notifs = [
    {
      id: 1,
      img: <SvgOk />,
      text: 'Всё заебись',
      visible: vis
    },
    {
      id: 2,
      img: <SvgFail />,
      text: 'Что-то пошло не так',
      visible: vis
    }
  ];

  useEffect(() => {
    setChangeVis = () => {
      
    }
  })

  return(
    <div className="notifications-container">
      <button onClick={() => setVis(true)}>Всё отл
      </button>
      <div onClick={() => setVis(false)}>
        <NotificationItem data={notifs[0]} key={notifs[0].id}/>
      </div>

      <button onClick={() => setVis(true)}>Всё ниоч
      </button>
      <div>
        <NotificationItem data={notifs[1]} key={notifs[1].id}/>
      </div>
    </div>
  )
}