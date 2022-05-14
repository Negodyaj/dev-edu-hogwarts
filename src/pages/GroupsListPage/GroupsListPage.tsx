import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroups, selectGroup, selectTab } from '../../actions/groups.actions';
import { LinkWithUnderline } from '../../components/LinkWithUnderline/LinkWithUnderline';
import { TabContainer } from '../../components/TabContainer/TabContainer';
import { GroupResponse } from '../../models/responses/GroupResponse';
import { GroupResponseById } from '../../models/responses/GroupResponseById';
import { TabData } from '../../models/TabData';
import { baseWretch } from '../../services/base-wretch.service';
import { getGroupById, groupUrl } from '../../shared/consts';
import { Icon } from '../../shared/enums/Icon';
import { GroupsPageState } from '../../store/reducers/groups.reducer';
import { AppState } from '../../store/store';
import './GroupsListPage.scss';

export const GroupsListPage = () => {
  const { groups, selectedGroup, selectedTab } = useSelector(
    (state: AppState) => state.groupsPageState as GroupsPageState
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (groups.length == 0) {
      baseWretch()
        .url(groupUrl)
        .get()
        .json((data) => {
          const groupsList = data as GroupResponse[];
          const id: number = groupsList[0].id;
          baseWretch()
            .url(getGroupById(id))
            .get()
            .json((dataGroup) => {
              dispatch(selectGroup(dataGroup as GroupResponseById));
              dispatch(getGroups(groupsList));
              dispatch(selectTab(id));
            });
          console.log(selectedTab);
          console.log(selectedGroup.students);
        });
    } else {
      baseWretch()
        .url(getGroupById(selectedTab))
        .get()
        .json((GroupInfo) => {
          dispatch(selectGroup(GroupInfo as GroupResponseById));
        });
    }
  }, [selectedTab]);

  const IconForGroupTabs: Icon[] = [Icon.Barrel, Icon.Computer, Icon.TwiceArrow, Icon.FolderWithTick, Icon.Computer];
   

  return (
    <>
      <TabContainer
        tabContainerData={groups?.map((item, index) => {
          if (index>=IconForGroupTabs.length) {index=index-IconForGroupTabs.length} else index
          const tabItem: TabData = {
            id: item.id,
            text: item.name,
            icon: Icon.Computer,
          };
          return tabItem;
        })}
        selectedTab={selectedTab}
        onClick={selectTab}
      />
      <div className='groups-page'>
      <div className="content-container">
        <div className='groups-link'>
          <LinkWithUnderline path='#' text='Редактировать'/>
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
          <div className='groups-link'>
            <LinkWithUnderline path='#' text='Редактировать список группы'/>
          </div>
          </div>
        </div>
        </div>
    </>
  );
};
