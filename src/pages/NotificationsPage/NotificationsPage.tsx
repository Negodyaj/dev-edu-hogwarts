import senderPhoto from './images/avatar.png';
import {NotificationsCard} from '../NotificationsPage/components/NotificationsCard';
import React, { useState, useEffect } from 'react';
let notifications = [
  {
    id: 1,
    senderPhoto: senderPhoto,
    sender: 'Антон Ефременков',
    senderRole: 'предподаватель',
    messege: 'Идейные соображения высшего порядка, а также укрепление и развитие структуры играет важную роль в формировании...',
    date: '12.02.22',
    time: ' 12:34'

  },
  {
    id: 2,
    senderPhoto: senderPhoto,
    sender: 'Антон Ефременков',
    senderRole: 'предподаватель',
    messege: 'Повседневная практика показывает, что укрепление и развитие структуры обеспечивает широкому кругу (специалистов) участие в формировании...',
    date: '10.02.22',
    time: '10:02'

  },
  {
    id: 3,
    senderPhoto: senderPhoto,
    sender: 'Антон Ефременков',
    senderRole: 'предподаватель',
    messege: 'Равным образом рамки и место обучения кадров влечет за собой процесс внедрения и модернизации системы обучения кадров...',
    date: '12.02.22',
    time: '19:10'

  }
]
export const NotificationsPage = () => {

  return (
    <div className="card-container">
      {
        notifications.map(item=><NotificationsCard  data={item} key={item.id}   ></NotificationsCard>)
      }
    </div>
  );
}
