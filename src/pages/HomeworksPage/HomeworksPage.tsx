import { error } from "console";
import { url } from "inspector";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadHomeworks } from "../../actions/homeworks.actions";
import { FilterList } from "../../components/FilterList/FilterList";
import { TabContainer } from "../../components/TabContainer/TabContainer";
import { HomeworkCardResponse } from "../../models/responses/HomeworkCardResponse";
// import { HomeworkCardResponse } from "../../models/responses/HomeworkCardResponse";
import { baseWretch } from "../../services/base-wretch.service";
import { Icon } from "../../shared/enums/Icon";
import { AppState } from "../../store/store";
import { HomeworkCard, HomeworkData } from "./components/HomeworkCard";

const tasks = [
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
    title:
      'Покрыть тестами первые три домашки Покрыть тестами первые три домашки Покрыть тестами первые три домашки',
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
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: AppState) => state.loginPageState);
  let groups = currentUser?.groups;
   useEffect(() => {
     baseWretch()
       .url(`api/Homeworks/by-group/${currentUser?.groups[0].id}`)
       .get()
       .json((data) => dispatch(loadHomeworks(data as HomeworkCardResponse[])));
   },[]);


  const { homeworks } = useSelector((state: AppState) => state.homeworksPageState);
  const newHomeworks = homeworks?.map((item,index) => {
    let newLessons: HomeworkData = {
      id: item.id,
      taskNumber: index+1,
      title: item.task.name,
      dateBeginning: item.startDate,
      dateEnd: item.endDate,
      status: 1,
      elseData: "wertyu"
    }
    return newLessons
  })

  return (
    <>
    {currentUser?.groups!= undefined ?
    <div className='margin-common-content'>
      <TabContainer tabContainerData={[
        { id: 1, icon: Icon.Cookie, text: 'Базовый курс' },
        { id: 2, icon: Icon.Calendar, text: 'Специализация Backend' }
      ]} selectedTab={0}></TabContainer>
      {
        newHomeworks?.map(hw => <HomeworkCard data={hw} />)
      }
    </div>
    :
    <div>Домашек нема </div>}
    </>
  )
}

