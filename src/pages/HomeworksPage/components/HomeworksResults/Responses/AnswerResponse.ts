import { StudentHomeworkStatus } from '../../../../../models/responses/HomeworksResponse';
import { UserSimpleResponse } from '../../../../../models/responses/UserResponse';

export interface AnswerResponse {
  id: number;
  answer: string;
  status: StudentHomeworkStatus;
  completedDate: string;
  user: UserSimpleResponse;
  isDeleted: boolean;
}
