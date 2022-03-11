import {HomeworkCard} from "./components/HomeworkCard";

let tasks = [
    {
        id: 4,
        taskNumber: 4,
        title: 'Покрыть тестами первые три домашки',
        dateBeginning: '10.10.2022',
        dateEnd: '05.11.2022',
        status: 4,
        elseData: '',
    },
    {
        id: 3,
        taskNumber: 3,
        title: 'Покрыть тестами первые три домашки Покрыть тестами первые три домашки Покрыть тестами первые три домашки',
        dateBeginning: '10.10.2022',
        dateEnd: '01.11.2022',
        status: 2,
        elseData: '',
    },
    {
        id: 2,
        taskNumber: 2,
        title: 'Покрыть тестами первые три домашки',
        dateBeginning: '28.09.2022',
        dateEnd: '14.09.2022',
        status: 1,
        elseData: '',
    },
    {
        id: 1,
        taskNumber: 1,
        title: 'Покрыть тестами первые три домашки',
        dateBeginning: '10.10.2022',
        dateEnd: '05.11.2022',
        status: 0,
        elseData: '',
    }
]

export const HomeworksPage = () => {
    const revertedArray = tasks.slice().reverse()

  return (
    <div>Домашки
        {
            revertedArray.map( item =>
                <HomeworkCard data={item} key={item.id}/>
            )
        }
    </div>
  )
}