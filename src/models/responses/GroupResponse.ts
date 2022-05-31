import { CourseSimpleResponse } from './CourseSimpleResponse';
import { GroupStatus } from '../../shared/enums/GroupStatus';

export interface GroupResponse {
  id: number;
  name: string;
  course: CourseSimpleResponse;
  groupStatus: GroupStatus;
  startDate: string;
  endDate: string;
  timetable: string;
  paymentPerMonth: number;
}
