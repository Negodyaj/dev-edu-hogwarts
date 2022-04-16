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
import { loginPageReducer, LoginPageState } from './reducers/login.reducer';
// Import reducers and state type
import {
  homeworkPageReducer,
  HomeworkPageState,
} from './reducers/homework.reducer';
import {
  NotificationsPageState,
  notificationsPageReducer,
} from './reducers/notifications.reducer';

// Create an interface for the application state
export interface AppState {
  notificationsPageState: NotificationsPageState;
  loginPageState: LoginPageState;
  homeworkPageState: HomeworkPageState;
}

// Create the root reducer
const rootReducer = combineReducers<AppState>({
  notificationsPageState: notificationsPageReducer,
  loginPageState: loginPageReducer,
  homeworkPageState: homeworkPageReducer,
});

// Create a configure store function of type `AppState`
export default function configureStore(): Store<AppState, any> {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
}
