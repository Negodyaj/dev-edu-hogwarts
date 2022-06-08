import { TopicResponse } from './TopicResponse';

export interface CourseResponse {
  id: number;
  name: string;
  description: string;
  isDeleted: boolean;
  topics: TopicResponse[];
}
