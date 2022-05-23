import { useDispatch, useSelector } from 'react-redux';
import { LoginPageState } from '../../../store/reducers/login.reducer';
import { AppState } from '../../../store/store';
import { Align, FilterItem, FilterList } from '../../FilterList/FilterList';
import { UserRole } from '../../../shared/enums/UserRole';
import { setCurrentUserRole } from '../../../actions/login.actions';
import { getUserRoleLocalName } from '../../../shared/helpers/translations';

export const CurrentUserRoles = () => {
  const dispatch = useDispatch();
  const { currentUser, currentRole } = useSelector(
    (state: AppState) => state.loginPageState as LoginPageState
  );
  const rolesInFilter = currentUser!.roles.map((role) => ({
    id: role,
    name: getUserRoleLocalName(role),
  }));

  const setUserRole = (item: FilterItem) => {
    dispatch(setCurrentUserRole(item.id as UserRole));
  };

  return (
    <FilterList
      data={rolesInFilter}
      selected={rolesInFilter.find((role) => currentRole === role.id)}
      callback={setUserRole}
      cssAlign={Align.Left}
    />
  );
};
