import { UserSimpleResponse } from './UserResponse';

export interface Homework {
  id: number;
  startDate: string;
  endDate: string;
  status: StudentHomeworkStatus;
  number: number;
  task: Task;
}

export interface Task {
  id: number;
  groupId?: number;
  name: string;
  description: string;
  links: string;
  isRequired: boolean;
  isDeleted: boolean;
}

export interface StudentHomework {
  id: number;
  answer: string;
  status: StudentHomeworkStatus;
  completedDate: string;
  user: UserSimpleResponse;
  isDeleted: boolean;
  homework: Homework;
}

export enum StudentHomeworkStatus {
  Undone = 'Undone',
  ToCheck = 'ToCheck',
  ToFix = 'ToFix',
  ToVerifyFixes = 'ToVerifyFixes',
  Done = 'Done',
  DoneAfterDeadline = 'DoneAfterDeadline',
}
