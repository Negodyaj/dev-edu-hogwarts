import { baseWretch } from '../../services/base-wretch.service';
import { setNotifications } from '../../actions/notifications.actions';
import { NotificationResponse } from '../../models/responses/NotificationResponse';
import { NotificationsCard } from '../NotificationsPage/components/NotificationsCard';
// import { FilterItem, FilterList } from '../../components/FilterList/FilterList';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { useEffect } from 'react';
import { NotificationsPageState } from '../../store/reducers/notifications.reducer';
// import { FilterItem } from '../../components/FilterList/FilterList';

export const NotificationsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    baseWretch()
      .url('api/Notifications')
      .get()
      .json((data) => dispatch(setNotifications(data as NotificationResponse[])));
  }, []);

  const { filteredNotifications } = useSelector(
    (state: AppState) => state.notificationsPageState as NotificationsPageState
  );

  // const applyNotificationsFilter = (item: FilterItem) => {
  //   console.log(item);
  //   const notificationsToDisplay = notifications.filter((elem) => {
  //     if (item.id === 1) {
  //       return elem;
  //     } else {
  //       return elem.readed === false;
  //     }
  //   });

  //   dispatch(filterNotification(notificationsToDisplay));
  // };

  // const notificationsFilterData: FilterItem[] = [
  //   { id: 1, name: 'Все' },
  //   { id: 2, name: 'Непрочитанные' },
  // ];
  return (
    <div className="notifications-page">
      {/* <FilterList data={notificationsFilterData} callback={applyNotificationsFilter} /> */}
      <div className="card-container content-container">
        {filteredNotifications.map((notification: any) => (
          <NotificationsCard data={notification} />
        ))}
      </div>
    </div>
  );
};
