import { Icon } from '../enums/Icon';
import { GroupsTabIcons } from '../../components/SvgIcon/GroupsTabIcons';

const BASE_COURSE = 'Базовый курс' as const;
const BACKEND_COURSE = 'Специализация Backend' as const;
const FRONTEND_COURSE = 'Frontend' as const;
const QA_COURSE = 'QA automation' as const;

export type CourseName =
  | typeof BASE_COURSE
  | typeof BACKEND_COURSE
  | typeof FRONTEND_COURSE
  | typeof QA_COURSE;

export const getCourseIcon = (courseName: CourseName) => {
  switch (courseName) {
    case BASE_COURSE:
      return Icon.Computer;
    case BACKEND_COURSE:
      return Icon.Barrel;
    case FRONTEND_COURSE:
      return Icon.Chevron;
    default:
      return Icon.Calendar;
  }
};

export const setRandomIconGroup = () => {
  const length = GroupsTabIcons.length;
  const random = Math.random() * length;
  return +~~random;
};

export const getGroupIcon = (index: number) => {
  switch (index + 1) {
    case 1:
      return Icon.Barrel;
    case 2:
      return Icon.Computer;
    case 3:
      return Icon.Chevron;
    case 4:
      return Icon.Calendar;
    case 5:
      return Icon.Computer;
    default:
      return Icon.Cake;
  }
};
