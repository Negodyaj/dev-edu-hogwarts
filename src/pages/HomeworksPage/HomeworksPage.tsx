import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadHomeworks } from '../../actions/homeworks.actions';
import { TabContainer } from '../../components/TabContainer/TabContainer';
import { HomeworkCardResponse } from '../../models/responses/HomeworkCardResponse';
import { baseWretch } from '../../services/base-wretch.service';
import { AppState } from '../../store/store';
import { HomeworkCard, HomeworkData } from './components/HomeworkCard';

export const HomeworksPage = () => {
  const dispatch = useDispatch();
  const { tabs, homeworks, selectedTab } = useSelector(
    (state: AppState) => state.homeworksPageState
  );

  useEffect(() => {
    if (selectedTab > 0) {
      baseWretch()
        .url(`api/Homeworks/by-group/${selectedTab}`)
        .get()
        .json((data) =>
          dispatch(loadHomeworks(data as HomeworkCardResponse[]))
        );
    }
  }, [selectedTab]);
  const newHomeworks = homeworks?.map((item, index) => {
    const newHW: HomeworkData = {
      id: item.id,
      taskNumber: index + 1,
      title: item.task.name,
      dateBeginning: item.startDate,
      dateEnd: item.endDate,
      status: 1,
      elseData: 'wertyu',
    };
    return newHW;
  });
  return (
    <>
      <div className="margin-common-content">
        <TabContainer tabContainerData={tabs} selectedTab={selectedTab} />
        {homeworks!.length > 0 ? (
          <div>
            {newHomeworks?.map((hw) => (
              <HomeworkCard data={hw} />
            ))}
          </div>
        ) : (
          <div>Домашек нема</div>
        )}
      </div>
    </>
  );
};
