import { CourseResponse } from '../models/responses/CourseResponse';
import { TopicResponse } from '../models/responses/TopicResponse';

export const LOAD_COURSES_TABS = 'courses/LOAD_TABS' as const;
export const SET_COURSES = 'courses/LOAD_COURSES' as const;
export const SET_FULL_COURSES = 'courses/SET_FULL_COURSES' as const;
export const SELECT_TAB = 'courses/SELECT_TAB' as const;
export const SET_TOPICS = 'courses/SET_TOPICS' as const;

export const loadCourses = (courses: CourseResponse[] | undefined) => ({
  type: SET_COURSES,
  payload: courses,
});
export const loadCurrentCourse = (currentCourses: CourseResponse) => ({
  type: SET_FULL_COURSES,
  payload: currentCourses,
});

export const setTopics = (topics: TopicResponse[]) => ({
  type: SET_TOPICS,
  payload: topics,
});

export const selectTabCoursePage = (id: number) => ({
  type: SELECT_TAB,
  payload: id,
});

export const loadCoursePageTabs = (courses: CourseResponse[]) => ({
  type: LOAD_COURSES_TABS,
  payload: courses,
});

export type CoursesPageAction =
  | ReturnType<typeof loadCourses>
  | ReturnType<typeof loadCoursePageTabs>
  | ReturnType<typeof loadCurrentCourse>
  | ReturnType<typeof selectTabCoursePage>
  | ReturnType<typeof setTopics>;
