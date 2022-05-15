import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTab } from '../../actions/groups.actions';
import { loadGroupById, loadGroups } from '../../actions/groups.thunk';
import { Button, ButtonModel } from '../../components/Button/Button';
import { LinkWithUnderline } from '../../components/LinkWithUnderline/LinkWithUnderline';
import { TabContainer } from '../../components/TabContainer/TabContainer';
import { GroupResponse } from '../../models/responses/GroupResponse';
import { TabData } from '../../models/TabData';
import { Icon } from '../../shared/enums/Icon';
import { getGroupIcon } from '../../shared/helpers/iconHelpers';
import { GroupsPageState } from '../../store/reducers/groups.reducer';
import { AppState } from '../../store/store';
import { Loader } from '../HomeworksPage/HomeworkPage/Loader';
import './GroupsListPage.scss';

export const GroupsListPage = () => {
  const { groups, selectedGroup, selectedTab, isLoading } = useSelector(
    (state: AppState) => state.groupsPageState as GroupsPageState
  );

  const [indexForDisplay, setIndexForDisplay] = useState<number>(0);

  const selectGroupToDisplay = (index: number) => {
    const newGroups: GroupResponse[] = groups.slice(index, index + 3);
    return newGroups;
  };
  const [groupsToDisplay, setGroupsToDisplay] = useState<GroupResponse[]>(
    selectGroupToDisplay(indexForDisplay)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (groups.length == 0) {
      dispatch(loadGroups());
    } else {
      dispatch(loadGroupById(selectedTab));
    }
    setGroupsToDisplay(selectGroupToDisplay(indexForDisplay));
  }, [selectedTab, indexForDisplay]);

  return (
    <>
      {isLoading && <Loader />}
      {groups.length >= 4 ? (
        <div className="groups-header">
          <Button
            model={ButtonModel.EllipseWhite}
            icon={Icon.LeftArrow}
            disabled={indexForDisplay == 0}
            onClick={() => {
              setIndexForDisplay(indexForDisplay - 3);
            }}
          />
          <TabContainer
            tabContainerData={groupsToDisplay?.map((item, index) => {
              index >= 5 ? (index = index - 5) : index;
              const tabItem: TabData = {
                id: item.id,
                text: item.name,
                icon: getGroupIcon(index),
              };
              return tabItem;
            })}
            selectedTab={selectedTab}
            onClick={selectTab}
          />
          <Button
            model={ButtonModel.EllipseWhite}
            icon={Icon.RightArrow}
            disabled={indexForDisplay + 3 > groups.length - 1}
            onClick={() => {
              setIndexForDisplay(indexForDisplay + 3);
            }}
          />
          <Button model={ButtonModel.EllipseColored} icon={Icon.Plus} url="/new-group" />
        </div>
      ) : (
        <div className="groups-header">
          <TabContainer
            tabContainerData={groups?.map((item, index) => {
              index >= 5 ? (index = index - 5) : index;
              const tabItem: TabData = {
                id: item.id,
                text: item.name,
                icon: getGroupIcon(index),
              };
              return tabItem;
            })}
            selectedTab={selectedTab}
            onClick={selectTab}
          />
          <Button model={ButtonModel.EllipseColored} icon={Icon.Plus} url="/new-group" />
        </div>
      )}
      <div className="groups-page">
        <div className="content-container">
          <div className="groups-link">
            <LinkWithUnderline path="#" text="Редактировать" />
          </div>
          <div className="groups-list">
            <h2>Преподаватель:</h2>
            <div className="names-list">
              {selectedGroup.teachers.map((teacher) => (
                <span> {teacher.firstName + ' ' + teacher.lastName}</span>
              ))}
            </div>
          </div>
          <div className="groups-list">
            <h2>Тьютор:</h2>
            <div className="names-list">
              {selectedGroup.tutors.map((tutor) => (
                <span>{tutor.firstName + ' ' + tutor.lastName}</span>
              ))}
            </div>
          </div>
          <div className="student-list">
            <div>
              <h2>ФИО студента</h2>
              <div className="names-list">
                {selectedGroup.students.map((student) => (
                  <span>{student.firstName + ' ' + student.lastName}</span>
                ))}
              </div>
            </div>
            <div className="groups-link">
              <LinkWithUnderline path="#" text="Редактировать список группы" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
