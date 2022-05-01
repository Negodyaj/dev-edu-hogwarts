import { useDispatch, useSelector } from 'react-redux';
import { LoginPageState } from '../../../store/reducers/login.reducer';
import { AppState } from '../../../store/store';
import { FilterItem, FilterList } from '../../FilterList/FilterList';
import { UserRole } from '../../../shared/enums/UserRole';
import { setCurrentUserRole } from '../../../actions/login.actions';

export const translateForRoles = (role: UserRole) => {
  switch (role) {
    case UserRole.Admin:
      return 'Администратор';
    case UserRole.Manager:
      return 'Менеджер';
    case UserRole.Methodist:
      return 'Методист';
    case UserRole.Student:
      return 'Студент';
    case UserRole.Teacher:
      return 'Преподаватель';
    case UserRole.Tutor:
      return 'Тьютор';
    default:
      return '0';
  }
};

export const CurrentUserRoles = () => {
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

  const reversTranslateForRoles = (role: string) => {
    switch (role) {
      case 'Администратор':
        return UserRole.Admin;
      case 'Менеджер':
        return UserRole.Manager;
      case 'Методист':
        return UserRole.Methodist;
      case 'Студент':
        return UserRole.Student;
      case 'Преподаватель':
        return UserRole.Teacher;
      case 'Тьютор':
        return UserRole.Tutor;
      default:
        return '0';
    }
  };

  const setUserRole = (item: FilterItem) => {
    const selectedRole = reversTranslateForRoles(item.name);
    dispatch(setCurrentUserRole(selectedRole as UserRole));
  };

  return (
    <FilterList
      data={currentUser!.roles.map((role) => {
        const newRole: FilterItem = {
          id: idForRoles(role),
          name: translateForRoles(role),
        };
        return newRole;
      })}
      callback={setUserRole}
    />
  );
};
