import { NotificationItem } from './NotificationItem/NotificationItem';
import './NotificationsContainer.scss';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { NotificationsContainerState } from '../../store/reducers/notificationsContainer.reducer';

export const NotificationsContainer = () => {
  const { container } = useSelector(
    (state: AppState) => state.notificationsContainerState as NotificationsContainerState
  );

  return (
    <>
      <div className="notifications-container">
        {container.map((item, i) => (
          <NotificationItem data={item} key={i} />
        ))}
      </div>
    </>
  );
};
