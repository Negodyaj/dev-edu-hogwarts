import { Icon } from '../enums/Icon';

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
    case QA_COURSE:
      return Icon.Calendar;
    default:
      return Icon.Exit; //TODO: удалить
  }
};

export const getGroupIcon = (index: number) => {
  switch (index) {
    case 0:
      return Icon.Barrel;
    case 1:
      return Icon.Computer;
    case 2:
      return Icon.Chevron;
    case 3:
      return Icon.FolderWithTick;
    case 4:
      return Icon.Computer;
    default:
      return Icon.Cake;
  }
};
