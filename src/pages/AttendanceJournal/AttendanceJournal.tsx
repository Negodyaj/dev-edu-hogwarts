import { Journal } from '../../components/Journal/Journal';
import { TabContainer } from '../../components/TabContainer/TabContainer';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import {
  filterStudentsList,
  loadAttendance,
  selectTab,
} from '../../actions/attendanceJournal.actions';
import { lessonsArr } from './DataMock';
import { useEffect } from 'react';
import { ErrorMesage } from '../../components/Journal/components/ErrorMesage';
import { Button, ButtonModel } from '../../components/Button/Button';
import { Icon } from '../../shared/enums/Icon';

export const AttendanceJournal = () => {
  const dispatch = useDispatch();
  const { tabs, selectedTab, attendanceData, filteredStudentList, error } = useSelector(
    (state: AppState) => state.attendanceJournalState
  );

  useEffect(() => {
    dispatch(loadAttendance(lessonsArr));
  }, []);

  return (
    <div className="journals">
      <TabContainer
        tabContainerData={tabs}
        selectedTab={selectedTab}
        group={true}
        onClick={selectTab}
      />
      <h2>Журнал посещаемости</h2>
      {error ? (
        <ErrorMesage callback={loadAttendance(lessonsArr)} />
      ) : attendanceData && [...attendanceData].length > 0 ? (
        <Journal filteredData={filteredStudentList} filter={filterStudentsList} />
      ) : (
        <div className="error-container">
          <span>Тут еще ничего нет</span>
          <Button
            model={ButtonModel.Colored}
            text="Добавить занятие"
            icon={Icon.Plus}
            width="243"
          />
        </div>
      )}
    </div>
  );
};
