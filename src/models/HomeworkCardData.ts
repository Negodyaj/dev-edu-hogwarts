import { HomeworkData, StudentHomework } from './responses/HomeworksResponse';

export type HomeworkProps = {
  data?: HomeworkData;
  dataProgress?: StudentHomework;
  taskNumber?: number;
  children?: JSX.Element;
};

export type HomeworkFormData = {
  answer: string;
};

export enum HomeworkStatus {
  Undone = 'Не сдано',
  ToCheck = 'На проверке',
  ToFix = 'Исправить',
  ToVerifyFixes = 'Проверка исправлений',
  Done = 'Выполнено',
  DoneAfterDeadline = 'Сдано с опозданием',
}
