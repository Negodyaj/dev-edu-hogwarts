import { CourseResponse } from '../models/responses/CourseResponse';
import { GroupResponse } from '../models/responses/GroupResponse';
import { Homework, StudentHomework, Task } from '../models/responses/HomeworksResponse';
export const LOAD_TABS = 'homeworks/LOAD_TABS' as const;
export const LOAD_BYCOURSE = 'homeworks/LOAD_BYCOURSE' as const;
export const SELECT_TAB = 'homeworks/SELECT_TAB' as const;
export const LOAD_HOMEWORKS_STARTED = 'homeworks/LOAD_HOMEWORKS_STARTED' as const;
export const LOAD_HOMEWORKS_SUCCESS = 'homeworks/LOAD_HOMEWORKS_SUCCESS' as const;
export const LOAD_DRAFT_HOMEWORKS_SUCCESS = 'homeworks/LOAD_DRAFT_HOMEWORKS_SUCCESS' as const;
export const LOAD_HOMEWORKS_FAIL = 'homeworks/LOAD_HOMEWORKS_FAIL' as const;
export const LOAD_TASKS_STARTED = 'tasks/LOAD_TASKS_STARTED' as const;
export const LOAD_TASKS_SUCCESS = 'tasks/LOAD_TASKS_SUCCESS' as const;
export const LOAD_TASKS_FAILED = 'tasks/LOAD_TASKS_FAILED' as const;
export const EDIT_HOMEWORK_STATUS = 'homeworks/EDIT_HOMEWORK_STATUS' as const;

export const loadHomeworkPageTabs = (groups: GroupResponse[]) => ({
  type: LOAD_TABS,
  payload: groups,
});

export const loadHomeworkPageTabsCourses = (courses: CourseResponse[]) => ({
  type: LOAD_BYCOURSE,
  payload: courses,
});
export const selectTab = (id: number) => ({
  type: SELECT_TAB,
  payload: id,
});

export const loadHomeworksStarted = () => ({
  type: LOAD_HOMEWORKS_STARTED,
});

export const loadHomeworksSuccess = (homeworks: Homework[]) => ({
  type: LOAD_HOMEWORKS_SUCCESS,
  payload: homeworks,
});

export const loadDraftHomeworksSuccess = (drafts: Task[]) => ({
  type: LOAD_DRAFT_HOMEWORKS_SUCCESS,
  payload: drafts,
});

export const loadHomeworksFail = (message: string) => ({
  type: LOAD_HOMEWORKS_FAIL,
  payload: message,
});

export const editHomeworkStatus = (homework: StudentHomework) => ({
  type: EDIT_HOMEWORK_STATUS,
  payload: homework,
});

export const loadTasksStarted = () => ({
  type: LOAD_TASKS_STARTED,
});

export const loadTasksFailed = (message: string) => ({
  type: LOAD_TASKS_FAILED,
  payload: message,
});

export const loadTasksSuccess = (tasks: Task[]) => ({
  type: LOAD_TASKS_SUCCESS,
  payload: tasks,
});
export type HomeworksPageAction =
  | ReturnType<typeof loadHomeworkPageTabs>
  | ReturnType<typeof selectTab>
  | ReturnType<typeof loadHomeworksStarted>
  | ReturnType<typeof loadHomeworksSuccess>
  | ReturnType<typeof loadHomeworksFail>
  | ReturnType<typeof editHomeworkStatus>
  | ReturnType<typeof loadTasksStarted>
  | ReturnType<typeof loadTasksSuccess>
  | ReturnType<typeof loadTasksFailed>
  | ReturnType<typeof loadHomeworkPageTabsCourses>
  | ReturnType<typeof loadDraftHomeworksSuccess>;
