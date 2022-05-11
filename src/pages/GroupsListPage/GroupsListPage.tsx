import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { baseWretch } from '../../services/base-wretch.service';
import { groupUrl } from '../../shared/consts';
import { GroupsPageState } from '../../store/reducers/groups.reducer';
import { AppState } from '../../store/store';


export const GroupsListPage = () => {
  const {groups, selectedGroup} = useSelector((state:AppState)=> state.groupsPageState as GroupsPageState);
  

};