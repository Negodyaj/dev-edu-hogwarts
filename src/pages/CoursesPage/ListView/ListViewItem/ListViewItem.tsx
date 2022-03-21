import {ListViewLessons} from "../ListView";
import {
  DraggableProvided,
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps
} from "react-beautiful-dnd";

export type ListViewItemProps = {
  lesson: ListViewLessons
  index?: number
  head?: boolean
  dragSettings?: {
    innerRef: DraggableProvided['innerRef'] | null
    prop1: DraggableProvidedDraggableProps | null
    prop2: DraggableProvidedDragHandleProps | undefined | null
    snapshot: boolean
    isDragDisabled: boolean
  } | null
};

export const ListViewItem = (props: ListViewItemProps) => {
  const headItemStyleName = props.head ? 'title-head__item' : '';

  return (
    <div
      className={`grid-table-container ${props.head ? 'title-head' : ''} ${props.dragSettings?.snapshot ? 'dragging' : ''}`}
      ref={props.dragSettings?.innerRef}
      {...props.dragSettings?.prop1}
    >
      <span></span>
            <span className={`${!props.head ? 'nums flex-container' : ''} ${headItemStyleName}`}>
              {
                props.dragSettings?.isDragDisabled &&
                !props.head &&
                <div className='draggable-pointer'
                     {...props.dragSettings?.prop2}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              }
              {props.lesson.lessonNumber}</span>
      <span className={`${!props.head ? 'lesson-name' : ''} ${headItemStyleName}`}>{props.lesson.lessonName}</span>
      <span className={`${!props.head ? 'nums' : ''} ${headItemStyleName}`}>{props.lesson.hoursCount}</span>
    </div>
  );
}