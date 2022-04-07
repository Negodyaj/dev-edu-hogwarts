export interface Homework {
  id: number,
  startDate: string,
  endDate: string,
  task: {
    id: number,
    name: string,
    description: string,
    links: string,
    isRequired: boolean,
    isDeleted: boolean,
  }
}

export interface HomeworkById extends Homework {
  group: {
    id: number,
    name: string,
    groupStatus: GroupStatus,
    startDate: string,
    isDeleted: boolean
  }
}

enum GroupStatus {
  Forming = "Forming",

}

export interface Group {
  students: [
    {
      id: number,
      firstName: string,
      lastName: string,
      email: string,
      photo: null
    }
  ],
  teachers: [
    {
      id: number,
      firstName: string,
      lastName: string,
      email: string,
      photo: null
    }
  ],
  tutors: [],
  id: number,
  name: string,
  course: {
    name: string,
    description: string,
    groups: null,
    topics: null,
    materials: null,
    tasks: null,
    id: number,
    isDeleted: false
  },
  groupStatus: GroupStatus,
  startDate: string,
  endDate: string,
  timetable: string,
  paymentPerMonth: number

}