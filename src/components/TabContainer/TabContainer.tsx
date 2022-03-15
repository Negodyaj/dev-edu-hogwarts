import { TabItem, TabData } from "./components/TabItem" 
import { Icons} from "../SvgIcon/enumIcons";
import './TabContainer.scss' 
import { useState } from "react";

export const TabContainer = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  
  const tabData: TabData[] = [ 
  {
    icon: Icons.Barrel,
    text: 'Специализация Backend',
    id: 2,
  },
  {
    icon: Icons.Computer,
    text: 'Базовый курс',
    id: 3,
  },
  {
    icon: Icons.Cake,
    text: 'Базовый курс',
    id: 4,
  },
  {
    icon: Icons.Calendar,
    text: 'Базовый курс',
    id: 5,
  },
  {
    icon: Icons.Chevron,
    text: 'Базовый курс',
    id: 6,
  },
  {
    icon: Icons.Cookie,
    text: 'Базовый курс',
    id: 1,
  },
]

function onTabClick(id: number) {
  setActiveTab(id);
} 

  return (
    <>
      <div className="tab-container">
        {
          tabData.map((item) => (<TabItem data={item} key={item.id} activeTab={activeTab} onClick={onTabClick}/>))
        }
      </div>    
    </>
  );
}


