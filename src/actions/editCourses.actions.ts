import { TopicFormData } from '../pages/CoursesPage/EditCoursesPage';

export const UPDATE_TOPICS_STARTED = 'UPDATE_TOPICS_SUCCESS' as const;
export const UPDATE_TOPICS_SUCCESS = 'UPDATE_TOPICS_SUCCESS' as const;
export const UPDATE_TOPICS_FAILED = 'UPDATE_TOPICS_FAILED' as const;
export const ADD_TOPIC = 'ADD_TOPIC' as const;

export const updateCourseTopicsStarted = () => ({
  type: UPDATE_TOPICS_STARTED,
});

export const updateCourseTopicsSuccess = (data: TopicFormData) => ({
  type: UPDATE_TOPICS_SUCCESS,
  payload: data,
}); //update all program

export const updateCourseTopicsFailed = (message: string) => ({
  type: UPDATE_TOPICS_FAILED,
  payload: message,
});

export const addTopic = (data: TopicFormData) => ({
  type: ADD_TOPIC,
  payload: data,
}); //add one topic

export type EditCoursesPageActions =
  | ReturnType<typeof updateCourseTopicsSuccess>
  | ReturnType<typeof addTopic>;
