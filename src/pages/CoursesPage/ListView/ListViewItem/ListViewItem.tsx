import { ListViewLessons } from '../ListView';
import {
  DraggableProvided,
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { baseWretch } from '../../../../services/base-wretch.service';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../store/store';

export type ListViewItemProps = {
  lesson: ListViewLessons;
  index?: number;
  head?: boolean;
  dragSettings?: {
    innerRef: DraggableProvided['innerRef'] | null;
    prop1: DraggableProvidedDraggableProps | null;
    prop2: DraggableProvidedDragHandleProps | undefined | null;
    snapshot: boolean;
    isDragDisabled: boolean;
  } | null;
};
export type TopicFormData = {
  id: number;
  name: string;
  position: number;
  duration: number;
};
export const ListViewItem = (props: ListViewItemProps) => {
  const headItemStyleName = props.head ? 'title-head__item' : '';
  const [hoursCount] = useState(props.lesson.hoursCount);
  const [lessonName] = useState(props.lesson.lessonName);
  const [lessonNumber, setLessonNumber] = useState(props.lesson.lessonNumber);
  const { currentCourse } = useSelector((state: AppState) => state.coursesPageState);
  const methods = useForm<TopicFormData>({
    mode: 'onChange',
  });
  const onSubmit = () => {
    debugger;
    baseWretch()
      .url('api/Courses/' + currentCourse?.id + '/program')
      .put({
        name: lessonName,
        position: lessonNumber,
        duration: hoursCount,
      });
  };
  return (
    <form>
      <div
        className={`grid-table-container ${props.head ? 'title-head' : ''} ${
          props.dragSettings?.snapshot ? 'dragging' : ''
        }`}
        ref={props.dragSettings?.innerRef}
        {...props.dragSettings?.prop1}
      >
        <span className={`${!props.head ? 'nums flex-container' : ''} ${headItemStyleName}`}>
          {props.dragSettings?.isDragDisabled && !props.head && (
            <div className="draggable-pointer" {...props.dragSettings?.prop2}>
              <span />
              <span />
              <span />
            </div>
          )}
          {props.head || !props.dragSettings?.isDragDisabled ? (
            lessonNumber
          ) : (
            <input
              {...methods.register('position')}
              className="list-view-input"
              type="text"
              value={lessonNumber}
              onChange={(e) => setLessonNumber(e.currentTarget.value)}
            />
          )}
        </span>
        <span className={`${props.head ? 'lesson-name-head' : 'lesson-name'} ${headItemStyleName}`}>
          {props.head || !props.dragSettings?.isDragDisabled ? (
            lessonName
          ) : (
            <input
              {...methods.register('name')}
              className="list-view-input"
              type="text"
              value={lessonName}
              // onChange={(e) => setLessonName(e.currentTarget.value)}
              onChange={methods.handleSubmit(onSubmit)}
            />
          )}
        </span>
        <span className={`${!props.head ? 'nums' : ''} ${headItemStyleName}`}>
          {props.head || !props.dragSettings?.isDragDisabled ? (
            hoursCount
          ) : (
            <input
              {...methods.register('duration')}
              className="list-view-input"
              type="text"
              value={hoursCount}
              onChange={methods.handleSubmit(onSubmit)}
              // onChange={(e) => setHoursCount(e.currentTarget.value)}
            />
          )}
        </span>
      </div>
    </form>
  );
};
