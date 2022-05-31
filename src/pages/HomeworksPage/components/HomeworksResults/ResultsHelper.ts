import { HomeworkStatus } from '../../../../models/HomeworkCardData';
import { StudentHomeworkStatus } from '../../../../shared/enums/StudentHomeworkStatus';

export const getTableData = (status: StudentHomeworkStatus) => {
  switch (status) {
    case StudentHomeworkStatus.Done:
      return { goal: undefined, result: HomeworkStatus.Done };
    case StudentHomeworkStatus.DoneAfterDeadline:
      return { goal: undefined, result: HomeworkStatus.DoneAfterDeadline };
    case StudentHomeworkStatus.ToCheck:
      return { goal: HomeworkStatus.ToCheck, result: HomeworkStatus.Undone };
    case StudentHomeworkStatus.ToFix:
      return { goal: undefined, result: HomeworkStatus.Undone };
    case StudentHomeworkStatus.ToVerifyFixes:
      return { goal: HomeworkStatus.ToVerifyFixes, result: HomeworkStatus.Undone };
    case StudentHomeworkStatus.Undone:
      return { goal: undefined, result: HomeworkStatus.Undone };
  }
};
