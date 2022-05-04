import React, { useEffect } from 'react';
import { NotificationsCard } from './components/NotificationsCard';
import { baseWretch } from '../../services/base-wretch.service';
import { useDispatch, useSelector } from 'react-redux';
import { setNotifications } from '../../actions/notifications.actions';
import { NotificationResponse } from '../../models/responses/NotificationResponse';
import { AppState } from '../../store/store';

export const NotificationsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    baseWretch()
      .url('api/Notifications')
      .get()
      .json((data) =>
        dispatch(setNotifications(data as NotificationResponse[]))
      );
  }, []);
  const { notifications } = useSelector(
    (state: AppState) => state.notificationsPageState
  );
  return (
    <div className="card-container content-container">
      {notifications.map((item) => (
        <NotificationsCard data={item} key={item.id} />
      ))}
    </div>
  );
};
