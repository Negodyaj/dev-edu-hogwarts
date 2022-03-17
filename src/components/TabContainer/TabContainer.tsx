import { TabItem, TabData } from "./components/TabItem" 
import { Icon } from "../../shared/enums/Icon";
import './TabContainer.scss' 
import { useState } from "react";

export const TabContainer = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  
  const tabData: TabData[] = [ 
  {
    icon: Icon.Barrel,
    text: 'Специализация Backend',
    id: 2,
  },
  {
    icon: Icon.Computer,
    text: 'Базовый курс',
    id: 3,
  },
  {
    icon: Icon.Cake,
    text: 'Базовый курс',
    id: 4,
  },
  {
    icon: Icon.Calendar,
    text: 'Базовый курс',
    id: 5,
  },
  {
    icon: Icon.Chevron,
    text: 'Базовый курс',
    id: 6,
  },
  {
    icon: Icon.Cookie,
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


