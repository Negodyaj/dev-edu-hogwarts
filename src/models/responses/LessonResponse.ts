import { UserInfoShortOutputModel } from './UserResponse';

export interface LessonResponse {
  id: number;
  date: string;
  name: string;
  additionalMaterials: string;
  linkToRecord: string;
  number: number;
  teacher: UserInfoShortOutputModel;
  topics?: TopicsResponse[];
  isDeleted: false;
}

export interface TopicsResponse {
  id: number;
  name: string;
}

export interface LessonFullInfoResponse extends LessonResponse {
  students: [
    {
      id: number;
      student: UserInfoShortOutputModel;
      feedback: string;
      attendanceType: string; //"Absent" to add enum
      absenceReason: string;
    }
  ];
}
