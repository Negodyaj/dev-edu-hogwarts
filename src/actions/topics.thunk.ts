import { Dispatch } from 'react';
import { CourseTopicsResponse } from '../models/responses/CourseTopicsResponse';
import { TopicFormData } from '../pages/CoursesPage/EditCoursesPage';
import { baseWretch } from '../services/base-wretch.service';
import { getTopicsByCourseId } from '../shared/consts';
import {
  loadTopicsSuccess,
  loadTopicsFailed,
  loadTopicsStarted,
  CoursesPageActions,
} from './topics.actions';

export const onTopicsLoad = () => {
  return (dispatch: Dispatch<CoursesPageActions>) => {
    dispatch(loadTopicsStarted());
    baseWretch()
      .url(getTopicsByCourseId(1371))
      .get()
      .json((data) => {
        const topics: TopicFormData[] = data.map((item: CourseTopicsResponse) => {
          const topic: TopicFormData = {
            id: item.id,
            position: item.position,
            topicName: item.topic.name,
            hoursCount: item.topic.duration,
          };
          return topic;
        });
        console.log(topics);
        dispatch(loadTopicsSuccess(topics));
        return topics;
      })
      .catch((error) => dispatch(loadTopicsFailed(error.message)));
  };
};
