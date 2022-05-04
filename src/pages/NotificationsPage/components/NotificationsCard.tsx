import '../components/NotificationsCard.scss';
import { LinkArrow } from '../../../components/LinkArrow/LinkArrow';
import avatar from '../images/avatar.png';
import { useState } from 'react';
import React from 'react';
export type NotificationData = {
  id: number;
  userId: number;
  text: string;
  roleId: number;
  groupId: number; // на бэке нет даты отправки, времени отправки, и от кого отправлено уведомление и не ясно куда ведет кнопка перейти
};
export type NotificationsProps = {
  data: NotificationData;
};
export const NotificationsCard = (props: NotificationsProps) => {
  const [isCollapsed, setCollapsed] = useState<boolean>(false);
  const handleClick = () => {
    setCollapsed(!isCollapsed);
  };
  return (
    <div className="notification-card ">
      <div className="round">
        <input
          id="isChecked"
          type="checkbox"
          onClick={handleClick}
          className={`button-read${isCollapsed == true ? `-clicked` : ``}`}
        ></input>
      </div>
      <img src={avatar} />
      <div className="notification-card-content">
        <div className="top-flex-container">
          <div>
            <div className="sender-name">Aнтон Ефременков</div>
            <div className="sender-role">Teacher</div>
          </div>
          <div>
            <span className="date">25.11.2020</span>
            <span className="time">14.30</span>
          </div>
        </div>
        <div className="message">{props.data.text}</div>
        <LinkArrow text={'перейти'} to={`${props.data.id}`} />
      </div>
    </div>
  );
};
