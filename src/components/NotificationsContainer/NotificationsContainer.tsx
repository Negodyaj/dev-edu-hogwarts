import { useEffect, useState } from "react";
import { isTemplateExpression } from "typescript"
import { NotificationItem } from "./NotificationItem/NotificationItem"

let notifs = [
  {
    img: '',
    text: 'Всё заебись'
  },
  {
    img: '',
    text: 'Что-то пошло не так'
  }
];



export const NotificationContainer = () => {
  const [notif, setNotif] = useState('');

  //useEffect(() =>{

  //})
  return(
    <div>
      <button>Нажми меня</button>
      <NotificationItem />
    </div>
  )
}