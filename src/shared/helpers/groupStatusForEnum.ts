import { GroupStatus } from '../enums/GroupStatus';

export const groupStatusForEnum = (status: string) => {
  switch (status) {
    case 'Forming':
      return GroupStatus.Forming;
    case 'ReadyToStudy':
      return GroupStatus.ReadyToStudy;
    case 'InProgress':
      return GroupStatus.InProgress;
    case 'Completed':
      return GroupStatus.Completed;
    default:
      return 0;
  }
};

export const groupStatusEnumReverse = (status: GroupStatus) => {
  switch (status) {
    case 1:
      return 'Forming';
    case 2:
      return 'ReadyToStudy';
    case 3:
      return 'InProgress';
    case 4:
      return 'Completed';
    default:
      return '';
  }
};
