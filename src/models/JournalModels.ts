import { HomeworkStatus } from './HomeworkCardData';
import { FilterItem } from '../components/FilterList/FilterList';

export enum AttendanceTypes {
  Absent = 0,
  Attend = 1,
  PartiallyAttended = 0.5,
}

export const attendanceTypesFilter = [
  {
    id: 0,
    name: '0',
  },
  {
    id: 1,
    name: '1',
  },
  {
    id: 0.5,
    name: '0.5',
  },
];

export const statusTypesFilter: FilterItem[] = [
  {
    id: 0,
    name: 'Все',
  },
  {
    id: 1,
    name: HomeworkStatus.Done,
  },
  {
    id: 2,
    name: HomeworkStatus.ToFix,
  },
  {
    id: 3,
    name: HomeworkStatus.Undone,
  },
  {
    id: 4,
    name: HomeworkStatus.ToCheck,
  },
];
