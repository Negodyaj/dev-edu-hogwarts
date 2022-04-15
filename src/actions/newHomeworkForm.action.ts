import { GroupResponse } from '../models/responses/GroupResponse';
import { Homework } from '../models/responses/HomeworksResponse';

export const INIT_FORM = 'newHomeworkForm/INIT_FORM' as const;
export const ADD_LINK = 'newHomeworkForm/ADD_LINK' as const;
export const REMOVE_LINK = 'newHomeworkForm/REMOVE_LINK' as const;
export const LOAD_GROUPS = 'newHomeworkForm/LOAD_GROUPS' as const;
export const SELECT_GROUP = 'newHomeworkForm/SELECT_GROUP' as const;
export const GET_TASKS_COUNT = 'newHomeworkForm/GET_TASKS_COUNT' as const;
export const SET_VALUE_INPUT_LINK =
  'newHomeworkForm/SET_VALUE_INPUT_LINK' as const;

export const InitForm = () => ({
  type: INIT_FORM,
});

export const LoadGroups = (groups: GroupResponse[]) => ({
  type: LOAD_GROUPS,
  payload: [...groups].map((item) => ({
    text: item.name,
    value: item.id,
  })),
});

export const SelectGroup = (groupId: number) => ({
  type: SELECT_GROUP,
  payload: groupId,
});

export const GetTasksCount = (tasksCount: Homework[]) => ({
  type: GET_TASKS_COUNT,
  payload: tasksCount.length + 1,
});

export const AddLink = (link: string) => ({
  type: ADD_LINK,
  payload: link,
});

export const RemoveLink = (link: number) => ({
  type: REMOVE_LINK,
  payload: link,
});

export const SetValueInInput = (text: string) => ({
  type: SET_VALUE_INPUT_LINK,
  payload: text,
});

export type NewHomeworkFormAction =
  | ReturnType<typeof AddLink>
  | ReturnType<typeof RemoveLink>
  | ReturnType<typeof InitForm>
  | ReturnType<typeof SetValueInInput>
  | ReturnType<typeof LoadGroups>
  | ReturnType<typeof SelectGroup>
  | ReturnType<typeof GetTasksCount>;
