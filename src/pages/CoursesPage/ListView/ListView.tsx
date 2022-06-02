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
import { BackButton } from '../../../components/BackButton/BackButton';

export type ListViewProps = {
  data: Array<ListViewLessons>;
  groupId: number;
  edit: boolean;
};

export type ListViewLessons = {
  id: number;
  position: number | string;
  topicName: string;
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
        topic={{
          id: 0,
          topicName: 'Название',
          position: 'Тема',
          hoursCount: 'Часы',
        }}
      />

      <Droppable droppableId={`drop-${props.groupId}`}>
        {(provided: DroppableProvided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {props.data.map((item, index) => (
              <Draggable
                draggableId={item.topicName}
                index={index}
                key={item.id}
                isDragDisabled={!props.edit}
              >
                {(draggableProvided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                  <ListViewItem
                    index={index}
                    topic={item}
                    //position={index + 1}
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
