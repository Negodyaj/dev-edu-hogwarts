import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTabs, selectTab } from "../../actions/notifications.actions";
import { TabContainer } from "../../components/TabContainer/TabContainer";
import { AppState } from "../../store/store";

export const NotificationsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTabs());
  }, []);

  const { tabs, selectedTab } = useSelector((state: AppState) => state.notificationsPageState );
  return (
    <>
      <div>Уведомления</div>
      <button onClick={() => {dispatch(selectTab(selectedTab - 1))}}>Left</button>
      <button onClick={() => {dispatch(selectTab(selectedTab + 1))}}>Right</button>
      <TabContainer tabContainerData={tabs} selectedTab={selectedTab}/>
    </>
  )
}
