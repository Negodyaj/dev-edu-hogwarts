import { Homework, Task } from './responses/HomeworksResponse';

export type HomeworkProps = {
  homeworkData?: Homework;
  taskData?: Task;
  children?: JSX.Element;
};

export type HomeworkFormData = {
  answer: string;
};

export enum HomeworkStatus {
  Undone = 'Не сдано',
  ToCheck = 'Проверить',
  ToFix = 'Исправить',
  ToVerifyFixes = 'Проверить правки',
  Done = 'Сдано',
  DoneAfterDeadline = 'Сдано с опозданием',
}
