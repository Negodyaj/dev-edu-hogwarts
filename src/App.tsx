import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { HomeworksPage } from './pages/HomeworksPage/HomeworksPage';
import { LessonsPage } from './pages/LessonsPage/LessonsPage';
import { NotificationsPage } from './pages/NotificationsPage/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage/SettingsPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { NewGroupPage } from './pages/NewGroupPage/NewGroupPage';
import { MainPanel } from './components/MainPanel/MainPanel';
import { CoursesPage } from './pages/CoursesPage/CoursesPage';
import { EditCoursesPage } from './pages/CoursesPage/EditCoursesPage';
import { NewHomework } from './pages/NewHomework/NewHomework';
import { HomeworkReviewPage } from './pages/HomeworkReviewPage/HomeworkReviewPage';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCurrentUser } from './services/auth.service';
import { HomeworkPage } from './pages/HomeworksPage/HomeworkPage/HomeworkPage';
import { HomeworkEditPage } from './pages/HomeworksPage/HomeworkPage/HomeworkEditPage';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentUser(dispatch);
  }, []);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <div className="flex-container">
      <MainPanel
        isCollapsed={isCollapsed}
        setIsCollapsed={() => setIsCollapsed(!isCollapsed)}
      />
      <main className={isCollapsed ? 'closed' : ' '}>
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
          <Route path="group" element={<NewGroupPage />} />
          <Route path="homework-review" element={<HomeworkReviewPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
