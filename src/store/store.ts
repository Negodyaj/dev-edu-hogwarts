/*  Imports from Redux:
applyMiddleware: Applies middleware to the dispatch method of the Redux store
combineReducers: Merges reducers into one
createStore: Creates a Redux store that holds the state tree
Store: The TS Type used for the store, or state tree
*/
import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
/*  Thunk
Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.
*/
import thunk from 'redux-thunk';
import { lessonsPageReducer, LessonsPageState } from './reducers/lessons.reducer';
import { loginPageReducer, LoginPageState } from './reducers/login.reducer';
import { homeworksPageReducer, HomeWorkPageState } from './reducers/homeworks.reducer';

// Import reducers and state type
import { homeworkPageReducer, HomeworkPageState } from './reducers/homework.reducer';
import { newHomeworkFormReducer, NewHomeworkFormState } from './reducers/newHomeworkForm.reducer';
import { NotificationsPageState, notificationsPageReducer } from './reducers/notifications.reducer';
import { groupsPageReducer, GroupsPageState } from './reducers/groups.reducer';
import { mainPanelReducer, MainPanelState } from './reducers/mainPanel.reducer';
import {
  attendanceJournalReducer,
  AttendanceJournalState,
} from './reducers/attendanceJournal.reducer';
import { GeneralProgressState, generalProgressReducer } from './reducers/generalProgress.reducer';
import { NewGroupFormReducer, NewGroupFormState } from './reducers/NewGroupForm.reducer';
import { settingsPageReducer, SettingsPageState } from './reducers/settings.reducer';
import { coursesPageReducer, CoursesPageState } from './reducers/courses.reducer';
import { modalWindowReducer, ModalWindowState } from './reducers/modalWindow.reducer';
import { registrationPageReducer, RegistrationPageState } from './reducers/registration.reducer';
import { editCoursesPageReducer, EditCoursesPageState } from './reducers/editCourses.reducer';
import {
  notificationsContainerReducer,
  NotificationsContainerState,
} from './reducers/notificationsContainer.reducer';

// Create an interface for the application state
export interface AppState {
  homeworksPageState: HomeWorkPageState;
  newHomeworkFormState: NewHomeworkFormState;
  notificationsPageState: NotificationsPageState | undefined;
  loginPageState: LoginPageState | undefined;
  lessonsPageState: LessonsPageState | undefined;
  coursesPageState: CoursesPageState;
  homeworkPageState: HomeworkPageState;
  mainPanelState: MainPanelState | undefined;
  attendanceJournalState: AttendanceJournalState;
  generalProgressState: GeneralProgressState;
  groupsPageState: GroupsPageState;
  newGroupFormState: NewGroupFormState;
  settingsPageState: SettingsPageState | undefined;
  modalWindowState: ModalWindowState | undefined;
  registrationPageState: RegistrationPageState | undefined;
  editCoursesPageState: EditCoursesPageState | undefined;
  notificationsContainerState: NotificationsContainerState | undefined;
}

// Create the root reducer
const rootReducer = combineReducers<AppState>({
  notificationsPageState: notificationsPageReducer,
  loginPageState: loginPageReducer,
  homeworkPageState: homeworkPageReducer,
  homeworksPageState: homeworksPageReducer,
  newHomeworkFormState: newHomeworkFormReducer,
  coursesPageState: coursesPageReducer,
  lessonsPageState: lessonsPageReducer,
  mainPanelState: mainPanelReducer,
  attendanceJournalState: attendanceJournalReducer,
  generalProgressState: generalProgressReducer,
  settingsPageState: settingsPageReducer,
  newGroupFormState: NewGroupFormReducer,
  groupsPageState: groupsPageReducer,
  modalWindowState: modalWindowReducer,
  registrationPageState: registrationPageReducer,
  editCoursesPageState: editCoursesPageReducer,
  notificationsContainerState: notificationsContainerReducer,
});

// Create a configure store function of type `AppState`
export default function configureStore(): Store<AppState, any> {
  return createStore(rootReducer, undefined, composeWithDevTools(applyMiddleware(thunk)));
}
