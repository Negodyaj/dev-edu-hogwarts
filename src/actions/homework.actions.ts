import { Homework, StudentHomework } from '../models/responses/HomeworksResponse';

export const GET_STUDENT_HOMEWORK = 'homework/GET_STUDENT_HOMEWORK' as const;
export const EDIT_HOMEWORK = 'homework/EDIT_HOMEWORK' as const;
export const LOAD_ANSWER = 'homework/LOAD_ANSWER' as const;
export const GET_HOMEWORK_BY_ID = 'homework/GET_HOMEWORK_BY_ID' as const;

export const loadHomework = (homework: Homework | undefined) => ({
  type: GET_HOMEWORK_BY_ID,
  payload: homework,
});

export const editHomework = (edit: boolean) => ({
  type: EDIT_HOMEWORK,
  payload: edit,
});

export const loadAnswer = (answer: string) => ({
  type: LOAD_ANSWER,
  payload: answer,
});

export const loadStudentHomework = (studentHomework: StudentHomework | undefined) => ({
  type: GET_STUDENT_HOMEWORK,
  payload: studentHomework ?? undefined,
});

export type HomeworkPageAction =
  | ReturnType<typeof loadHomework>
  | ReturnType<typeof loadStudentHomework>
  | ReturnType<typeof editHomework>
  | ReturnType<typeof loadAnswer>;
