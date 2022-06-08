import { useDispatch } from 'react-redux';
import { toggleRole as toggleRole } from '../../../actions/allUsers.actions';
import { onAddRole } from '../../../actions/allUsers.thunk';
import { FilterItem, FilterList } from '../../../components/FilterList/FilterList';
import { getUserRoleLocalNameForString } from '../../../shared/helpers/translations';
//import { AllUsersPageState } from '../../../store/reducers/allUsers.reducer';
//import { AppState } from '../../../store/store';

export type UserRowProps = {
  data: UserRowModel;
};

export type UserRowModel = {
  name: string;
  lastName: string;
  roles: string[];
  userId: number;
};

const rolesData: FilterItem[] = [
  { id: 1, name: 'Администратор', checkbox: true },
  { id: 2, name: 'Менеджер', checkbox: true },
  { id: 3, name: 'Методист', checkbox: true },
  { id: 4, name: 'Студент', checkbox: true },
  { id: 5, name: 'Учитель', checkbox: true },
  { id: 6, name: 'Тьютор', checkbox: true },
];

export const UserRow = (props: UserRowProps) => {
  //const { selectedUserId } = useSelector(
  //  (state: AppState) => state.allUsersPageState as AllUsersPageState
  //);
  const user = props.data;

  const dispatch = useDispatch();

  function ChangeRole(id: number, role: number) {
    dispatch(toggleRole(id));
    dispatch(onAddRole(id, role));
    console.log('added role ', role, id);
  }

  function DeleteUser() {
    console.log();
  }

  return (
    <div className="user-row">
      <div className="user-name">
        {user.name} {user.lastName}
      </div>
      <div className="user-role">
        {user.roles.map((i) => (
          <span>{getUserRoleLocalNameForString(i)}, </span>
        ))}
      </div>
      <div className="user-buttons form-element with-dropdown">
        <FilterList
          data={rolesData}
          placeholder={''}
          callback={(item) => ChangeRole(user.userId, item.id)}
        />
        <button onClick={() => DeleteUser()}>x</button>
      </div>
    </div>
  );
};
