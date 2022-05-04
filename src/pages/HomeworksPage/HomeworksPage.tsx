import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadHomeworks, selectTab } from '../../actions/homeworks.actions';
import { TabContainer } from '../../components/TabContainer/TabContainer';
import { baseWretch } from '../../services/base-wretch.service';
import { AppState } from '../../store/store';
import { HomeworkCard } from './components/HomeworkCard';
import { Homework } from '../../models/responses/HomeworksResponse';
import { getHomeworksByGroupId } from '../../shared/consts';
import { LoginPageState } from '../../store/reducers/login.reducer';
import { UserRole } from '../../shared/enums/UserRole';
import {
  loadCoursePageTabs,
  loadCourses,
  loadFullCourses,
} from '../../actions/courses.actions';
import { CourseResponse } from '../../models/responses/CourseResponse';
import { FullCourseResponse } from '../../models/responses/FullCourseResponse';

export const HomeworksPage = () => {
  const dispatch = useDispatch();
  const { tabs, homeworks, selectedTab } = useSelector(
    (state: AppState) => state.homeworksPageState
  );
  const { currentUser } = useSelector(
    (state: AppState) => state.loginPageState as LoginPageState
  );
  const { courseTabs } = useSelector(
    (state: AppState) => state.coursesPageState
  );
  const { courses } = useSelector((state: AppState) => state.coursesPageState);

  useEffect(() => {
    if (selectedTab > 0 && currentUser?.roles.includes(UserRole.Student)) {
      baseWretch()
        .url(getHomeworksByGroupId(selectedTab))
        .get()
        .json((data) => dispatch(loadHomeworks(data as Homework[])));
    } else if (!currentUser?.roles.includes(UserRole.Student)) {
      baseWretch()
        .url('api/Courses')
        .get()
        .json((data) => dispatch(loadCourses(data as CourseResponse[])));
    }
  }, [selectedTab]);
  useEffect(() => {
    if (courses && courses?.length > 0)
      dispatch(loadCoursePageTabs(courses as CourseResponse[]));
  }, [courses]);
  const ids = courses?.map((el) => {
    return el.id;
  });
  useEffect(() => {
    for (let i = 0; i++; i<=ids!.length)
    {
      baseWretch()
        .url(`api/Courses/${ids![i]}/full`)
        .get()
        .json((data) => dispatch(loadFullCourses(data as FullCourseResponse[])));

    }
  }, [ids]);

  return (
    <>
      <div>
        <TabContainer
          tabContainerData={
            !currentUser?.roles.includes(UserRole.Student) ? courseTabs : tabs
          }
          selectedTab={selectedTab}
          onClick={selectTab}
        />
        {homeworks && homeworks.length > 0 ? (
          homeworks.map((hw) => <HomeworkCard data={hw} key={hw.id} />)
        ) : (
          <div>Домашек нема</div>
        )}
      </div>
    </>
  );
};
