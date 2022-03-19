import {ListViewLessons} from "../ListView";
import {
  DraggableProvided,
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps
} from "react-beautiful-dnd";

export type ListViewItemProps = {
  lesson: ListViewLessons
  index: number
  head: boolean
  innerRef: DraggableProvided['innerRef'] | null
  prop1: DraggableProvidedDraggableProps | null
  prop2?: DraggableProvidedDragHandleProps | undefined | null
}

export const ListViewItem = (props: ListViewItemProps) => {
  return (
    <div
      className={`grid-table-container ${props.head ? 't-head' : ''}`}
      ref={props.innerRef}
      {...props.prop1}
      {...props.prop2}
    >
            <span className={`${!props.head ? 'nums flex-container' : ''}`}>
              {
                !props.head &&
                <div className='draggable-pointer'>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              }
              {props.lesson.lessonNumber}</span>
      <span className={`${!props.head ? 'lesson-name' : ''}`}>{props.lesson.lessonName}</span>
      <span className={`${!props.head ? 'nums' : ''}`}>{props.lesson.hoursCount}</span>
    </div>
  )
}