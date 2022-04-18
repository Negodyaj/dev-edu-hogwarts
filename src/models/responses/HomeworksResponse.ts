export interface Homework {
  id: number;
  startDate: string;
  endDate: string;
  task: {
    id: number;
    name: string;
    description: string;
    links: string;
    isRequired: boolean;
    isDeleted: boolean;
  };
}

export interface HomeworkWithGroup extends Homework {
  group: {
    id: number;
    name: string;
    groupStatus: GroupStatus;
    startDate: string;
    isDeleted: boolean;
  };
}

enum GroupStatus {
  Forming = 'Forming',
}
