import { Homework } from './responses/HomeworksResponse';

export type HomeworkProps = {
  data?: Homework;
  children?: JSX.Element;
};

export type HomeworkFormData = {
  answer: string;
};

export enum HomeworkStatus {
  Undone = 'Не сдано',
  ToCheck = 'На проверке',
  ToFix = 'На исправлении',
  ToVerifyFixes = 'На проверке исправлений',
  Done = 'Сдано',
  DoneAfterDeadline = 'Сдано с опозданием',
}
