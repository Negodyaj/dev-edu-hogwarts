import { Icon } from '../enums/Icon';

const BASE_C_COURSE = 1370 as const;
const BACKEND_C_COURSE = 2371 as const;
const FRONTEND_REACT_COURSE = 1371 as const;
const QA_COURSE = 2376 as const;
const BASE_JAVA_COURSE = 2374 as const;
const BACKEND_JAVA_COURSE = 2375 as const;

export type CourseName =
  | typeof BASE_C_COURSE
  | typeof BASE_JAVA_COURSE
  | typeof BACKEND_C_COURSE
  | typeof BACKEND_JAVA_COURSE
  | typeof FRONTEND_REACT_COURSE
  | typeof QA_COURSE;

export const getCourseIcon = (courseName: CourseName) => {
  switch (courseName) {
    case BASE_C_COURSE:
      return Icon.Computer;
    case BACKEND_C_COURSE:
      return Icon.Barrel;
    case FRONTEND_REACT_COURSE:
      return Icon.Chevron;
    case BASE_JAVA_COURSE:
      return Icon.Calendar;
    case BACKEND_JAVA_COURSE:
      return Icon.Computer;
    case QA_COURSE:
      return Icon.Cake;
    default:
      return Icon.Exit; //TODO: удалить
  }
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
