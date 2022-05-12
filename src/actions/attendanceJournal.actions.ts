import { GroupResponse } from '../models/responses/GroupResponse';
import { setRandomIconGroup } from '../shared/helpers/iconHelpers';

export const LOAD_TABS = 'attendanceJournal/LOAD_TABS' as const;
export const SELECT_TAB = 'attendanceJournal/SELECT_TAB' as const;
export const LOAD_ATTENDANCE = 'attendanceJournal/LOAD_ATTENDANCE' as const;
export const FILTER_STUDENTS_LIST = 'attendanceJournal/FILTER_STUDENTS_LIST' as const;
export const SET_STUDENT_ATTENDANCE = 'attendanceJournal/SET_STUDENT_ATTENDANCE' as const;
export const LOAD_ATTENDANCE_STARTED = 'attendanceJournal/LOAD_PROGRESS_STARTED' as const;
export const LOAD_ATTENDANCE_SUCCESS = 'attendanceJournal/LOAD_PROGRESS_SUCCESS' as const;
export const LOAD_ATTENDANCE_FAIL = 'attendanceJournal/LOAD_PROGRESS_FAIL' as const;

export const loadAttendanceTabs = (groups: GroupResponse[]) => ({
  type: LOAD_TABS,
  payload: groups.map((group) => ({
    id: group.id,
    text: group.name,
    icon: setRandomIconGroup(),
  })),
});

export const selectTab = (id: number) => ({
  type: SELECT_TAB,
  payload: id,
});

export const loadAttendance = (attendanceData: any[]) => ({
  type: LOAD_ATTENDANCE,
  payload: attendanceData,
});

export const setStudentAttendance = (resultResponse: any[]) => ({
  type: SET_STUDENT_ATTENDANCE,
  payload: resultResponse,
});

export const filterStudentsList = (students: any[]) => ({
  type: FILTER_STUDENTS_LIST,
  payload: students,
});

export const loadAttendanceStarted = () => ({
  type: LOAD_ATTENDANCE_STARTED,
});

export const loadAttendanceSuccess = () => ({
  type: LOAD_ATTENDANCE_SUCCESS,
});

export const loadAttendanceFail = (error: string) => ({
  type: LOAD_ATTENDANCE_FAIL,
  payload: error,
});

export type AttendanceJournalActions =
  | ReturnType<typeof loadAttendanceTabs>
  | ReturnType<typeof selectTab>
  | ReturnType<typeof loadAttendance>
  | ReturnType<typeof setStudentAttendance>
  | ReturnType<typeof loadAttendanceStarted>
  | ReturnType<typeof loadAttendanceSuccess>
  | ReturnType<typeof loadAttendanceFail>
  | ReturnType<typeof filterStudentsList>;
