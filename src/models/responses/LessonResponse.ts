export interface LessonResponse {
  id: number
  date: string
  //не хватает поля с названием занятия!!!!
  //theme: string
  additionalMaterials: string
  linkToRecord: string
  isDeleted: false
}