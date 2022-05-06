export interface GroupResponseForHWResults {
  id: number,
  name: string,
  course: {
    id: 0,
    name: string,
    isDeleted: true
  },
  groupStatus: string,
  startDate: string,
  endDate: string,
  timetable: string,
  paymentPerMonth: 0,
  students: Users[],
  teachers: Users[],
  tutors: Users[]
}

export interface Users {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
}