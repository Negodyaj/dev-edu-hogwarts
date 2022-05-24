import { StudentHomeworkStatus } from '../../../../../shared/enums/StudentHomeworkStatus';
import { AnswerResponse } from '../../../../../models/responses/AnswerResponse';

export const AnswersMock: AnswerResponse[] = [
  {
    id: 0,
    answer: 'ответик1',
    status: StudentHomeworkStatus.Done,
    completedDate: '01.01.2001',
    user: {
      id: 0,
      firstName: 'Пупа',
      lastName: 'Пупкин',
      email: 'pupok@mail.com',
      photo: 'нет',
    },
    isDeleted: false,
  },
  {
    id: 1,
    answer: 'ответик2',
    status: StudentHomeworkStatus.DoneAfterDeadline,
    completedDate: '01.01.2023',
    user: {
      id: 1,
      firstName: 'Сидр',
      lastName: 'Сидоров',
      email: 'sidr@mail.com',
      photo: 'нет',
    },
    isDeleted: false,
  },
  {
    id: 2,
    answer: 'ответик3',
    status: StudentHomeworkStatus.ToCheck,
    completedDate: '01.01.2023',
    user: {
      id: 2,
      firstName: 'Саня',
      lastName: 'Санина',
      email: 'sanya@mail.com',
      photo: 'нет',
    },
    isDeleted: false,
  },
  {
    id: 3,
    answer: '',
    status: StudentHomeworkStatus.Undone,
    completedDate: '01.01.2023',
    user: {
      id: 3,
      firstName: 'Лупа',
      lastName: 'Лупов',
      email: 'lupa@mail.com',
      photo: 'нет',
    },
    isDeleted: false,
  },
  {
    id: 4,
    answer: 'ответик5',
    status: StudentHomeworkStatus.ToFix,
    completedDate: '01.01.2023',
    user: {
      id: 4,
      firstName: 'Саня',
      lastName: 'Санина',
      email: 'sanya@mail.com',
      photo: 'нет',
    },
    isDeleted: false,
  },
  {
    id: 5,
    answer: 'ответик6',
    status: StudentHomeworkStatus.ToVerifyFixes,
    completedDate: '01.01.2023',
    user: {
      id: 5,
      firstName: 'Поля',
      lastName: 'Полина',
      email: 'polya@mail.com',
      photo: 'нет',
    },
    isDeleted: false,
  },
];
