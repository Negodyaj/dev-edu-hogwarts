import { CourseResponse } from "./CourseResponse";

export interface GroupResponse {
  id: number,
  name: string,
  course: CourseResponse,
  groupStatus: string,
  startDate: string,
  endDate: string,
  timetable: string,
  paymentPerMonth: number
}