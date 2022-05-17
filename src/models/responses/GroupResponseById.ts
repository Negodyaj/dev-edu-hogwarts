import { CourseResponse } from './CourseResponse';
import { GroupResponse } from './GroupResponse';
import { UserResponseShort } from './UserResponseShort';

export interface GroupResponseById {
  students: UserResponseShort[];
  teachers: UserResponseShort[];
  tutors: UserResponseShort[];
  id: number;
  name: string;
  course: CourseResponse;
  groupStatus: string;
  startDate: string;
  endDate: string;
  timetable: string;
  paymentPerMonth: number;
}
