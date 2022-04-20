import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { HomeworksPage } from './pages/HomeworksPage/HomeworksPage';
import { LessonsPage } from './pages/LessonsPage/LessonsPage';
import { NotificationsPage } from './pages/NotificationsPage/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage/SettingsPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import {NewGroupPage} from "./pages/NewGroupPage/NewGroupPage";
import { MainPanel } from './components/MainPanel/MainPanel';
import { CoursesPage } from './pages/CoursesPage/CoursesPage';
import { EditCoursesPage } from './pages/CoursesPage/EditCoursesPage';
import { IssuingHomework } from './pages/IssuingHomework/IssuingHomework';
import { HomeworkReviewPage } from './pages/HomeworkReviewPage/HomeworkReviewPage';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './actions/login.actions';
import { UserResponse } from './models/responses/UserResponse';
import { baseWretch } from './services/base-wretch.service';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    //const getUser = () =>
    baseWretch()
      .url('api/Users/self')
      .get()
      .json((data) => dispatch(setCurrentUser(data as UserResponse)));
    //getUser();
  }, []);

  return (
    <div className="flex-container">
      <MainPanel />
      <main>
        <Routes>
          <Route path="/" element={<NotificationsPage />} />
          <Route path="homeworks" element={<HomeworksPage />} />
          <Route path="lessons" element={<LessonsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="edit-courses" element={<EditCoursesPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegistrationPage />} />
          <Route path="issuing-homework" element={<IssuingHomework />} />
          <Route path="group" element={<NewGroupPage />} />
          <Route path="homework-review" element={<HomeworkReviewPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
