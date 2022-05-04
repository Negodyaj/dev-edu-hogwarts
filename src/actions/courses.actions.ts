import { CourseResponse } from '../models/responses/CourseResponse';
import { FullCourseResponse } from '../models/responses/FullCourseResponse';

export const LOAD_COURSES_TABS = 'courses/LOAD_TABS' as const;
export const SET_COURSES = 'courses/LOAD_COURSES' as const;
export const SET_FULL_COURSES = 'courses/SET_FULL_COURSES' as const;

export const loadCourses = (courses: CourseResponse[] | undefined) => ({
  type: SET_COURSES,
  payload: courses,
});
export const loadFullCourses = (fullCourses: FullCourseResponse[]) => ({
  type: SET_FULL_COURSES,
  payload: fullCourses,
});

export const loadCoursePageTabs = (courses: CourseResponse[]) => ({
  type: LOAD_COURSES_TABS,
  payload: courses,
});

export type CoursesPageAction =
  | ReturnType<typeof loadCourses>
  | ReturnType<typeof loadCoursePageTabs>
  | ReturnType<typeof loadFullCourses>;
