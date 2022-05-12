import { useEffect, useState } from 'react';
import './NotificationItem.scss';

export type NotificationProps = {
  data: NotificationData;
};

export type NotificationData = {
  img: any;
  text: string;
  type: string;
};

export const NotificationItem = (props: NotificationProps) => {
  const [invisible, setInvisible] = useState('');
  useEffect(() => {
    if (props.data.type === 'good') {
      setTimeout(() => setInvisible('invisible'), 2500);
    } else {
      setTimeout(() => setInvisible('invisible'), 4000);
    }
  }, []);

  return (
    <>
      <div
        onClick={() => {
          setInvisible('invisible');
        }}
        className={`notification-window ${invisible}
        `}
      >
        {props.data.img}
        <p className="notification-text">{props.data.text}</p>
      </div>
    </>
  );
};
