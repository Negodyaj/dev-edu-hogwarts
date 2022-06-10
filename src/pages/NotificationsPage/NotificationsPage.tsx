import { baseWretch } from '../../services/base-wretch.service';
import { setNotifications } from '../../actions/notifications.actions';
import { NotificationResponse } from '../../models/responses/NotificationResponse';
import { NotificationsCard } from '../NotificationsPage/components/NotificationsCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { useEffect } from 'react';
import { NotificationsPageState } from '../../store/reducers/notifications.reducer';
import { MainPanelState } from '../../store/reducers/mainPanel.reducer';
import { ContentContainer } from '../../components/styled/ContentContainer';

export const NotificationsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    baseWretch()
      .url('api/Notifications')
      .get()
      .json((data) => dispatch(setNotifications(data as NotificationResponse[])));
  }, []);
  const { isDark } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);

  const { filteredNotifications } = useSelector(
    (state: AppState) => state.notificationsPageState as NotificationsPageState
  );

  return (
    <div className="notifications-page">
      {/* <FilterList data={notificationsFilterData} callback={applyNotificationsFilter} /> */}
      <ContentContainer isDarkMode={isDark} className="card-container">
        {filteredNotifications.map((notification: any) => (
          <NotificationsCard data={notification} />
        ))}
      </ContentContainer>
    </div>
  );
};
