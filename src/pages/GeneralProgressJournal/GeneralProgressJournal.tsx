import { TabContainer } from '../../components/TabContainer/TabContainer';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { selectTab } from '../../actions/generalProgress.actions';
import { BackButton } from '../../components/BackButton/BackButton';

export const GeneralProgressJournal = () => {
  const { tabs, selectedTab } = useSelector((state: AppState) => state.generalProgressState);

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
    </div>
  );
};
