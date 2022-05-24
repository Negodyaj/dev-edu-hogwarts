import { GroupStatus } from '../../shared/enums/GroupStatus';
import { CourseResponse } from './CourseResponse';

export interface GroupResponse {
  id: number;
  name: string;
  course: CourseResponse;
  groupStatus: GroupStatus;
  startDate: string;
  endDate: string;
  timetable: string;
  paymentPerMonth: number;
}
