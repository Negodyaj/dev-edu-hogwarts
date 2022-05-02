import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadHomeworks, selectTab } from '../../actions/homeworks.actions';
import { TabContainer } from '../../components/TabContainer/TabContainer';
import { baseWretch } from '../../services/base-wretch.service';
import { AppState } from '../../store/store';
import { HomeworkCard } from './components/HomeworkCard';
import { Homework } from '../../models/responses/HomeworksResponse';
import { getHomeworksByGroupId } from '../../shared/consts';

export const HomeworksPage = () => {
  const dispatch = useDispatch();
  const { tabs, homeworks, selectedTab } = useSelector(
    (state: AppState) => state.homeworksPageState
  );

  useEffect(() => {
    if (selectedTab > 0) {
      baseWretch()
        .url(getHomeworksByGroupId(selectedTab))
        .get()
        .json((data) => dispatch(loadHomeworks(data as Homework[])));
    }
  }, [selectedTab]);

  return (
    <>
      <div>
        <TabContainer
          tabContainerData={tabs}
          selectedTab={selectedTab}
          onClick={selectTab}
        />
        {homeworks && homeworks.length > 0 ? (
          homeworks.map((hw) => <HomeworkCard data={hw} key={hw.id} />)
        ) : (
          <div>Домашек нема</div>
        )}
      </div>
    </>
  );
};
