import { Reducer } from 'react';
import { ADD_TOPIC, EditCoursesPageActions } from '../../actions/editCourses.actions';
import { TopicFormData } from '../../pages/CoursesPage/EditCoursesPage';

export interface EditCoursesPageState {
  data?: TopicFormData;
}

export const initialState: EditCoursesPageState = {
  data: undefined,
};

export const editCoursesPageReducer: Reducer<
  EditCoursesPageState | undefined,
  EditCoursesPageActions
> = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOPIC:
      return {
        ...state,
      };

    default:
      return state;
  }
};
