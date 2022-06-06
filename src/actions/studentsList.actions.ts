import { GroupResponse } from '../models/responses/GroupResponse';
import { StudentResponse } from '../models/responses/StudentsResponse';

export const LOAD_GROUPS_STARTED = 'groups/LOAD_GROUPS_STARTED' as const;
export const LOAD_GROUPS_SUCCESS = 'groups/LOAD_GROUPS_SUCCESS' as const;
export const LOAD_GROUPS_FAIL = 'groups/LOAD_GROUPS_FAIL' as const;
export const LOAD_STUDENTS_STARTED = 'students/LOAD_STUDENTS_STARTED' as const;
export const LOAD_STUDENTS_SUCCESS = 'students/LOAD_STUDENTS_SUCCESS' as const;
export const LOAD_STUDENTS_FAIL = 'students/LOAD_STUDENTS_FAIL' as const;

export const loadGroupsStarted = () => ({
  type: LOAD_GROUPS_STARTED,
});

export const loadGroupsSuccess = (groups: GroupResponse[]) => ({
  type: LOAD_GROUPS_SUCCESS,
  payload: groups,
});

export const loadGroupsFail = (message: string) => ({
  type: LOAD_GROUPS_FAIL,
  payload: message,
});

export const loadStudentsStarted = () => ({
  type: LOAD_STUDENTS_STARTED,
});

export const loadStudentsSuccess = (studentsList: StudentResponse[]) => ({
  type: LOAD_STUDENTS_SUCCESS,
  payload: studentsList,
});

export const loadStudentsFail = (message: string) => ({
  type: LOAD_STUDENTS_FAIL,
  payload: message,
});

export type StudentsListPageAction =
  | ReturnType<typeof loadGroupsSuccess>
  | ReturnType<typeof loadGroupsFail>
  | ReturnType<typeof loadGroupsStarted>
  | ReturnType<typeof loadStudentsSuccess>
  | ReturnType<typeof loadStudentsFail>
  | ReturnType<typeof loadStudentsStarted>;
