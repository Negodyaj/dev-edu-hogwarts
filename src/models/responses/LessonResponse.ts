export interface LessonResponse {
  id: number;
  date: string;
  name: string; //не хватает поля с названием занятия!!!!
  additionalMaterials: string;
  linkToRecord: string;
  isDeleted: false;
}
