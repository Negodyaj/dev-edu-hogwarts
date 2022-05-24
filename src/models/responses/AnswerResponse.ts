import { UserSimpleResponse } from './UserResponse';
import { StudentHomeworkStatus } from '../../shared/enums/StudentHomeworkStatus';

export interface AnswerResponse {
  id: number;
  answer: string;
  status: StudentHomeworkStatus;
  completedDate: string;
  user: UserSimpleResponse;
  isDeleted: boolean;
}
