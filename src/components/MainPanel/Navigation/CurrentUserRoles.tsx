import { useDispatch, useSelector } from 'react-redux';
import { LoginPageState } from '../../../store/reducers/login.reducer';
import { AppState } from '../../../store/store';
import { Align, FilterItem, FilterList } from '../../FilterList/FilterList';
import { UserRole } from '../../../shared/enums/UserRole';
import { setCurrentUserRole } from '../../../actions/login.actions';
import { getUserRoleLocalName } from '../../../shared/helpers/translations';

export const CurrentUserRoles = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: AppState) => state.loginPageState as LoginPageState);

  const setUserRole = (item: FilterItem) => {
    dispatch(setCurrentUserRole(item.id as UserRole));
  };

  return (
    <FilterList
      data={currentUser!.roles.map((role) => {
        const newRole: FilterItem = {
          id: role,
          name: getUserRoleLocalName(role),
        };
        return newRole;
      })}
      callback={setUserRole}
      cssAlign={Align.Left}
    />
  );
};
