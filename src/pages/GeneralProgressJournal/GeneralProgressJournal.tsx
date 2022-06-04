import { TabContainer } from '../../components/TabContainer/TabContainer';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import {
  filterStudentsList,
  loadProgressSuccess,
  selectTab,
} from '../../actions/generalProgress.actions';
import { BackButton } from '../../components/BackButton/BackButton';
import { Journal } from '../../components/Journal/Journal';
import { useEffect } from 'react';
import { homeworksProgress } from './MockProgressData';

export const GeneralProgressJournal = () => {
  const dispatch = useDispatch();
  const { tabs, selectedTab, filteredStudentList } = useSelector(
    (state: AppState) => state.generalProgressState
  );

  useEffect(() => {
    dispatch(loadProgressSuccess(homeworksProgress));
  }, []);

  return (
    <div className="journals">
      <BackButton />
      <TabContainer
        tabContainerData={tabs}
        selectedTab={selectedTab}
        group={true}
        onClick={selectTab}
      />
      <h2>Общая успеваемость</h2>
      {filteredStudentList && (
        <Journal filteredData={filteredStudentList} filter={filterStudentsList} />
      )}
    </div>
  );
};
