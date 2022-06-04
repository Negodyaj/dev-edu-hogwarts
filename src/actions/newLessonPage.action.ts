export const UPLOAD_LESSONS_STARTED = 'newLeson/UPLOAD_LESSONS_STARTED' as const;
export const UPLOAD_LESSONS_SUCSSES = 'newLeson/UPLOAD_LESSONS_SUCSSES' as const;
export const UPLOAD_LESSONS_FAIL = 'newLeson/UPLOAD_LESSONS_FAIL' as const;

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

export type NewLessonPageAction =
  | ReturnType<typeof uploadLessonStarted>
  | ReturnType<typeof uploadLessonSuccess>
  | ReturnType<typeof uploadLessonFail>;
