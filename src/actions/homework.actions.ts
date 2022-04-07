import {HomeworkById} from "../models/responses/HomeworksResponse";
import {Dispatch} from "react";
import {baseWretch} from "../services/base-wretch.service";
import {getHomeworkById} from "../shared/consts";

export interface HomeworkAction {
  type: string,
  payload?: any
}

export const GET_HOMEWORK_BY_ID = 'homework/GET_HOMEWORK_BY_ID' as const;
export const GET_HOMEWORK_BY_ID_SUCCESS = 'homework/GET_HOMEWORK_BY_ID_SUCCESS' as const;

export const loadingHomework = (): HomeworkAction => ({
  type: GET_HOMEWORK_BY_ID
});

export const loadHomework = (homework: HomeworkById): HomeworkAction => ({
  type: GET_HOMEWORK_BY_ID_SUCCESS,
  payload: homework,
});

export const wretchHomework = (id: number) => {
  return async (dispatch: Dispatch<HomeworkAction>) => {
    dispatch(loadingHomework());
    let res = await baseWretch().url(getHomeworkById(id)).get().json()
    dispatch(loadHomework(res as HomeworkById));
  }
}

export type HomeworkPageAction =
  ReturnType<typeof loadHomework> |
  ReturnType<typeof loadingHomework>;
