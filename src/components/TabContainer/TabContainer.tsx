import { TabItem, TabData } from "./components/TabItem" 
import { Icon } from "../../shared/enums/Icon";
import './TabContainer.scss' 
import { useState } from "react";

export type TabContainerProps = {
  tabContainerData: Array<TabData>;
}

export const TabContainer = (propsArr: TabContainerProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  function onTabClick(id: number) {
    setActiveTab(id);
  } 

  return (
    <>
      <div className="tab-container">
        {
          propsArr.tabContainerData.map((item) => (<TabItem data={item} key={item.id} activeTab={activeTab} onClick={onTabClick}/>))
        }
      </div>
    </>
  );
}


