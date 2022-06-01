import { useEffect, useState } from 'react';
import { Icon } from '../../../shared/enums/Icon';
import { NotificationType } from '../../../shared/enums/NotificationType';
import { SvgIcon } from '../../SvgIcon/SvgIcon';
import './NotificationItem.scss';

export type NotificationProps = {
  data: NotificationData;
};

export type NotificationData = {
  text: string;
  type: NotificationType;
};

export const NotificationItem = (props: NotificationProps) => {
  const [invisible, setInvisible] = useState('');
  const isGood = props.data.type === NotificationType.Good;
  useEffect(() => {
    if (isGood) {
      setTimeout(() => setInvisible('invisible'), 2500);
    } else {
      setTimeout(() => setInvisible('invisible'), 4000);
    }
  }, []);

  return (
    <div
      onClick={() => {
        setInvisible('invisible');
      }}
      className={`notification-window ${invisible}
      `}
    >
      <SvgIcon icon={isGood ? Icon.Ok : Icon.Fail} />
      <p className="notification-text">{props.data.text}</p>
    </div>
  );
};
