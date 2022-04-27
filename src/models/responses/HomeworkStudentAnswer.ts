import { HomeworkCardResponse } from './HomeworkCardResponse'

export interface HomeworkStudentAnswer {
  id: number,
  answer: string,
  completedDate: string,
  taskStatus: string,
  homework: HomeworkCardResponse,
}