import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  FilterItem,
  FilterList,
} from '../../../../components/FilterList/FilterList';
import { GroupResponse } from './Responses/GroupResponse';
import { UserResponse } from './Responses/UserResponse';
import { baseWretch } from '../../../../services/base-wretch.service';
import { groupUrl } from '../../../../shared/consts';
import { AppState } from '../../../../store/store';
import './HomeworkResults.scss';
import { AnswerResponse } from './Responses/AnswerResponse';
import { HomeworkStatus } from '../../../../models/HomeworkCardData';
import { HwResultRow } from './HwResultRow';

const toCheckHWFilterData: FilterItem[] = [
  { id: 0, name: 'Все' },
  { id: 1, name: 'Проверить' },
  { id: 2, name: 'Проверить правки' },
];

const resultHWFilterData: FilterItem[] = [
  { id: 0, name: 'Все' },
  { id: 1, name: 'Сдано' },
  { id: 2, name: 'Не сдано' },
  { id: 3, name: 'Сдано с опозданием' },
];

const AnswersMock: AnswerResponse[] = [
  {
    id: 0,
    answer: 'ответик1',
    status: HomeworkStatus.Done,
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
    status: HomeworkStatus.DoneAfterDeadline,
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
    status: HomeworkStatus.ToCheck,
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
    status: HomeworkStatus.Undone,
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
    status: HomeworkStatus.ToFix,
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
    status: HomeworkStatus.ToVerifyFixes,
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

export const HomeworksResults = () => {
  const { selectedTab } = useSelector(
    (state: AppState) => state.homeworksPageState
  );
  const { homework } = useSelector(
    (state: AppState) => state.homeworkPageState
  );

  const [answerList, setAnswerList] = useState<AnswerResponse[]>([]);
  const [answersToDisplay, setAnswersToDisplay] = useState<AnswerResponse[]>(
    []
  );
  const [filteredByCheck, setfilteredByCheck] = useState<AnswerResponse[]>([]);
  const [filteredByPass, setfilteredByPass] = useState<AnswerResponse[]>([]);
  useEffect(() => {
    if (selectedTab > 0) {
      //ЗАМЕНИТЬ ПРИ НАЛИЧИИ ENDPOINT'A
      baseWretch()
        .url(`${groupUrl}/${selectedTab}`) ///api/Groups/{id} -> to get students by group (не возвращает список студентов)
        .get()
        .json((groupsData) => {
          const studentList: UserResponse[] = (groupsData as GroupResponse)
            .students as UserResponse[];
          const usersIds = studentList.map((user) => user.id);
          baseWretch()
            .url(`api/student-homeworks/task/${homework?.task.id}/answers`)
            .get()
            .json((ans) => {
              const answers = ans as AnswerResponse[];
              setAnswerList(
                answers.filter((answer) => usersIds.includes(answer.user.id))
              );
            });
        });
      setAnswerList(AnswersMock); // TO DELETE (MOCK)
      setAnswersToDisplay(answerList);
      setfilteredByCheck(answerList);
      setfilteredByPass(answerList);
    }
  }, [answersToDisplay]);

  const applyFilterToCheckHW = (item: FilterItem) => {
    setfilteredByCheck(
      filteredByPass.filter((answer) => {
        switch (item.id) {
          case 1:
            return (
              answer.status === HomeworkStatus.Done ||
              answer.status === HomeworkStatus.Undone ||
              answer.status === HomeworkStatus.DoneAfterDeadline
            );
          case 2:
            return answer.status === HomeworkStatus.ToVerifyFixes;
          default:
            return true;
        }
      })
    );
    setAnswersToDisplay(filteredByCheck);
  };

  const applyFilterIsPass = (item: FilterItem) => {
    setfilteredByPass(
      filteredByCheck.filter((answer) => {
        switch (item.id) {
          case 1:
            return answer.status === HomeworkStatus.Done;
          case 2:
            return answer.status === HomeworkStatus.ToVerifyFixes;
          case 3:
            return answer.status === HomeworkStatus.DoneAfterDeadline;
          default:
            return true;
        }
      })
    );
    setAnswersToDisplay(filteredByPass);
  };

  return (
    <div className="homework-result-container">
      <h4 className="homework-result-header">Результаты выполнения задания</h4>
      <div className="table-row header">
        <div>ФИО студента</div>
        <div>Задача</div>
        <div>Результат</div>
        <div></div>
      </div>
      <div className="filter-inside table-row">
        <div></div>
        <div>
          <FilterList
            data={toCheckHWFilterData}
            callback={applyFilterToCheckHW}
          />
        </div>
        <div>
          <FilterList data={resultHWFilterData} callback={applyFilterIsPass} />
        </div>
        <div></div>
      </div>
      {answersToDisplay.map((ans) => (
        <HwResultRow data={ans} key={ans.id} />
      ))}
    </div>
  );
};
