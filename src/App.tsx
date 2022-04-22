import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { HomeworksPage } from './pages/HomeworksPage/HomeworksPage';
import { LessonsPage } from './pages/LessonsPage/LessonsPage';
import { NotificationsPage } from './pages/NotificationsPage/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage/SettingsPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { MainPanel } from './components/MainPanel/MainPanel';
import { CoursesPage } from './pages/CoursesPage/CoursesPage';
import { EditCoursesPage } from './pages/CoursesPage/EditCoursesPage';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './actions/login.actions';
import { UserResponse } from './models/responses/UserResponse';
import { baseWretch } from './services/base-wretch.service';
import { useEffect } from 'react';
import { NewHomework } from './pages/NewHomework/NewHomework';
import { HomeworkReviewPage } from './pages/HomeworkReviewPage/HomeworkReviewPage';
import { HomeworkPage } from './pages/HomeworkPage/HomeworkPage';
import { HomeworkEditPage } from './pages/HomeworkPage/HomeworkEditPage';
import { loadGroups } from './actions/newHomeworkForm.action';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    baseWretch()
      .url('api/Users/self')
      .get()
      .json((data) => {
        const user = data as UserResponse;
        dispatch(setCurrentUser(user));
        dispatch(loadGroups(user.groups));
      });
  }, []);

  return (
    <div className="flex-container">
      <MainPanel />
      <main>
        <Routes>
          <Route path="/" element={<NotificationsPage />} />
          <Route path="homeworks" element={<HomeworksPage />} />
          <Route path="homeworks/:id" element={<HomeworkPage />} />
          <Route path="homeworks/:id/new" element={<HomeworkPage />} />
          <Route path="homeworks/:id/edit" element={<HomeworkEditPage />} />
          <Route path="lessons" element={<LessonsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="edit-courses" element={<EditCoursesPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegistrationPage />} />
          <Route path="new-homework" element={<NewHomework />} />
          <Route path="homework-review" element={<HomeworkReviewPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
