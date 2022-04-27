import senderPhoto from './images/avatar.png';
import { NotificationsCard } from '../NotificationsPage/components/NotificationsCard';
import { FilterItem, FilterList } from '../../components/FilterList/FilterList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AppState } from '../../store/store';
import React from 'react';
import { filterNotification } from '../../actions/notifications.actions';
import { NotificationsPageState } from '../../store/reducers/notifications.reducer';
const notifications = [
  {
    id: 1,
    senderPhoto: senderPhoto,
    sender: 'Антон Ефременков',
    senderRole: 'предподаватель',
    message:
      'Идейные соображения высшего порядка, а также укрепление и развитие структуры играет важную роль в формировании...',
    date: '12.02.22',
    time: ' 12:34',
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
  },
];
export const NotificationsPage = () => {
  const dispatch = useDispatch(); 

  const { notifications, filteredNotifications } = useSelector(
    (state: AppState) => state.notificationsPageState as NotificationsPageState
  );  

  const applyNotificationsFilter = (item: FilterItem) => {
    const notificationsToDisplay = notifications.filter(() => {  
      console.log(item);    
      return true;
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
      {filteredNotifications.map((notification:any) => (
        <NotificationsCard data={notification}/>          

        
      ))}
    </div>
  </>
);
}

