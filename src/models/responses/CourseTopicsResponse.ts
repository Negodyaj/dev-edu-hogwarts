export interface CourseTopicsResponse {
  id: number;
  position: number;
  topic: Topic;
  isDeleted: boolean;
}

export interface Topic {
  id: number;
  name: string;
  duration: number;
}
