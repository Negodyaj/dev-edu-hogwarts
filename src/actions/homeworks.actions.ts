import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { ThunkAction } from "redux-thunk";
import { HomeworkCardData } from "../models/HomeworkCardData";

export const LOAD_HWCARDS = 'homeworks/LOAD_HWCARDS' as const;


export const loadHWCards = (hws: HomeworkCardData []) => ({
  type: LOAD_HWCARDS,
  response: hws
});

export type HomeworkPageAction = 
  ReturnType<typeof loadHWCards>;