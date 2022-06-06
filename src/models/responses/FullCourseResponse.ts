import { CourseResponse } from './CourseResponse';
import { GroupResponse } from '../responses/GroupResponse';
import { TopicResponse } from './TopicResponse';
export interface FullCourseResponse extends CourseResponse {
  groups: GroupResponse[];
  materials: [];
  tasks: [];
}
