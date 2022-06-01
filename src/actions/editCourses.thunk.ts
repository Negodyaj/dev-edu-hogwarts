import { Dispatch } from 'react';
import { TopicFormData } from '../pages/CoursesPage/EditCoursesPage';
import { baseWretch } from '../services/base-wretch.service';
import { postTopic } from '../shared/consts';
import { addTopic, EditCoursesPageActions } from './editCourses.actions';

//TODO
//следить за стейтом массива топиков на странице (useSelect)
//как-то изменять на странице позишны всех топиков при перетаскивании одного на новое место
//put всего этого по нужному CourseID ну или на ид 1371 пока что

export const onCourseTopicsUpdate = (data: TopicFormData) => {
  return async (dispatch: Dispatch<EditCoursesPageActions>) => {
    baseWretch()
      .url(postTopic)
      .post({
        name: data.topicName,
        duration: data.hoursCount,
      })
      .res((res) => (res.ok ? dispatch(addTopic(data)) : console.log('error')));
  };
};
