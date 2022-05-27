import { SvgOk } from '../components/SvgIcon/SvgFiles/NotificationSvg/SvgOk';
//import { SvgFail } from '..components/SvgIcon/SvgFiles/NotificationSvg/SvgFail';

export type Notifs = {
  img: any;
  text: string;
  type: string;
};

export const notifs: Notifs[] = [
  {
    img: SvgOk,
    text: 'Вы успешно зарегистрипровались!',
    type: 'good',
  },
  {
    img: SvgOk,
    text: 'Что-то пошло не так =(',
    type: 'bad',
  },
];
