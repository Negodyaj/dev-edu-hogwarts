import { Dispatch } from 'react';
import { TopicFormData } from '../pages/CoursesPage/EditCoursesPage';
import { baseWretch } from '../services/base-wretch.service';
import { postTopic, updateCourseProgram } from '../shared/consts';
import { addTopic, EditCoursesPageActions, updateCourseTopicsSuccess } from './editCourses.actions';

export const onCourseTopicsUpdate = (data: TopicFormData) => {
  return async (dispatch: Dispatch<EditCoursesPageActions>) => {
    baseWretch()
      .url(postTopic(1371))
      .post({
        name: data.topicName,
        duration: data.hoursCount,
        position: data.position,
      })
      .res((res) => (res.ok ? dispatch(addTopic(data)) : console.log('error'))); //add notif
  };
};

export const onCourseTopicsUpdateAll = (data: TopicFormData[]) => {
  return async (dispatch: Dispatch<EditCoursesPageActions>) => {
    baseWretch()
      .url(updateCourseProgram(1371))
      .put(
        data.map((topic) => {
          return {
            position: topic.position,
            topicId: topic.id,
          };
        })
      )
      .res((res) => (res.ok ? dispatch(updateCourseTopicsSuccess(data)) : console.log('error'))); //add notif
  };
};
