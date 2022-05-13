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
import { Button, ButtonModel, ButtonType } from '../../../components/Button/Button';
// import { baseWretch } from '../../../services/base-wretch.service';
import { useForm } from 'react-hook-form';

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

export type TopicFormData = {
  id: number;
  name: string;
  duration: number;
};

export const ListView = (props: ListViewProps) => {
  const linkType = () => {
    if (props.edit) {
      return <BackButton />;
    } else {
      return <LinkWithUnderline text="Редактировать" path="edit-courses" />;
    }
  };

  const methods = useForm<TopicFormData>({
    mode: 'onChange',
  });
  // const onSubmit = (data: TopicFormData) =>
  // baseWretch()
  //   .url(`api/Courses/${currentCourse?.id}/topic/${}`)
  //   .put({
  //     id: data.id,
  //     name: data.name

  //   });
  return (
    <>
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
                  draggableId={item.id.toString()}
                  index={index}
                  key={item.id}
                  isDragDisabled={!props.edit}
                >
                  {(draggableProvided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
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
      <div className="new-topic-form">
        <h2>Новая тема</h2>
        {/* <form onSubmit={methods.handleSubmit(onSubmit)}> */}
        <div className="flex-container">
          <div>
            <h3>Тема</h3>
            <input></input>
          </div>
          <div>
            <h3>Название</h3>
            <input {...methods.register('name')}></input>
          </div>
          <div>
            <h3>Часы</h3>
            <input {...methods.register('duration')}></input>
          </div>
        </div>
        <Button
          text={'Сохранить'}
          type={ButtonType.submit}
          model={ButtonModel.Colored}
          width="190"
        />
        <Button text={'Отмена'} type={ButtonType.reset} model={ButtonModel.Text} />
        {/* </form> */}
      </div>
    </>
  );
};
