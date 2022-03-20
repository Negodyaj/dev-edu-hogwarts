import './App.scss';
import { Route, Link, Routes } from "react-router-dom";
import { HomeworksPage } from './pages/HomeworksPage/HomeworksPage';
import { LessonsPage } from './pages/LessonsPage/LessonsPage';
import { NotificationsPage } from './pages/NotificationsPage/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage/SettingsPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { InputText } from './Components/InputText/InputText';

function App() {
  return (
    <>
      <aside>
        <nav>
          <ul>
            <li>
              <Link to="/">Notifications</Link>
            </li>
            <li>
              <Link to="/homeworks">Homeworks</Link>
            </li>
            <li>
              <Link to="/lessons">Lessons</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main>
        <InputText placeholder='Введите название'/>
        <Routes>
          <Route path="/" element={<NotificationsPage />} />
          <Route path="homeworks" element={<HomeworksPage />} />
          <Route path="lessons" element={<LessonsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegistrationPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
