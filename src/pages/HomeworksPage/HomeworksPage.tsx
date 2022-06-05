import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTab } from '../../actions/homeworks.actions';
import { loadHomeworks } from '../../actions/homeworks.thunks';
import { TabContainer } from '../../components/TabContainer/TabContainer';
import { AppState } from '../../store/store';
import { HomeworkCard } from './components/HomeworkCard';
import { LoginPageState } from '../../store/reducers/login.reducer';
import { UserRole } from '../../shared/enums/UserRole';
import { Button, ButtonModel } from '../../components/Button/Button';
import { Icon } from '../../shared/enums/Icon';
import { useNavigate } from 'react-router-dom';
import { newHomeworkLink } from '../../components/MainPanel/Navigation/constants';

export const HomeworksPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tabs, homeworks, selectedTab } = useSelector(
    (state: AppState) => state.homeworksPageState
  );
  const { currentRole } = useSelector((state: AppState) => state.loginPageState as LoginPageState);

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
          <span className="lack-of-homeworks">Домашних заданий еще нет</span>
        )}
        {(currentRole === UserRole.Teacher || currentRole === UserRole.Methodist) && (
          <div className="buttons-group flex-container buttons-after-list">
            <Button
              model={ButtonModel.Colored}
              text="Добавить задание"
              icon={Icon.Plus}
              onClick={() => navigate(newHomeworkLink)}
            />
            {currentRole !== UserRole.Methodist && (
              <Button
                model={ButtonModel.White}
                text="Сохраненные задания"
                onClick={() => navigate('drafts')}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};
