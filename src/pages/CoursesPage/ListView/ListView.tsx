import {LinkWithUnderline} from "../../../components/LinkWithUnderline/LinkWithUnderline";
import './ListView.scss'
import {ListViewItem} from "./ListViewItem/ListViewItem";
import {Draggable, DraggableProvided, Droppable, DroppableProvided} from "react-beautiful-dnd";

export type ListViewProps = {
  data: Array<ListViewLessons>
  groupId: number
}

export type ListViewLessons = {
  id: number
  lessonNumber: number | string
  lessonName: string
  hoursCount: number | string
}

export const ListView = (props: ListViewProps) => {
  return (
    <div className='content-container flex-content-container'>
      <LinkWithUnderline text='Редактировать' path='/edit'/>
      <ListViewItem
        head={true}
        index={NaN}
        lesson={{
          id: 0,
          lessonName: 'Название',
          lessonNumber: 'Тема',
          hoursCount: 'Часы',
        }}
        innerRef={null}
        prop1={null}
        prop2={null}
      />


      <Droppable droppableId={`drop-${props.groupId}`}>
        {
          (provided: DroppableProvided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {
                props.data.map((item, index) =>

                  <Draggable draggableId={item.lessonName}
                             index={index}
                             key={item.id}>
                    {
                      (provided1: DraggableProvided) => (
                        <ListViewItem
                          head={false}
                          index={index}
                          lesson={item}
                          innerRef={provided1.innerRef}
                          prop1={{...provided1.draggableProps}}
                          prop2={provided1.dragHandleProps}
                        />
                      )
                    }
                  </Draggable>

                )
              }
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
    </div>
  )
}