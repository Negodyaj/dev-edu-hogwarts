import { Task } from './HomeworksResponse';

export interface CourseResponse {
  id: number;
  name: string;
  isDeleted: boolean;
  tasks: Task[];
}

export interface CourseSimpleResponse {
  id: number;
  name: string;
  isDeleted: boolean;
}
