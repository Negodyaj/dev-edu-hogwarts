export interface Homework {
  id: number;
  startDate: string;
  endDate: string;
  task: Task;
}

export interface Task {
  id: number;
  name: string;
  description: string;
  links: string;
  isRequired: boolean;
  isDeleted: boolean;
}

export interface StudentHomework {
  id: number;
  answer: string;
  status: StudentHomeworkStatus;
  completedDate: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    photo: string;
  };
  isDeleted: boolean;
  homework: Homework;
}

export enum StudentHomeworkStatus {
  Undone = 'Undone',
  ToCheck = 'ToCheck',
  ToFix = 'ToFix',
  ToVerifyFixes = 'ToVerifyFixes',
  Done = 'Done',
  DoneAfterDeadline = 'DoneAfterDeadline',
}

export interface HomeworkData {
  id: number;
  taskNumber: number;
  title: string;
  startDate: string;
  endDate: string;
  status: StudentHomeworkStatus;
  elseData: string;
}
