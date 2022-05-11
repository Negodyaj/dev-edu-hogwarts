import { Journal } from '../../components/Journal/Journal';
import { TabContainer } from '../../components/TabContainer/TabContainer';
import { Icon } from '../../shared/enums/Icon';

export const AttendanceJournal = () => {
  return (
    <>
      <TabContainer
        tabContainerData={[
          {
            id: 0,
            text: 'text',
            icon: Icon.Pencil,
          },
        ]}
        selectedTab={0}
      />
      <h2>Журнал посещаемости</h2>
      <Journal />
    </>
  );
};
