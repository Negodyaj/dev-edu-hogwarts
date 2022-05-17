import { ListViewLessons } from '../ListView';
import {
  DraggableProvided,
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { baseWretch } from '../../../../services/base-wretch.service';

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
  const [hoursCount, setHoursCount] = useState(props.lesson.hoursCount);
  const [lessonName, setLessonName] = useState(props.lesson.lessonName);
  const methods = useForm<TopicFormData>({
    mode: 'onBlur',
  });
  // const onSubmit = (data: TopicFormData) =>
  //   baseWretch()
  //     .url('api/Topics/' + props.lesson.id)
  //     .put({
  //       id: data.id,
  //       name: lessonName,
  //       duration: hoursCount,
  //     });
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
            props.lesson.lessonNumber
          ) : (
            <input
              {...methods.register('position')}
              className="list-view-input"
              type="text"
              value={props.lesson.lessonNumber}
              // onChange={(e) => setLessonNumber(e.currentTarget.value)}
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
              // onBlur={methods.handleSubmit(onSubmit)}
              onChange={(e) => setLessonName(e.currentTarget.value)}
              // onChange={methods.handleSubmit(onSubmit)}
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
              // onBlur={methods.handleSubmit(onSubmit)}
              // onChange={methods.handleSubmit(onSubmit)}
              onChange={(e) => setHoursCount(e.currentTarget.value)}
            />
          )}
        </span>
      </div>
    </form>
  );
};
