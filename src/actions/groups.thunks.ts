import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { GroupResponseById } from '../models/responses/GroupResponseById';
import { GroupResponse } from '../models/responses/GroupResponse';
import { baseWretch } from '../services/base-wretch.service';
import { getGroupById, groupUrl } from '../shared/consts';
import { getGroups, selectGroup } from './groups.actions';

export const LoadGroups = (dispatch: Dispatch<any>) => {
  baseWretch()
  .url(groupUrl)
  .get()
  .json((data) => {
    const groupsList = data as GroupResponse[];
    baseWretch()
    .url(getGroupById(groupsList[0].id))
    .get()
    .json((groupData)=> {
      const dataGroup =groupData as GroupResponseById;
      dispatch(getGroups([groupsList, dataGroup]));
    })   
    });
};

export const LoadGroupById = (id:number) => {
  const dispatch=useDispatch();
  baseWretch()
    .url(getGroupById(id))
    .get()
    .json((data)=>{
      const dataGroup =data as GroupResponseById;
      dispatch(selectGroup(dataGroup));
    });   
};