import { useState } from 'react';
import { NotificationItem } from './NotificationItem/NotificationItem';
import './NotificationsContainer.scss';
import { SvgOk } from '../SvgIcon/SvgFiles/NotificationSvg/SvgOk';
import { SvgFail } from '../SvgIcon/SvgFiles/NotificationSvg/SvgFail';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { NotificationsContainerState } from '../../store/reducers/notificationsContainer.reducer';
import { addNotification } from '../../actions/notificationsContainer.actions';

export function NotificationsContainer() {
  const { container } = useSelector(
    (state: AppState) => state.notificationsContainerState as NotificationsContainerState);
  
  const dispatch = useDispatch();
  const empty: any[] = [];
  const [containerState, setContainerState] = useState(empty);

  /*function handleClick(notificationType: number) {
    dispatch(addNotification(notificationType));
  }
  
  <button onClick={() => handleClick(0)}>Хороший нотиф</button>
      <button onClick={() => handleClick(1)}>Плохой нотиф</button>
  */

  return (
    <>
      <div className="notifications-container">
        {container.map((item, i) => (
          <NotificationItem data={item} key={i} />
        ))}
      </div>
    </>
  );
}
