import { TabItem, TabData } from "./TabItem/TabItem" 
import './TabContainer.scss' 
import { useState } from "react";

export type TabContainerProps = {
  tabContainerData: TabData[]
}

export const TabContainer = (props: TabContainerProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  function onTabClick(id: number) {
    setActiveTab(id);
  } 

  return (
    <>
      <div className="tab-container">
        {
          props.tabContainerData.map((item) => (<TabItem data={item} key={item.id} activeTab={activeTab} onClick={onTabClick}/>))
        }
      </div>
    </>
  );
}


