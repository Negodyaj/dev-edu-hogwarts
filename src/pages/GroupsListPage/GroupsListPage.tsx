import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroups, selectGroup, selectTab } from '../../actions/groups.actions';
import { TabContainer } from '../../components/TabContainer/TabContainer';
import { GroupResponse } from '../../models/responses/GroupResponse';
import { GroupResponseById } from '../../models/responses/GroupResponseById';
import { TabData } from '../../models/TabData';
import { baseWretch } from '../../services/base-wretch.service';
import { getGroupById, groupUrl } from '../../shared/consts';
import { Icon } from '../../shared/enums/Icon';
import { GroupsPageState } from '../../store/reducers/groups.reducer';
import { AppState } from '../../store/store';

export const GroupsListPage = () => {
  const { groups, selectedGroup, selectedTab } = useSelector(
    (state: AppState) => state.groupsPageState as GroupsPageState
  );
  // const { groups, selectedTab } = useSelector(
  //   (state: AppState) => state.groupsPageState as GroupsPageState
  // );
  // const group:GroupResponseById={
  //   students:[],
  //   tutors:[],
  //   teachers:[],
  //   id:0
  // }
  // const [selectedGroup, setSelectedGroup]=useState<GroupResponseById>(group)
  const dispatch = useDispatch();

  useEffect(() => {
    baseWretch()
      .url(getGroupById(selectedTab))
      .get()
      .json((dataGroup) => {
        dispatch(selectGroup(dataGroup as GroupResponseById));
      });
    // baseWretch()
    // .url(getGroupById(selectedTab))
    // .get()
    // .json((dataGroup) => {
    //   setSelectedGroup(dataGroup as GroupResponseById);
    // });
    console.log(selectedGroup.students);
    console.log(selectedTab);
  }, [selectedTab]);

  return (
    <>
      <TabContainer
        tabContainerData={groups?.map((item) => {
          const tabItem: TabData = {
            id: item.id,
            text: item.name,
            icon: Icon.Chevron,
          };
          return tabItem;
        })}
        selectedTab={selectedTab}
        onClick={selectTab}
      />
      <div className="content-container">
        <a href="#">Редактировать</a>
        <div className="teachers-list">
          <h2>Преподаватель:</h2>
          <div className="list">
            {selectedGroup.teachers.map((teacher) => {
              <span> `${teacher.firstName + ' ' + teacher.lastName}`</span>;
            })}
          </div>
        </div>
        <div className="tutors-list">
          <h2>Тьютор:</h2>
          <div className="list">
            {selectedGroup.tutors.map((tutor) => {
              <span>{tutor.firstName}</span>;
            })}
          </div>
        </div>
        <div className="student-list">
          <div className="list">
            <h2>ФИО студента</h2>
            {selectedGroup.students.map((student) => {
              <span>{student.firstName}</span>;
            })}
          </div>
          <a href="#">Редактировать список группы</a>
        </div>
      </div>
    </>
  );
};
