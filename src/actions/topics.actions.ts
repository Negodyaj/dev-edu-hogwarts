//import { CourseTopicsResponse } from '../models/responses/CourseTopicsResponse';
import { TopicFormData } from '../pages/CoursesPage/EditCoursesPage';

export const LOAD_TOPICS_STARTED = 'LOAD_TOPICS_SUCCESS' as const;
export const LOAD_TOPICS_SUCCESS = 'course/LOAD_TOPICS_SUCCESS' as const;
export const LOAD_TOPICS_FAILED = 'LOAD_TOPICS_FAILED' as const;

export const loadTopicsStarted = () => ({
  type: LOAD_TOPICS_STARTED,
});

export const loadTopicsSuccess = (data: TopicFormData[]) => ({
  type: LOAD_TOPICS_SUCCESS,
  payload: data,
});

export const loadTopicsFailed = (message: string) => ({
  type: LOAD_TOPICS_FAILED,
  payload: message,
});

export type CoursesPageActions =
  | ReturnType<typeof loadTopicsStarted>
  | ReturnType<typeof loadTopicsSuccess>
  | ReturnType<typeof loadTopicsFailed>;
