import { CourseSimpleResponse } from './CourseSimpleResponse';

export interface GroupResponse {
  id: number;
  name: string;
  course: CourseSimpleResponse;
  groupStatus: string;
  startDate: string;
  endDate: string;
  timetable: string;
  paymentPerMonth: number;
}
