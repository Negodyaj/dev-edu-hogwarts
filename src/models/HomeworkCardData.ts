import { Homework, StudentHomework } from './responses/HomeworksResponse';

export type HomeworkProps = {
  data?: Homework;
  dataProgress?: StudentHomework;
  taskNumber?: number;
  children?: any;
};

export type HomeworkFormData = {
  answer: string;
};

export enum HomeworkStatus {
  NotDone = 'Не сделано',
  Unchecked = 'Не проверено',
  // "В проверке",
  // "Исправить",
  // "Сдано с опозданием"
}
