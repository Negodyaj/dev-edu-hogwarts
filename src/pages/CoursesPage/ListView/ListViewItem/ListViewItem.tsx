import { ListViewLessons } from '../ListView';
import {
  DraggableProvided,
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { useState } from 'react';

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

export const ListViewItem = (props: ListViewItemProps) => {
  const headItemStyleName = props.head ? 'title-head__item' : '';
  const [hoursCount, setHoursCount] = useState(props.lesson.hoursCount);
  const [lessonName, setLessonName] = useState(props.lesson.lessonName);
  const [lessonNumber, setLessonNumber] = useState(props.lesson.lessonNumber);

  return (
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
            className="list-view-input"
            type="text"
            value={lessonName}
            onChange={(e) => setLessonName(e.currentTarget.value)}
          />
        )}
      </span>
      <span className={`${!props.head ? 'nums' : ''} ${headItemStyleName}`}>
        {props.head || !props.dragSettings?.isDragDisabled ? (
          hoursCount
        ) : (
          <input
            className="list-view-input"
            type="text"
            value={hoursCount}
            onChange={(e) => setHoursCount(e.currentTarget.value)}
          />
        )}
      </span>
    </div>
  );
};
