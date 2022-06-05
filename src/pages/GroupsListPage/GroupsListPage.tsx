import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTab } from '../../actions/groups.actions';
import { loadGroupById, loadGroups } from '../../actions/groups.thunk';
import { Button, ButtonModel } from '../../components/Button/Button';
import { LinkWithUnderline } from '../../components/LinkWithUnderline/LinkWithUnderline';
import { TabContainer } from '../../components/TabContainer/TabContainer';
import { GroupResponse } from '../../models/responses/GroupResponse';
import { Icon } from '../../shared/enums/Icon';
import { GroupsPageState } from '../../store/reducers/groups.reducer';
import { AppState } from '../../store/store';
import { Loader } from '../HomeworksPage/HomeworkPage/Loader';
import './GroupsListPage.scss';
import { CourseIcon } from '../../components/SvgIcon/CoursesTabIcons';

export const GroupsListPage = () => {
  const { groups, selectedGroup, selectedTab, isLoading } = useSelector(
    (state: AppState) => state.groupsPageState as GroupsPageState
  );

  const [indexForDisplay, setIndexForDisplay] = useState<number>(0);

  const selectGroupToDisplay = (index: number, numberOfDisplayedItems: number) =>
    groups.slice(index, index + numberOfDisplayedItems);

  const lengthOfTabsRow = 3;

  const [groupsToDisplay, setGroupsToDisplay] = useState<GroupResponse[]>(
    selectGroupToDisplay(indexForDisplay, lengthOfTabsRow)
  );

  const dispatch = useDispatch();

  const changeIndexForDisplay = (index: number) => {
    setIndexForDisplay(index);
    dispatch(selectTab(groups[index].id));
  };

  useEffect(() => {
    if (!groups.length) {
      dispatch(loadGroups());
      setGroupsToDisplay(selectGroupToDisplay(indexForDisplay, lengthOfTabsRow));
    } else {
      dispatch(loadGroupById(selectedTab));
      setGroupsToDisplay(selectGroupToDisplay(indexForDisplay, lengthOfTabsRow));
    }
  }, [selectedTab, indexForDisplay]);

  return (
    <>
      {isLoading && <Loader />}
      {groups.length > lengthOfTabsRow ? (
        <div className="groups-header">
          <Button
            model={ButtonModel.EllipseWhite}
            direction="left"
            disabled={!indexForDisplay}
            onClick={() => {
              changeIndexForDisplay(indexForDisplay - lengthOfTabsRow);
            }}
          />
          <TabContainer
            tabContainerData={groupsToDisplay?.map((item) => ({
              id: item.id,
              text: item.name,
              icon: CourseIcon[item.course.id],
            }))}
            course={true}
            selectedTab={selectedTab}
            onClick={selectTab}
          />
          <Button
            model={ButtonModel.EllipseWhite}
            direction="right"
            disabled={indexForDisplay + lengthOfTabsRow > groups.length - 1}
            onClick={() => {
              changeIndexForDisplay(indexForDisplay + lengthOfTabsRow);
            }}
          />
          <Button model={ButtonModel.EllipseColored} icon={Icon.Plus} url="/new-group" />
        </div>
      ) : (
        <div className="groups-header">
          <TabContainer
            tabContainerData={groups?.map((item) => ({
              id: item.id,
              text: item.name,
              icon: CourseIcon[item.course.id],
            }))}
            course={true}
            selectedTab={selectedTab}
            onClick={selectTab}
          />
          <Button model={ButtonModel.EllipseColored} icon={Icon.Plus} url="/new-group" />
        </div>
      )}
      <div className="groups-page">
        <div className="content-container">
          <div className="groups-link">
            <LinkWithUnderline path={`groups/${selectedGroup.id}`} text="Редактировать" />
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
