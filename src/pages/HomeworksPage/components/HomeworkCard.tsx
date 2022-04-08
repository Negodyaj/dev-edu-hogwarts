import './HomeworkCard.scss'
import {LinkArrow} from "../../../components/LinkArrow/LinkArrow";
import {Homework} from "../../../models/responses/HomeworksResponse";
import {InputLink} from '../../../components/InputLink/InputLink';

export type HomeworkProps = {
  data?: Homework
  taskNumber?: number
  oneCard?: boolean
}

// Не знала лучше enum или array,
// или вообще по-другому

enum HomeworkStatus {
  Unchecked = "Не сделано",
  // "Не сделано",
  // "В проверке",
  // "Исправить",
  // "Сдано с опозданием"
}

export const HomeworkCard = (props: HomeworkProps) => {
  const homework = props.data;

  return (
    <div className={`homework-card-content content-container ${props.oneCard ? 'one-card-content' : ''}`}>
      <span className='task-number'>Задание {props.taskNumber}</span>
      <div className='homework-card-description'>
        <div className='homework-dates'>
                    <span>
                        Дата выдачи
                     </span>
          <span>
                        {homework?.startDate}
                    </span>
        </div>
        <div className='homework-dates'>
                    <span>
                        Срок сдачи
                    </span>
          <span>
                        {homework?.endDate}
                    </span>
        </div>
        <span className='homework-title'>
                    {homework?.task.name}
                </span>
        {
          props.oneCard &&
          <>
            <span className='homework-description-title'>Описание задания</span>
            {
              homework?.task.description.split('\n').map((par, index) =>
                <p key={index}>{par}</p>
              )
            }
            {
              homework?.task.links.split(' [link] ').map((par, index) =>
                <a href={par}
                   className='homework-useful-link'
                   target='_blank'
                   key={index}
                >
                  {par}
                </a>
              )
            }
            {/*<a href={homework?.task.links} className='homework-github-link' target='_blank'>Ссылка на GitHub</a>*/}
            <span className='homework-description-title'>Ссылка на выполненное задание:</span>
            {
              // homework?.task.links
              //   ? <a className='homework-github-link' href={homework?.task.links}>Ссылка на GitHub</a>
              //   :
              <InputLink placeholder={'Ссылка на GitHub или архив'}/>
            }
            <span className='homework-description-title'>Результат выполненного задания:</span>
          </>
        }
        {
          !props.oneCard && <LinkArrow back={false} text='к заданию' to={`homeworks/${homework?.id}`}/>
        }
      </div>
      <span className='task-status'>
                {HomeworkStatus.Unchecked}
            </span>
    </div>
  )
}