import { HomeworkStatus } from '../../../../../models/HomeworkCardData';
import { UserResponse } from './UserResponse';

export interface AnswerResponse {
  id: number;
  answer: string;
  status: HomeworkStatus;
  completedDate: string;
  user: UserResponse;
  isDeleted: boolean;
}
