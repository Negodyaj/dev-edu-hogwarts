import { Dispatch } from 'react';
import { Homework, StudentHomework, Task } from '../models/responses/HomeworksResponse';
import { baseWretch } from '../services/base-wretch.service';
import {
  addNewHomeworkWithTaskByTeacherUrl,
  addNewTaskByMethodistUrl,
  addNewTaskByTeacherUrl,
  courseById,
  coursesUrl,
  draftsByGroupId,
  getHomeworksByGroupId,
  getStudentAnswerByTaskId,
  homeworkById,
  taskById,
} from '../shared/consts';
import {
  HomeworksPageAction,
  loadDraftHomeworksSuccess,
  loadHomeworksFail,
  loadHomeworksStarted,
  loadHomeworksSuccess,
} from './homeworks.actions';
import {
  HomeworkPageAction,
  loadHomeworkFail,
  loadHomeworkStarted,
  loadHomeworkSuccess,
  loadStudentHomework,
} from './homework.actions';
import { AddHomeworkFormData } from '../pages/NewHomework/NewHomework';
import {
  getTask,
  getTasksCount,
  getTasksCountInCourse,
  loadCourses,
  NewHomeworkFormAction,
  postHomeworkFail,
  postHomeworkStarted,
  postHomeworkSuccess,
} from './newHomeworkForm.action';
import { CourseResponse, CourseSimpleResponse } from '../models/responses/CourseSimpleResponse';
import {
  deleteFail,
  deleteStart,
  deleteSuccess,
  ModalWindowActions,
  setWindowType,
} from './modalWindow.actions';
import { ModalType } from '../shared/enums/modalType';
import { addNotification } from './notificationsContainer.actions';
import { NotificationType } from '../shared/enums/NotificationType';

export const loadHomeworks = (groupId: number) => {
  return async (dispatch: Dispatch<HomeworksPageAction>) => {
    dispatch(loadHomeworksStarted());

    const data = await baseWretch().url(getHomeworksByGroupId(groupId)).get().json<Homework[]>();
    dispatch(loadHomeworksSuccess(data));
  };
};

export const loadHomework = (homeworkId: number) => {
  return async (dispatch: Dispatch<HomeworkPageAction>) => {
    dispatch(loadHomeworkStarted());

    try {
      const homework = await baseWretch().url(homeworkById(homeworkId)).get().json<Homework>();
      dispatch(loadHomeworkSuccess(homework));

      const studentHomework = await baseWretch()
        .url(getStudentAnswerByTaskId(homework.task.id))
        .get()
        .json<StudentHomework>();
      dispatch(loadStudentHomework(studentHomework));
    } catch (error: any) {
      dispatch(loadHomeworkFail(error.message));
    }
  };
};

export const createNewHomework = (homeworkData: AddHomeworkFormData) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(postHomeworkStarted());

    try {
      await baseWretch().url(addNewHomeworkWithTaskByTeacherUrl).post(homeworkData);
      dispatch(postHomeworkSuccess());
      dispatch(addNotification({ type: NotificationType.Good, text: 'Задание успешно создано' }));
    } catch (e: any) {
      dispatch(postHomeworkFail(e.message));
      dispatch(addNotification({ type: NotificationType.Bad, text: 'Произошла ошибка' }));
    }
  };
};

export const createNewTaskByTeacher = (homeworkData: AddHomeworkFormData, links: string[]) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(postHomeworkStarted());

    try {
      await baseWretch()
        .url(addNewTaskByTeacherUrl)
        .post({
          name: homeworkData.name,
          description: homeworkData.description,
          groupId: homeworkData.groupId,
          links: links.join(' [link] '),
          isRequired: true,
        });
      dispatch(postHomeworkSuccess());
      dispatch(addNotification({ type: NotificationType.Good, text: 'Задание успешно создано' }));
    } catch (e: any) {
      dispatch(postHomeworkFail(e.message));
      dispatch(addNotification({ type: NotificationType.Bad, text: 'Произошла ошибка' }));
    }
  };
};

export const createNewTaskByMethodist = (homeworkData: AddHomeworkFormData, links: string[]) => {
  return async (dispatch: Dispatch<NewHomeworkFormAction>) => {
    dispatch(postHomeworkStarted());

    try {
      await baseWretch()
        .url(addNewTaskByMethodistUrl)
        .post({
          name: homeworkData.name,
          description: homeworkData.description,
          courseId: homeworkData.groupId,
          links: links.join(' [link] '),
          isRequired: true,
        });
      dispatch(postHomeworkSuccess());
    } catch (e: any) {
      dispatch(postHomeworkFail(e.message));
    }
  };
};

export const loadDraftsByGroupId = (groupId: number) => {
  return async (dispatch: Dispatch<HomeworksPageAction>) => {
    dispatch(loadHomeworksStarted());

    try {
      const drafts = await baseWretch().url(draftsByGroupId(groupId)).get().json<Task[]>();
      dispatch(loadDraftHomeworksSuccess(drafts));
    } catch (e: any) {
      dispatch(loadHomeworksFail(e.message));
    }
  };
};

export const getTaskById = (taskId: number) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(postHomeworkStarted());
    try {
      const task = await baseWretch().url(taskById(taskId)).get().json<Task>();
      dispatch(getTask(task));
      dispatch(postHomeworkSuccess());
    } catch (e: any) {
      dispatch(postHomeworkFail(e.message));
    }
  };
};

export const getCourses = () => {
  return async (dispatch: Dispatch<NewHomeworkFormAction>) => {
    try {
      const courses = await baseWretch().url(coursesUrl).get().json<CourseSimpleResponse[]>();
      dispatch(loadCourses(courses));
    } catch (e: any) {
      dispatch(postHomeworkFail(e.message));
    }
  };
};

export const tasksCountInGroup = (groupId: number) => {
  return async (dispatch: Dispatch<NewHomeworkFormAction>) => {
    try {
      const group = await baseWretch().url(getHomeworksByGroupId(groupId)).get().json<Homework[]>();
      dispatch(getTasksCount(group));
    } catch (e: any) {
      dispatch(postHomeworkFail(e.message));
    }
  };
};

export const tasksCountInCourse = (courseId: number) => {
  return async (dispatch: Dispatch<NewHomeworkFormAction>) => {
    try {
      const course = await baseWretch().url(courseById(courseId)).get().json<CourseResponse>();
      dispatch(getTasksCountInCourse(course.tasks));
    } catch (e: any) {
      dispatch(postHomeworkFail(e.message));
    }
  };
};

export const updateTask = (taskId: number, data: AddHomeworkFormData) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(postHomeworkStarted());
    if (taskId < 0) {
      dispatch(postHomeworkFail('Что-то пошло не так'));
    }
    try {
      const task = {
        name: data.name,
        description: data.description,
        links: data.links,
        isRequired: true,
      };
      await baseWretch().url(taskById(taskId)).put(task);
      dispatch(getTask({ ...task, id: taskId, isDeleted: false }));
      dispatch(postHomeworkSuccess());
      dispatch(addNotification({ type: NotificationType.Good, text: 'Изменения сохранены' }));
    } catch (e: any) {
      dispatch(postHomeworkFail(e.message));
      dispatch(addNotification({ type: NotificationType.Bad, text: 'Произошла ошибка' }));
    }
  };
};

export const updateHomework = (homeworkId: number, data: AddHomeworkFormData) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(postHomeworkStarted());
    if (homeworkId < 0) {
      dispatch(postHomeworkFail('Что-то пошло не так'));
    }
    try {
      await baseWretch().url(homeworkById(homeworkId)).put({
        startDate: data.startDate,
        endDate: data.endDate,
      });
      dispatch(postHomeworkSuccess());
    } catch (e: any) {
      dispatch(postHomeworkFail(e.message));
      dispatch(addNotification({ type: NotificationType.Bad, text: 'Произошла ошибка' }));
    }
  };
};

export const deleteHomework = (homeworkId: number | string) => {
  return async (dispatch: Dispatch<ModalWindowActions>) => {
    dispatch(deleteStart());
    try {
      await baseWretch().url(homeworkById(homeworkId)).delete().res();
      dispatch(deleteSuccess());
      dispatch(setWindowType(ModalType.deleteHomeworkSuccess));
    } catch (e: any) {
      dispatch(setWindowType(ModalType.deleteHomeworkError));
      dispatch(deleteFail(e.message));
    }
  };
};

export const deleteTask = (taskId: number | string) => {
  return async (dispatch: Dispatch<ModalWindowActions>) => {
    dispatch(deleteStart());

    try {
      await baseWretch().url(taskById(taskId)).delete().res();
      dispatch(deleteSuccess());
      dispatch(setWindowType(ModalType.deleteHomeworkSuccess));
    } catch (e: any) {
      dispatch(deleteFail(e.message));
      dispatch(setWindowType(ModalType.deleteHomeworkError));
    }
  };
};
