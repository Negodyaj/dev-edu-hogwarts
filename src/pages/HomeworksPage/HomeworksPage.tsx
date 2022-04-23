import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadHomeworkAnswers,
  loadHomeworks,
  selectTab,
} from '../../actions/homeworks.actions';
import { TabContainer } from '../../components/TabContainer/TabContainer';
import { HomeworkCardResponse } from '../../models/responses/HomeworkCardResponse';
import { HomeworkStudentAnswer } from '../../models/responses/HomeworkStudentAnswer';
import { baseWretch } from '../../services/base-wretch.service';
import { LoginPageState } from '../../store/reducers/login.reducer';
import { AppState } from '../../store/store';
import { HomeworkCard } from './components/HomeworkCard';
import {
  HomeworkData,
  StudentHomeworkStatus,
} from '../../models/responses/HomeworksResponse';
import {
  getHomeworksByGroupId,
  studentHomeworksByUserId,
} from '../../shared/consts';

export const HomeworksPage = () => {
  const dispatch = useDispatch();
  const { tabs, homeworks, selectedTab, answers } = useSelector(
    (state: AppState) => state.homeworksPageState
  );

  const { currentUser } = useSelector(
    (state: AppState) => state.loginPageState as LoginPageState
  );

  useEffect(() => {
    if (selectedTab > 0) {
      baseWretch()
        .url(getHomeworksByGroupId(selectedTab))
        .get()
        .json((data) =>
          dispatch(loadHomeworks(data as HomeworkCardResponse[]))
        );
    }
  }, [selectedTab]);

  useEffect(() => {
    if (selectedTab > 0 && currentUser) {
      baseWretch()
        .url(studentHomeworksByUserId(currentUser?.id))
        .get()
        .json((data) =>
          dispatch(loadHomeworkAnswers(data as HomeworkStudentAnswer[]))
        );
    }
  }, [selectedTab]);

  const CheckHWStatus = () => {
    const complited: string[] = [];
    answers?.forEach((answer) => {
      complited.push(answer.homework.task.name);
    });

    // homeworks?.forEach((hw) => {
    //   for (let i = 0; i <= complited.length; i++) {
    //     if (hw.task.name == complited[i]) {
    //       hw.status = 0;
    //     }
    //   }
    // });
    // homeworks?.forEach((hw) => {
    //   if (hw.status == null) {
    //     hw.status = 1;
    //   }
    // });
    return homeworks;
  };
  const newHomeworks = CheckHWStatus()?.map((item, index) => {
    const newHW: HomeworkData = {
      id: item.id,
      taskNumber: index + 1,
      title: item.task.name,
      startDate: item.startDate,
      endDate: item.endDate,
      status: item.status as StudentHomeworkStatus,
      elseData: 'wertyu',
    };
    return newHW;
  });
  return (
    <>
      <div className="margin-common-content">
        <TabContainer
          tabContainerData={tabs}
          selectedTab={selectedTab}
          onClick={selectTab}
        />
        {homeworks!.length > 0 ? (
          <div>
            {newHomeworks?.map((hw) => (
              <HomeworkCard data={hw} key={hw.id} />
            ))}
          </div>
        ) : (
          <div>Домашек нема</div>
        )}
      </div>
    </>
  );
};
