import { NotificationItem } from './NotificationItem/NotificationItem';
import './NotificationsContainer.scss';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { NotificationsContainerState } from '../../store/reducers/notificationsContainer.reducer';

export const NotificationsContainer = () => {
  const { notifications } = useSelector(
    (state: AppState) => state.notificationsContainerState as NotificationsContainerState
  );

  return (
    <div className="notifications-container">
      {notifications.map((item, i) => (
        <NotificationItem data={item} key={`notification-${i}`} />
      ))}
    </div>
  );
};
