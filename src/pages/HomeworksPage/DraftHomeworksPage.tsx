import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { loadDraftHomeworksSuccess, selectTab } from '../../actions/homeworks.actions';
import { TabContainer } from '../../components/TabContainer/TabContainer';
import { baseWretch } from '../../services/base-wretch.service';
import { Task } from '../../models/responses/HomeworksResponse';
import { HomeworkDraft } from './components/HomeworkDraft';
import { BackButton } from '../../components/BackButton/BackButton';

export const DraftHomeworksPage = () => {
  const dispatch = useDispatch();
  const { tabs, selectedTab, draftHomeworks } = useSelector(
    (state: AppState) => state.homeworksPageState
  );
  const ref = useRef(selectedTab);

  useEffect(() => {
    baseWretch()
      .url(`api/Tasks/by-group/${selectedTab}`)
      .get()
      .json((value) => dispatch(loadDraftHomeworksSuccess(value as Task[])));
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
