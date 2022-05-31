import './App.scss';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentUser } from './services/auth.service';
import { HomeworkPage } from './pages/HomeworksPage/HomeworkPage/HomeworkPage';
import { HomeworkEditPage } from './pages/HomeworksPage/HomeworkPage/HomeworkEditPage';
import { PaymentsPage } from './pages/PaymentsPage/PaymentsPage';
import { AppState } from './store/store';
import { MainPanelState } from './store/reducers/mainPanel.reducer';
import { LoginPageState } from './store/reducers/login.reducer';
import { DraftHomeworksPage } from './pages/HomeworksPage/DraftHomeworksPage';
import { EditHomeworkPage } from './pages/HomeworksPage/EditHomeworkPage';
import { NotificationsContainer } from './components/NotificationsContainer/NotificationsContainer';
import { SettingsPassword } from './pages/SettingsPage/SettingsPassword';
import { StudentsListPage } from './pages/StudentsListPage/StudentsList';
import { EditTaskPage } from './pages/HomeworksPage/EditTaskPage';
import { ModalWindowState } from './store/reducers/modalWindow.reducer';
import { ModalWindow } from './components/ModalWindow/ModalWindow';
import { GroupsListPage } from './pages/GroupsListPage/GroupsListPage';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);
  const { currentUser } = useSelector((state: AppState) => state.loginPageState as LoginPageState);
  const { isModalOpen } = useSelector(
    (state: AppState) => state.modalWindowState as ModalWindowState
  );

  useEffect(() => {
    getCurrentUser(dispatch);

    if (!currentUser) {
      navigate('/login', { replace: true, state: location.pathname });
    } else {
      navigate('/');
    }
  }, []);

  const { isCollapsed } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);

  return (
    <>
      <div
        className={`flex-container${isModalOpen ? ' inactive' : ''} ${
          isDark ? 'dark-mode' : 'default-mode'
        }`}
      >
        <MainPanel />
        <main className={isCollapsed ? 'closed' : ' '}>
          <Routes>
            <Route path="/" element={<NotificationsPage />} />
            <Route path="homeworks" element={<HomeworksPage />} />
            <Route path="homeworks/drafts" element={<DraftHomeworksPage />} />
            <Route path="homeworks/:id" element={<HomeworkPage />} />
            <Route path="homeworks/:id/new" element={<HomeworkPage />} />
            <Route path="homeworks/:id/edit" element={<HomeworkEditPage />} />
            <Route path="lessons" element={<LessonsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="/change-password" element={<SettingsPassword />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="edit-courses" element={<EditCoursesPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegistrationPage />} />
            <Route path="new-homework" element={<NewHomework />} />
            <Route path="new-homework/edit-homework/:id" element={<EditHomeworkPage />} />
            <Route path="new-homework/edit-task/:id" element={<EditTaskPage />} />
            <Route path="new-group" element={<NewGroupPage />} />
            <Route path="groups/:id" element={<NewGroupPage />} />
            <Route path="homework-review" element={<HomeworkReviewPage />} />
            <Route path="groups" element={<GroupsListPage />} />
            <Route path="payment-table" element={<PaymentsPage />} />
            <Route path="students-list" element={<StudentsListPage />} />
          </Routes>
          <NotificationsContainer />
        </main>
      </div>
      {isModalOpen && <ModalWindow />}
    </>
  );
}

export default App;
