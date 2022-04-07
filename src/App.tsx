import './App.scss';
import { Route, Routes } from "react-router-dom";
import { HomeworksPage } from './pages/HomeworksPage/HomeworksPage';
import { LessonsPage } from './pages/LessonsPage/LessonsPage';
import { NotificationsPage } from './pages/NotificationsPage/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage/SettingsPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import {MainPanel} from './components/MainPanel/MainPanel';
import {CoursesPage} from "./pages/CoursesPage/CoursesPage";
import {EditCoursesPage} from "./pages/CoursesPage/EditCoursesPage";
import {IssuingHomework} from "./pages/IssuingHomework/IssuingHomework";

function App() {
  return (
    <div className='flex-container'>
      <MainPanel/>
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
        </Routes>
      </main>
    </div>
  );
}

export default App;
