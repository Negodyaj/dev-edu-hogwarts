import senderPhoto from './images/avatar.png';
import {
  NotificationsCard,
  NotificationData,
} from '../NotificationsPage/components/NotificationsCard';
import { FilterItem, FilterList } from '../../components/FilterList/FilterList';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../store/store';
import React, { useEffect } from 'react';
import { filterNotification, setNotifications } from '../../actions/notifications.actions';
import { NotificationsPageState } from '../../store/reducers/notifications.reducer';
const getNotifications = (): NotificationData[] => {
  return [
    {
      id: 1,
      senderPhoto: senderPhoto,
      sender: 'Антон Ефременков',
      senderRole: 'предподаватель',
      message:
        'Идейные соображения высшего порядка, а также укрепление и развитие структуры играет важную роль в формировании...',
      date: '12.02.22',
      time: ' 12:34',
      readed: true,
    },
    {
      id: 2,
      senderPhoto: senderPhoto,
      sender: 'Антон Ефременков',
      senderRole: 'предподаватель',
      message:
        'Повседневная практика показывает, что укрепление и развитие структуры обеспечивает широкому кругу (специалистов) участие в формировании...',
      date: '10.02.22',
      time: '10:02',
      readed: true,
    },
    {
      id: 3,
      senderPhoto: senderPhoto,
      sender: 'Антон Ефременков',
      senderRole: 'предподаватель',
      message:
        'Равным образом рамки и место обучения кадров влечет за собой процесс внедрения и модернизации системы обучения кадров...',
      date: '12.02.22',
      time: '19:10',
      readed: false,
    },
  ];
};
export const NotificationsPage = () => {
  const dispatch = useDispatch();

  const { notifications, filteredNotifications } = useSelector(
    (state: AppState) => state.notificationsPageState as NotificationsPageState
  );

  useEffect(() => {
    const response = getNotifications();
    dispatch(setNotifications(response));
  }, []);

  const applyNotificationsFilter = (item: FilterItem) => {
    console.log(item);
    const notificationsToDisplay = notifications.filter((elem) => {
      if (item.id === 1) {
        return elem;
      } else {
        return elem.readed === false;
      }
    });

    dispatch(filterNotification(notificationsToDisplay));
  };

  const notificationsFilterData: FilterItem[] = [
    { id: 1, name: 'Все' },
    { id: 2, name: 'Непрочитанные' },
  ];
  return (
    <>
      <FilterList data={notificationsFilterData} callback={applyNotificationsFilter} />
      <div className="card-container content-container">
        {filteredNotifications.map((notification: any) => (
          <NotificationsCard data={notification} />
        ))}
      </div>
    </>
  );
};
