import { NewLessonFormData } from '../pages/NewLessonPage/NewLessonPage';

export const UPLOAD_LESSONS_STARTED = 'newLeson/UPLOAD_LESSONS_STARTED' as const;
export const UPLOAD_LESSONS_SUCSSES = 'newLeson/UPLOAD_LESSONS_SUCSSES' as const;
export const UPLOAD_LESSONS_FAIL = 'newLeson/UPLOAD_LESSONS_FAIL' as const;
export const GET_DATA_TO_EDIT = 'newLeson/GET_DATA_TO_EDIT' as const;
export const RESET_DATA_TO_CREATE = 'newLeson/RESET_DATA_TO_CREATE' as const;

export const uploadLessonStarted = () => ({
  type: UPLOAD_LESSONS_STARTED,
});

export const uploadLessonSuccess = () => ({
  type: UPLOAD_LESSONS_SUCSSES,
});

export const uploadLessonFail = (message: string) => ({
  type: UPLOAD_LESSONS_FAIL,
  payload: message,
});

export const getDataToEdit = (lesson: NewLessonFormData) => ({
  type: GET_DATA_TO_EDIT,
  payload: lesson,
});

export const resetDataToCreate = () => ({
  type: RESET_DATA_TO_CREATE,
});

export type NewLessonPageAction =
  | ReturnType<typeof uploadLessonStarted>
  | ReturnType<typeof uploadLessonSuccess>
  | ReturnType<typeof getDataToEdit>
  | ReturnType<typeof resetDataToCreate>
  | ReturnType<typeof uploadLessonFail>;
