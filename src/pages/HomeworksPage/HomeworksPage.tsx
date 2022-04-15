import { HomeworkCard } from './components/HomeworkCard';

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
  },
];

export const HomeworksPage = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: AppState) => state.loginPageState);
  let groups = currentUser?.groups;
  // const revertedArray = groups.slice().reverse();

  useEffect(()=>{
    baseWretch()
   .url(`api/Homeworks/by-group/${currentUser?.groups[0].id}`)
   .get()
   .json((data)=>dispatch(loadHWCards(data as HomeworkCardResponse[])));
  });
//  const { homeworkCards } = useSelector((state:AppState) => state.homeworksPageState)
  return (
    <div className='margin-common-content'>
     <TabContainer tabContainerData={ [
        {id:1, icon: Icon.Cookie, text: 'Базовый курс'},
        {id: 2, icon: Icon.Calendar, text: 'Специализация Backend'}
        ]} selectedTab={0}></TabContainer>
        {}
      {
        // revertedArray.map(item =>
        //   <HomeworkCard data={{
        //     id: 0,
        //     taskNumber: 0,
        //     title: "",
        //     dateBeginning: "",
        //     dateEnd: "",
        //     status: 0,
        //     elseData: ""
        //   }} />
        // )
      }
    </div>
  );
};

