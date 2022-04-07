import {HomeworkCard} from "./components/HomeworkCard";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store/store";
import {selectGroupTab, wretchHomeworks, wretchTabs} from "../../actions/homeworks.actions";
import {TabContainer} from "../../components/TabContainer/TabContainer";
import {Loader} from "../HomeworkPage/Loader";

export const HomeworksPage = () => {
  const dispatch = useDispatch();
  const { homeworks, tabs, selectedTab, loading } = useSelector((state: AppState) => state.homeworksPageState);

  useEffect(() => {
    dispatch(wretchTabs())
  }, [])

  useEffect(() => {
    dispatch(wretchHomeworks(selectedTab))
  }, [selectedTab])

  return (
    <div style={{marginLeft: '20px'}}>
      {
        !tabs
          ? <span style={{fontSize: '22px', }}>Вы пока не состоите ни в одной группе :(</span>
          : <TabContainer tabContainerData={tabs} selectedTab={selectedTab} onClick={selectGroupTab}/>
      }

      {
        loading
          ? <Loader/>
          : homeworks?.length < 1
            ? <span style={{fontSize: '22px', }}>Домашних заданий пока нет</span>
            : homeworks?.map((item, index) =>
          <HomeworkCard data={item} taskNumber={index+1} key={item?.id}/>
        )
      }
    </div>
  )
}
