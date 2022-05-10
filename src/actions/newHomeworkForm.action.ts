import { CourseResponse } from '../models/responses/CourseResponse';
import { GroupResponse } from '../models/responses/GroupResponse';
import { Homework } from '../models/responses/HomeworksResponse';

export const INIT_FORM = 'newHomeworkForm/INIT_FORM' as const;
export const ADD_LINK = 'newHomeworkForm/ADD_LINK' as const;
export const REMOVE_LINK = 'newHomeworkForm/REMOVE_LINK' as const;
export const LOAD_GROUPS = 'newHomeworkForm/LOAD_GROUPS' as const;
export const LOAD_COURSES = 'newHomeworkForm/LOAD_COURSES' as const;
export const SELECT_GROUP = 'newHomeworkForm/SELECT_GROUP' as const;
export const GET_TASKS_COUNT = 'newHomeworkForm/GET_TASKS_COUNT' as const;
export const SET_VALUE_INPUT_LINK =
  'newHomeworkForm/SET_VALUE_INPUT_LINK' as const;

export const initForm = () => ({
  type: INIT_FORM,
});

export const loadGroups = (groups: GroupResponse[]) => ({
  type: LOAD_GROUPS,
  payload: [...groups].map((item) => ({
    text: item.name,
    value: item.id,
  })),
});

export const setCourses = (courses: CourseResponse[]) => ({
  type: LOAD_COURSES,
  payload: [...courses].map((item) => ({
    text: item.name,
    value: item.id,
  })),
});

export const selectGroup = (groupId: number) => ({
  type: SELECT_GROUP,
  payload: groupId,
});

export const getTasksCount = (tasksCount: Homework[]) => ({
  type: GET_TASKS_COUNT,
  payload: tasksCount.length + 1,
});

export const addLink = (link: string) => ({
  type: ADD_LINK,
  payload: link,
});

export const removeLink = (link: number) => ({
  type: REMOVE_LINK,
  payload: link,
});

export const setValueInInput = (text: string) => ({
  type: SET_VALUE_INPUT_LINK,
  payload: text,
});

export type NewHomeworkFormAction =
  | ReturnType<typeof addLink>
  | ReturnType<typeof removeLink>
  | ReturnType<typeof initForm>
  | ReturnType<typeof setValueInInput>
  | ReturnType<typeof loadGroups>
  | ReturnType<typeof selectGroup>
  | ReturnType<typeof getTasksCount>
  | ReturnType<typeof setCourses>;
