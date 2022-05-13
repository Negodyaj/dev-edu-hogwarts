import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTab } from '../../actions/homeworks.actions';
import { loadHomeworks } from '../../actions/homeworks.thunks';
import { TabContainer } from '../../components/TabContainer/TabContainer';
import { AppState } from '../../store/store';
import { HomeworkCard } from './components/HomeworkCard';
import { LoginPageState } from '../../store/reducers/login.reducer';
import { UserRole } from '../../shared/enums/UserRole';
import { loadCoursePageTabs, loadCourses } from '../../actions/courses.actions';
import { CourseResponse } from '../../models/responses/CourseResponse';
import { selectTabCoursePage } from '../../actions/courses.actions';
import { baseWretch } from '../../services/base-wretch.service';
export const HomeworksPage = () => {
  const dispatch = useDispatch();
  const { tabs, homeworks, selectedTab } = useSelector(
    (state: AppState) => state.homeworksPageState
  );
  const { currentUser } = useSelector((state: AppState) => state.loginPageState as LoginPageState);
  const { courseTabs } = useSelector((state: AppState) => state.coursesPageState);
  const { courses, selectedTabCoursePage } = useSelector(
    (state: AppState) => state.coursesPageState
  );

  useEffect(() => {
    if (!currentUser?.roles.includes(UserRole.Student)) {
      baseWretch()
        .url('api/Courses')
        .get()
        .json((data) => dispatch(loadCourses(data as CourseResponse[])));
    }
  }, [selectedTab]);
  useEffect(() => {
    if (selectedTab > 0) {
      dispatch(loadHomeworks(selectedTab));
    }
  }, [selectedTab]);
  useEffect(() => {
    if (courses && courses?.length > 0) dispatch(loadCoursePageTabs(courses as CourseResponse[]));
  }, [courses]);

  return (
    <>
      <div>
        <TabContainer
          tabContainerData={!currentUser?.roles.includes(UserRole.Student) ? courseTabs : tabs}
          selectedTab={
            !currentUser?.roles.includes(UserRole.Student) ? selectedTabCoursePage : selectedTab
          }
          onClick={!currentUser?.roles.includes(UserRole.Student) ? selectTabCoursePage : selectTab}
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
