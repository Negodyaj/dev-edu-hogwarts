import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FilterItem, FilterList } from '../../../../components/FilterList/FilterList';
import { GroupResponseWithUsers } from '../../../../models/responses/GroupResponseWithUsers';
import { baseWretch } from '../../../../services/base-wretch.service';
import { getAllAnswersEachStudentsByTaskIdUrl, groupUrl } from '../../../../shared/consts';
import { AppState } from '../../../../store/store';
import './HomeworkResults.scss';
import { AnswerResponse } from '../../../../models/responses/AnswerResponse';
import { HwResultRow } from './HwResultRow';
import { AnswersMock } from './Responses/AnswersMock';
import { UserSimpleResponse } from '../../../../models/responses/UserResponse';
import { StudentHomeworkStatus } from '../../../../shared/enums/StudentHomeworkStatus';

const actionFilterValues: FilterItem[] = [
  { id: 0, name: 'Все' },
  { id: 1, name: 'Проверить' },
  { id: 2, name: 'Проверить правки' },
];

const resultFilterValues: FilterItem[] = [
  { id: 0, name: 'Все' },
  { id: 1, name: 'Сдано' },
  { id: 2, name: 'Не сдано' },
  { id: 3, name: 'Сдано с опозданием' },
];

export const HomeworksResults = () => {
  const { selectedTab } = useSelector((state: AppState) => state.homeworksPageState);
  const { homework } = useSelector((state: AppState) => state.homeworkPageState);

  const [answerList, setAnswerList] = useState<AnswerResponse[]>([]);

  useEffect(() => {
    if (homework) {
      //ЗАМЕНИТЬ ПРИ НАЛИЧИИ ENDPOINT'A
      baseWretch()
        .url(`${groupUrl}/${selectedTab}`)
        .get()
        .json((groupsData) => {
          const studentList: UserSimpleResponse[] = (groupsData as GroupResponseWithUsers)
            .students as UserSimpleResponse[];
          const usersIds = studentList.map((user) => user.id);
          baseWretch()
            .url(getAllAnswersEachStudentsByTaskIdUrl(homework?.task.id))
            .get()
            .json((ans) => {
              setAnswerList(
                (ans as AnswerResponse[]).filter((answer) => usersIds.includes(answer.user.id))
              );
            });
        });
    }
  }, []);
  const [answersToDisplay, setAnswersToDisplay] = useState<AnswerResponse[]>(answerList);

  useEffect(() => {
    setAnswerList(AnswersMock); // TO DELETE (MOCK)
    setAnswersToDisplay(answerList);
  }, [answerList]);

  const applyFilterToCheckHW = (item: FilterItem) => {
    setAnswersToDisplay(
      answerList.filter((answer) => {
        switch (item.id) {
          case 1:
            return answer.status === StudentHomeworkStatus.ToCheck;
          case 2:
            return answer.status === StudentHomeworkStatus.ToVerifyFixes;
          default:
            return true;
        }
      })
    );
  };

  const applyFilterIsPass = (item: FilterItem) => {
    setAnswersToDisplay(
      answerList.filter((answer) => {
        switch (item.id) {
          case 1:
            return answer.status === StudentHomeworkStatus.Done;
          case 2:
            return (
              answer.status === StudentHomeworkStatus.Undone ||
              answer.status === StudentHomeworkStatus.ToCheck ||
              answer.status === StudentHomeworkStatus.ToVerifyFixes
            );
          case 3:
            return answer.status === StudentHomeworkStatus.DoneAfterDeadline;
          default:
            return true;
        }
      })
    );
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
          <FilterList data={actionFilterValues} callback={applyFilterToCheckHW} />
        </div>
        <div>
          <FilterList data={resultFilterValues} callback={applyFilterIsPass} />
        </div>
        <div></div>
      </div>
      {answersToDisplay.map((ans) => (
        <HwResultRow data={ans} key={ans.id} />
      ))}
    </div>
  );
};
