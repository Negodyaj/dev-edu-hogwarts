import { Dispatch } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AddHomeworkFormData } from '../../pages/NewHomework/NewHomework';
import {
  createNewTaskByMethodist,
  createNewTaskByTeacher,
  tasksCountInGroup,
} from '../../actions/homeworks.thunks';
import { Homework } from '../../models/responses/HomeworksResponse';
import { UserRole } from '../enums/UserRole';
import { convertDate } from './dateHelpers';
import moment from 'moment';
import {
  getTasksCount,
  removeLinks,
  selectGroup,
  setValueInInput,
} from '../../actions/newHomeworkForm.action';

export const resetForm = (
  links: string[],
  dispatch: Dispatch<any>,
  method: UseFormReturn<AddHomeworkFormData, any>
) => {
  links.length = 0;
  method.reset({
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    courseIds: [],
    links: '',
  });
  dispatch(removeLinks());
  dispatch(setValueInInput(''));
  dispatch(getTasksCount([]));
  dispatch(tasksCountInGroup(0));
  dispatch(selectGroup(-1));
};

export const createHomeworkFromData = (homework: Homework, data: AddHomeworkFormData) => {
  return {
    ...homework,
    startDate: `${data.startDate}`,
    endDate: `${data.endDate}`,
    task: {
      ...homework.task,
      groupId: data.groupId,
      name: data.name,
      description: data.description,
      links: data.links,
    },
  };
};

export const returnFunctionByRole = (currentRole: UserRole): ((...args: any) => void) => {
  return currentRole === UserRole.Methodist ? createNewTaskByMethodist : createNewTaskByTeacher;
};

export const validateLinkPath = (link: string, links: string[], value?: string) => {
  return (
    (link && /^[a-z]+:\/\//i.test(value ?? link) && !links.includes(value ?? link)) ||
    link.length === 0 ||
    value === ''
  );
};

export const fixHomeworkFormData = (data: AddHomeworkFormData, links: string[]) => ({
  ...data,
  links: links.join(' [link] '),
  isRequired: true,
  startDate: data.startDate ? convertDate(data.startDate) : moment().format('DD.MM.YYYY'),
  endDate: convertDate(data.endDate),
});
