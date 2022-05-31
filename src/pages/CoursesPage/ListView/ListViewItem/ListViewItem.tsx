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
  const [topicName, setTopicName] = useState(props.lesson.topicName);
  const [position, setPosition] = useState(props.lesson.position);

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
          position
        ) : (
          <input
            className="list-view-input"
            type="text"
            value={position}
            onChange={(e) => setPosition(e.currentTarget.value)}
          />
        )}
      </span>
      <span className={`${props.head ? 'lesson-name-head' : 'lesson-name'} ${headItemStyleName}`}>
        {props.head || !props.dragSettings?.isDragDisabled ? (
          topicName
        ) : (
          <input
            className="list-view-input"
            type="text"
            value={topicName}
            onChange={(e) => setTopicName(e.currentTarget.value)}
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
