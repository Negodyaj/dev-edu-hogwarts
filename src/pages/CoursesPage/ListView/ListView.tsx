import { LinkWithUnderline } from '../../../components/LinkWithUnderline/LinkWithUnderline';
import './ListView.scss';
import { ListViewItem } from './ListViewItem/ListViewItem';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { BackButton } from '../../../components/LinkArrow/BackButton';

export type ListViewProps = {
  data: Array<ListViewLessons>;
  groupId: number;
  edit: boolean;
};

export type ListViewLessons = {
  id: number;
  lessonNumber: number | string;
  lessonName: string;
  hoursCount: number | string;
};

export const ListView = (props: ListViewProps) => {
  const linkType = () => {
    if (props.edit) {
      return <BackButton />;
    } else {
      return <LinkWithUnderline text="Редактировать" path="edit-courses" />;
    }
  };

  return (
    <div className="content-container flex-column">
      {linkType()}
      <ListViewItem
        head={true}
        lesson={{
          id: 0,
          lessonName: 'Название',
          lessonNumber: 'Тема',
          hoursCount: 'Часы',
        }}
      />

      <Droppable droppableId={`drop-${props.groupId}`}>
        {(provided: DroppableProvided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {props.data.map((item, index) => (
              <Draggable
                draggableId={item.lessonName}
                index={index}
                key={item.id}
                isDragDisabled={!props.edit}
              >
                {(
                  draggableProvided: DraggableProvided,
                  snapshot: DraggableStateSnapshot
                ) => (
                  <ListViewItem
                    index={index}
                    lesson={item}
                    dragSettings={{
                      innerRef: draggableProvided.innerRef,
                      prop1: { ...draggableProvided.draggableProps },
                      prop2: draggableProvided.dragHandleProps,
                      snapshot: snapshot.isDragging,
                      isDragDisabled: props.edit,
                    }}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
