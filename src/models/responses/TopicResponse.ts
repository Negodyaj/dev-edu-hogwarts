export interface TopicResponse {
  position: number;
  topic: {
    id: number;
    name: string;
    duration: number;
  };
}
