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
import { mainPanelReducer, MainPanelState } from './reducers/mainPanel.reducer';
import {
  coursesPageReducer,
  CoursesPageState,
} from './reducers/courses.reducer';

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
});

// Create a configure store function of type `AppState`
export default function configureStore(): Store<AppState, any> {
  return createStore(rootReducer, undefined, composeWithDevTools(applyMiddleware(thunk)));
}
