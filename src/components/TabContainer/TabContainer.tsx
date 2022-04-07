import { TabItem } from "./TabItem/TabItem";
import './TabContainer.scss';
import { TabData } from "../../models/TabData";
import { useDispatch } from "react-redux";

export type TabContainerProps = {
  tabContainerData: TabData[]
  selectedTab: number
  onClick?: (id: number) => void
}

export const TabContainer = (props: TabContainerProps) => {
  const dispatch = useDispatch();
  
  function onTabClick(id: number) {
    dispatch(props.onClick?.(id));
  } 

  return (
    <>
      <div className="tab-container">
        {
          props.tabContainerData.map((item) => (<TabItem data={item} key={item.id} activeTab={props.selectedTab} onClick={onTabClick}/>))
        }
      </div>
    </>
  );
}


