import { CourseResponse } from '../CourseResponse';
import { UserResponse } from './UserResponse';

export interface GroupResponse {
  id: number;
  name: string;
  course: CourseResponse;
  groupStatus: string;
  startDate: string;
  endDate: string;
  timetable: string;
  paymentPerMonth: number;
  students: UserResponse[];
  teachers: UserResponse[];
  tutors: UserResponse[];
}