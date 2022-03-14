import { TabItem, TabData } from "./components/TabItem"
import { Icons } from './components/enumIcons';
import './TabContainer.scss'

export const TabContainer = () => {
  const tabData: TabData[] = [ 
  {
    icon: Icons.Barrel,
    text: 'Специализация Backend',
    id: 2
  },
  {
    icon: Icons.Computer,
    text: 'Базовый курс',
    id: 1
  },
  {
    icon: Icons.Cake,
    text: 'Базовый курс',
    id: 1
  },
  {
    icon: Icons.Calendar,
    text: 'Базовый курс',
    id: 1
  },
  {
    icon: Icons.Chevron,
    text: 'Базовый курс',
    id: 1
  },
  {
    icon: Icons.Cookie,
    text: 'Базовый курс',
    id: 1
  },
]

  return (
    <>
      <div className="tab-container">
        {
          tabData.map(item => (<TabItem data={item} key={item.id}/>))
        }
      </div>    
    </>
  );
}


