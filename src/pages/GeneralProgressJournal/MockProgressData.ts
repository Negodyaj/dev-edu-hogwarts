import { StudentHomeworkStatus } from '../../models/responses/HomeworksResponse';

export const homeworksProgress = [
  {
    id: 1,
    name: 'Филя',
    LastName: 'Абрикос',
    homeworks: [
      {
        id: 1,
        status: StudentHomeworkStatus.DoneAfterDeadline,
        homework: {
          id: 1,
          startDate: '10.10.20',
          task: {
            id: 1,
            name: 'Покрыть тестами первые три домашки',
          },
        },
      },
      {
        id: 2,
        status: StudentHomeworkStatus.Done,
        homework: {
          id: 2,
          startDate: '10.10.20',
          task: {
            id: 2,
            name: 'DoulblyLinkedList',
          },
        },
      },
      {
        id: 3,
        status: StudentHomeworkStatus.Undone,
        homework: {
          id: 3,
          startDate: '10.12.20',
          task: {
            id: 3,
            name: 'Структуры ветвления',
          },
        },
      },
      {
        id: 4,
        status: StudentHomeworkStatus.DoneAfterDeadline,
        homework: {
          id: 1,
          startDate: '10.10.20',
          task: {
            id: 1,
            name: 'Деструктуризация объектов',
          },
        },
      },
      {
        id: 5,
        status: StudentHomeworkStatus.Done,
        homework: {
          id: 2,
          startDate: '10.10.20',
          task: {
            id: 2,
            name: 'ArrayList',
          },
        },
      },
      {
        id: 6,
        status: StudentHomeworkStatus.ToVerifyFixes,
        homework: {
          id: 3,
          startDate: '10.12.20',
          task: {
            id: 3,
            name: 'ArrayList',
          },
        },
      },
      {
        id: 7,
        status: StudentHomeworkStatus.Done,
        homework: {
          id: 1,
          startDate: '10.10.20',
          task: {
            id: 1,
            name: 'Одномерные массивы',
          },
        },
      },
      {
        id: 8,
        status: StudentHomeworkStatus.ToFix,
        homework: {
          id: 2,
          startDate: '10.10.20',
          task: {
            id: 2,
            name: 'Научитесь проектировать быстрые алгоритмы',
          },
        },
      },
      {
        id: 9,
        status: StudentHomeworkStatus.Undone,
        homework: {
          id: 3,
          startDate: '10.12.20',
          task: {
            id: 3,
            name: 'Структуры ветвления',
          },
        },
      },
    ],
  },
  {
    id: 2,
    name: 'Second',
    LastName: 'Барабан',
    homeworks: [
      {
        id: 1,
        status: StudentHomeworkStatus.Undone,
        homework: {
          id: 1,
          startDate: '10.10.20',
          task: {
            id: 1,
            name: 'Покрыть тестами первые три домашки',
          },
        },
      },
      {
        id: 2,
        status: StudentHomeworkStatus.DoneAfterDeadline,
        homework: {
          id: 2,
          startDate: '10.10.20',
          task: {
            id: 2,
            name: 'DoulblyLinkedList',
          },
        },
      },
      {
        id: 3,
        status: StudentHomeworkStatus.ToVerifyFixes,
        homework: {
          id: 3,
          startDate: '10.12.20',
          task: {
            id: 3,
            name: 'Структуры ветвления',
          },
        },
      },
      {
        id: 4,
        status: StudentHomeworkStatus.DoneAfterDeadline,
        homework: {
          id: 1,
          startDate: '10.10.20',
          task: {
            id: 1,
            name: 'Покрыть тестами первые три домашки',
          },
        },
      },
      {
        id: 5,
        status: StudentHomeworkStatus.Done,
        homework: {
          id: 2,
          startDate: '10.10.20',
          task: {
            id: 2,
            name: 'ArrayList',
          },
        },
      },
      {
        id: 6,
        status: StudentHomeworkStatus.ToVerifyFixes,
        homework: {
          id: 3,
          startDate: '10.12.20',
          task: {
            id: 3,
            name: 'ArrayList',
          },
        },
      },
      {
        id: 7,
        status: StudentHomeworkStatus.Undone,
        homework: {
          id: 1,
          startDate: '10.10.20',
          task: {
            id: 1,
            name: 'Одномерные массивы',
          },
        },
      },
      {
        id: 8,
        status: StudentHomeworkStatus.Undone,
        homework: {
          id: 2,
          startDate: '10.10.20',
          task: {
            id: 2,
            name: 'Научитесь проектировать быстрые алгоритмы',
          },
        },
      },
      {
        id: 9,
        status: StudentHomeworkStatus.Undone,
        homework: {
          id: 3,
          startDate: '10.12.20',
          task: {
            id: 3,
            name: 'Структуры ветвления',
          },
        },
      },
    ],
  },
  {
    id: 3,
    name: 'Амеба',
    LastName: 'Ворона',
    homeworks: [
      {
        id: 1,
        status: StudentHomeworkStatus.ToCheck,
        homework: {
          id: 1,
          startDate: '10.10.20',
          task: {
            id: 1,
            name: 'Покрыть тестами первые три домашки',
          },
        },
      },
      {
        id: 2,
        status: StudentHomeworkStatus.Done,
        homework: {
          id: 2,
          startDate: '10.10.20',
          task: {
            id: 2,
            name: 'DoulblyLinkedList',
          },
        },
      },
      {
        id: 3,
        status: StudentHomeworkStatus.Undone,
        homework: {
          id: 3,
          startDate: '10.12.20',
          task: {
            id: 3,
            name: 'Структуры ветвления',
          },
        },
      },
      {
        id: 4,
        status: StudentHomeworkStatus.DoneAfterDeadline,
        homework: {
          id: 1,
          startDate: '10.10.20',
          task: {
            id: 1,
            name: 'Покрыть тестами первые три домашки',
          },
        },
      },
      {
        id: 5,
        status: StudentHomeworkStatus.Done,
        homework: {
          id: 2,
          startDate: '10.10.20',
          task: {
            id: 2,
            name: 'ArrayList',
          },
        },
      },
      {
        id: 6,
        status: StudentHomeworkStatus.Undone,
        homework: {
          id: 3,
          startDate: '10.12.20',
          task: {
            id: 3,
            name: 'ArrayList',
          },
        },
      },
      {
        id: 7,
        status: StudentHomeworkStatus.Done,
        homework: {
          id: 1,
          startDate: '10.10.20',
          task: {
            id: 1,
            name: 'Одномерные массивы',
          },
        },
      },
      {
        id: 8,
        status: StudentHomeworkStatus.ToFix,
        homework: {
          id: 2,
          startDate: '10.10.20',
          task: {
            id: 2,
            name: 'Научитесь проектировать быстрые алгоритмы',
          },
        },
      },
      {
        id: 9,
        status: StudentHomeworkStatus.Undone,
        homework: {
          id: 3,
          startDate: '10.12.20',
          task: {
            id: 3,
            name: 'Структуры ветвления',
          },
        },
      },
    ],
  },
];
