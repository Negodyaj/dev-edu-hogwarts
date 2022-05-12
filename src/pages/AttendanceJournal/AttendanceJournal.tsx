import { Journal } from '../../components/Journal/Journal';
import { TabContainer } from '../../components/TabContainer/TabContainer';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { selectTab } from '../../actions/attendanceJournal.actions';

export const AttendanceJournal = () => {
  const { tabs, selectedTab } = useSelector((state: AppState) => state.attendanceJournalState);

  return (
    <>
      <TabContainer
        tabContainerData={tabs}
        selectedTab={selectedTab}
        group={true}
        onClick={selectTab}
      />
      <h2>Журнал посещаемости</h2>
      <Journal />
    </>
  );
};
