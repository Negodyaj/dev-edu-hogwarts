import {LinkWithUnderline} from "../../../components/LinkWithUnderline/LinkWithUnderline";
import './ListView.scss'

export type ListViewProps = {
  data: Array<ListViewLessons>
}

export type ListViewLessons = {
  id: number
  lessonNumber: number
  lessonName: string
  hoursCount: number
}

export const ListView = (props: ListViewProps) => {
  return (
    <div className='content-container flex-content-container'>
      <LinkWithUnderline text='Редактировать' path='/edit'/>
        <div className='grid-table-container t-head'>
          <span>Тема</span>
          <span>Название</span>
          <span>Часы</span>
        </div>

      {
        props.data.map(item =>
          <div key={item.id} className='grid-table-container'>
            <span className='nums'>{item.lessonNumber}</span>
            <span className='lesson-name'>{item.lessonName}</span>
            <span className='nums'>{item.hoursCount}</span>
          </div>
        )
      }

    </div>
  )
}