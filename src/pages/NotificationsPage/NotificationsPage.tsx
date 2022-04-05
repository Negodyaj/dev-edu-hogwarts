import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, loadTabs, selectTab } from "../../actions/notifications.actions";
import { TabContainer } from "../../components/TabContainer/TabContainer";
import { UserResponse } from "../../models/responses/UserResponse";
import { baseWretch } from "../../services/base-wretch.service";
import { AppState } from "../../store/store";

export const NotificationsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTabs());
  }, []);

  useEffect(() => {
    baseWretch()
      .url('api/Users/2604')
      .get()
      .json(data => dispatch(setCurrentUser(data as UserResponse)));
  }, []);

  const { tabs, selectedTab, currentUser } = useSelector((state: AppState) => state.notificationsPageState );
  return (
    <>
      <div>Уведомления</div>
      {currentUser?.email}
      <button onClick={() => {dispatch(selectTab(selectedTab - 1))}}>Left</button>
      <button onClick={() => {dispatch(selectTab(selectedTab + 1))}}>Right</button>
      <TabContainer tabContainerData={tabs} selectedTab={selectedTab}/>
    </>
  )
}
