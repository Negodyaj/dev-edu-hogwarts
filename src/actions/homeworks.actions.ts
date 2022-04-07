import {Homework} from "../models/responses/HomeworksResponse";
import {baseWretch} from "../services/base-wretch.service";
import {Dispatch} from "react";
import {TabData} from "../models/TabData";
import {Icon} from "../shared/enums/Icon";

export const LOAD_HOMEWORKS = 'homeworks/LOAD_HOMEWORKS' as const;
export const RECEIVE_HOMEWORKS = 'homeworks/RECEIVE_HOMEWORKS' as const;

export const LOAD_TABS = 'homeworks/LOAD_TABS' as const;
export const SELECT_GROUP_TAB = 'homeworks/SELECT_GROUP_TAB' as const;

export interface HomeworkAction {
  type: string,
  payload?: any
}

export const loadHomeworks = () : HomeworkAction => ({
  type: LOAD_HOMEWORKS,
});

export const receiveHomeworks = (homeworks: Homework[]) : HomeworkAction => ({
  type: RECEIVE_HOMEWORKS,
  payload: homeworks,
});

export const wretchHomeworks = (id: number) => {
  return async (dispatch: Dispatch<HomeworkAction>) => {
    dispatch(loadHomeworks())

    const homeworksRes = await baseWretch().url(`api/Homeworks/by-group/${id}`).get().json()
    dispatch(receiveHomeworks(homeworksRes as Homework[]))
  }
}

export const wretchTabs = () => {
  return async (dispatch: Dispatch<HomeworkAction>) => {
    const tab1Res = await baseWretch()
      .url(`api/groups/510`)
      .get().json();
    const tab2Res= await baseWretch()
      .url(`api/groups/2`)
      .get().json();
    // const homeworksRes = await baseWretch().url(`api/Homeworks/by-group/${tab1Res.id}`).get().json()
    // dispatch(receiveHomeworks(homeworksRes as Homework[]))

    let tab1 : TabData = {icon: Icon.Computer, id: tab1Res?.id, text: tab1Res?.name};
    let tab2 : TabData = {icon: Icon.Cookie, id: tab2Res?.id, text: tab2Res?.name};

    dispatch(loadTabs([tab1, tab2]))
  }
}

export const loadTabs = (tabs: TabData[]) : HomeworkAction => ({
  type: LOAD_TABS,
  payload: tabs,
});

export const selectGroupTab = (id: number) : HomeworkAction => ({
  type: SELECT_GROUP_TAB,
  payload: id,
});

export type HomeworksPageAction =
  ReturnType<typeof receiveHomeworks>
  | ReturnType<typeof loadTabs>
  | ReturnType<typeof selectGroupTab>
  | ReturnType<typeof loadHomeworks>
  ;