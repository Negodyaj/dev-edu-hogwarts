
import { useState } from 'react';
import '../components/NotificationsCard.scss';
import { LinkArrow } from '../../../components/LinkArrow/LinkArrow';
export type NotificationData = {
  id: number
  sender: string,
  senderPhoto: string,
  senderRole: string,
  messege: string,
  date: string,
  time: string
}
export type NotificationsProps = {
  data: NotificationData
}
export const NotificationsCard = (props: NotificationsProps) => {
  const [isCollapsed, setCollapsed] =useState<boolean>(false);
  const handleClick = () => {
    setCollapsed(!isCollapsed);
  }
  return (
    <div className="notification-card">
      <div className="round">
      <input id='isChecked' type='checkbox' onClick={handleClick} checked={isCollapsed}  className={`button-read${isCollapsed==true?  `-clicked` : ``  }`} ></input>
      </div>
      <img src={props.data.senderPhoto}></img>
      <div className="notification-card-content">
        <div className="top-flex-container">
          <div>
          <div className="sender-name">{props.data.sender}</div>
          <div className="sender-role">{props.data.senderRole}</div>
          </div>
          <div>
          <span className="date">{props.data.date}</span>
          <span className="time">{props.data.time}</span>
          </div>
        </div>
        <div className="messege">{props.data.messege}</div>
        <LinkArrow back={false} text={'перейти'} to={`${props.data.id}`}  ></LinkArrow>
      </div>
    </div>

  )
}