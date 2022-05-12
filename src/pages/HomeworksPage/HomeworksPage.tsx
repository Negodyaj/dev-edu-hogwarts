import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTab } from '../../actions/homeworks.actions';
import { loadHomeworks } from '../../actions/homeworks.thunks';
import { TabContainer } from '../../components/TabContainer/TabContainer';
import { AppState } from '../../store/store';
import { HomeworkCard } from './components/HomeworkCard';

export const HomeworksPage = () => {
  const dispatch = useDispatch();
  const { tabs, homeworks, selectedTab } = useSelector(
    (state: AppState) => state.homeworksPageState
  );

  useEffect(() => {
    if (selectedTab > 0) {
      dispatch(loadHomeworks(selectedTab));
    }
  }, [selectedTab]);

  return (
    <>
      <div>
        <TabContainer
          tabContainerData={tabs}
          selectedTab={selectedTab}
          onClick={selectTab}
          course={true}
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
