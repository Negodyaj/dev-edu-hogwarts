import {FilterList} from "../../components/FilterList";

export const HomeworksPage = () => {
  return (
    <div>Домашки
        <FilterList data={[
            {
                id: 1, name: 'Все'
            },
            {
                id: 2, name: 'Эта неделя'
            },
            {
                id: 3, name: 'Этот месяц'
            }
        ]} type=''/>
        <div> </div>
        <FilterList data={[
            {
            id: 1, name: 'Все'
            },
            {
                id: 2, name: 'Эта неделя'
            },
            {
                id: 3, name: 'Этот месяц'
            },
            {
                id: 4, name: 'Этот год'
            },
            {
                id: 5, name: 'Это десятилетие'
            },
        ]} type='table'/>
    </div>
  )
}