import { useDispatch, useSelector } from 'react-redux';
import { LoginPageState } from '../../../store/reducers/login.reducer';
import { AppState } from '../../../store/store';
import { FilterItem, FilterList } from '../../FilterList/FilterList';
import { UserRole } from '../../../shared/enums/UserRole';
import { setCurrentUserRole } from '../../../actions/login.actions';


export const SelectUserRoles = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: AppState) => state.loginPageState as LoginPageState
  );
  const idForRoles = (role: string) => {
    switch (role) {
      case 'Admin':
        return 1;
      case 'Manager':
        return 2;
      case 'Methodist':
        return 3;
      case 'Student':
        return 4;
      case 'Teacher':
        return 5;
      case 'Tutor':
        return 6;
      default:
        return 0;
    }
  };


  const setUserRole = (item: FilterItem) => {
    dispatch(setCurrentUserRole(item.name as UserRole));
  };

  return (
    <>
      {currentUser && (
        <FilterList
          data={currentUser.roles.map((role) => {
            const newRole: FilterItem = {
              id: idForRoles(role),
              name: role,
            };
            return newRole;
          })}
          callback={setUserRole}
        />
      )}
    </>
  );
};
