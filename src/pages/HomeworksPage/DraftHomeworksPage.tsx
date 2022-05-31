import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { selectTab } from '../../actions/homeworks.actions';
import { TabContainer } from '../../components/TabContainer/TabContainer';
import { HomeworkDraft } from './components/HomeworkDraft';
import { BackButton } from '../../components/BackButton/BackButton';
import { loadDraftsByGroupId } from '../../actions/homeworks.thunks';

export const DraftHomeworksPage = () => {
  const dispatch = useDispatch();
  const { tabs, selectedTab, draftHomeworks } = useSelector(
    (state: AppState) => state.homeworksPageState
  );
  const ref = useRef(selectedTab);

  useEffect(() => {
    if (selectedTab > 0) {
      dispatch(loadDraftsByGroupId(selectedTab));
    }
  }, [selectedTab]);

  return (
    <div className="homeworks-drafts-page">
      <BackButton callback={() => dispatch(selectTab(ref.current))} />
      <TabContainer tabContainerData={tabs} selectedTab={selectedTab} onClick={selectTab} />
      {draftHomeworks?.map((draft) => (
        <HomeworkDraft data={draft} key={draft.id} />
      ))}
    </div>
  );
};
