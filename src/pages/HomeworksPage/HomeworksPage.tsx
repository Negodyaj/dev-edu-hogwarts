import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadHomeworkAnswers,
  // loadHomeworkPageTabs,
  loadHomeworks,
  selectTab,
} from '../../actions/homeworks.actions';
import { TabContainer } from '../../components/TabContainer/TabContainer';
import { baseWretch } from '../../services/base-wretch.service';
import { LoginPageState } from '../../store/reducers/login.reducer';
import { AppState } from '../../store/store';
import { HomeworkCard } from './components/HomeworkCard';
import {
  Homework,
  HomeworkData,
  StudentHomework,
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
        .json((data) => dispatch(loadHomeworks(data as Homework[])));
    }
    if (currentUser) {
      baseWretch()
        .url(studentHomeworksByUserId(currentUser?.id))
        .get()
        .json((data) =>
          dispatch(loadHomeworkAnswers(data as StudentHomework[]))
        );
    }
  }, [selectedTab]);

  const newHomeworks = homeworks?.map((item, index) => {
    const answer = answers?.find((ans) => ans.homework.id === item.id);
    console.log(homeworks);
    const newHW: HomeworkData = {
      id: item.id,
      taskNumber: index + 1,
      title: item.task.name,
      startDate: item.startDate,
      endDate: item.endDate,
      status: answer?.status ?? StudentHomeworkStatus.Undone,
      elseData: '',
    };
    return newHW;
  });
  return (
    <>
      <div>
        <TabContainer
          tabContainerData={tabs}
          selectedTab={selectedTab}
          onClick={selectTab}
        />
        {newHomeworks && newHomeworks.length > 0 ? (
          newHomeworks?.map((hw) => <HomeworkCard data={hw} key={hw.id} />)
        ) : (
          <div>Домашек нема</div>
        )}
      </div>
    </>
  );
};
