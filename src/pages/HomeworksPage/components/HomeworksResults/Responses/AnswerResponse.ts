import { UserResponse } from './UserResponse';

export interface AnswerResponse {
  id: number;
  answer: string;
  status: HomeworkStatus;
  completedDate: string;
  user: UserResponse;
  isDeleted: boolean;
}

//for Mock
export enum HomeworkStatus {
  Undone = 'Undone',
  ToCheck = 'ToCheck',
  ToFix = 'ToFix',
  ToVerifyFixes = 'ToVerifyFixes',
  Done = 'Done',
  DoneAfterDeadline = 'DoneAfterDeadline',
}
