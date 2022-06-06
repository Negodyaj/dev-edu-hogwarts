import { useEffect, useState } from 'react';
import './AllUsersPage.scss';
import { UserRow, UserRowModel } from './components/UserRow';
import { FilterItem, FilterList } from '../../components/FilterList/FilterList';
import { UserRole } from '../../shared/enums/UserRole';
import { AllUsersPageState } from '../../store/reducers/allUsers.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { onUsersLoad } from '../../actions/allUsers.thunk';

/*const users: UserRowModel[] = [
  {
    name: 'Алла',
    lastName: 'Пугачёва',
    role: ['Студент'],
  },
  {
    name: 'Филипп',
    lastName: 'Киркоров',
    role: ['Студент'],
  },
  {
    name: 'Сергей',
    lastName: 'Зверев',
    role: ['Студент'],
  },
  {
    name: 'Андрей',
    lastName: 'Малахов',
    role: ['Студент', 'Тьютор'],
  },
  {
    name: 'Морген',
    lastName: 'Штерн',
    role: ['Менеджер'],
  },
  {
    name: 'Валерий',
    lastName: 'Меладзе',
    role: ['Преподаватель', 'Методист'],
  },
];*/

export interface UsersResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  phoneNumber: string;
  roles: UserRole[];
}

/*export enum Roles {
  Admin = 'Администратор',
  Manager = 'Менеджер',
  Methodist = 'Методист',
  Teacher = 'Учитель',
  Tutor = 'Тьютор',
  Student = 'Студент',
}*/

const roleFilterData = [
  { id: 0, name: 'Все' },
  { id: 1, name: 'Администратор' },
  { id: 2, name: 'Менеджер' },
  { id: 3, name: 'Методист' },
  { id: 4, name: 'Студент' },
  { id: 5, name: 'Учитель' },
  { id: 6, name: 'Тьютор' },
];

export const AllUsersPage = () => {
  const { userList } = useSelector(
    (state: AppState) => state.allUsersPageState as AllUsersPageState
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onUsersLoad());
    console.log(userList.values);
  }, []);

  const [listState] = useState<UserRowModel[]>(userList);
  const [filterRoleId, setFilterRoleId] = useState(0);
  const [filtredList, setFilteredList] = useState(userList);

  const applyFilters = () => {
    const filtered = listState.filter(
      (item) => filterRoleId === 0 || (filterRoleId > 0 && item.role.includes(filterRoleId))
    );
    setFilteredList(filtered);
    console.log(filtered);
    console.log(filterRoleId);
  };

  useEffect(() => applyFilters(), [filterRoleId]);

  const applyRoleFilter = (item: FilterItem) => {
    setFilterRoleId(item.id);
  };

  return (
    <>
      <div className="content-container">
        <div className="head-row">
          <div className="user-name">ФИО Пользователя</div>
          <div className="user-role">Роль</div>
          <div>
            <input type="search" placeholder="Поиск" />
          </div>
        </div>
        <div className="role-filter-row">
          Выберите роль <FilterList data={roleFilterData} callback={applyRoleFilter} />
        </div>

        <div>
          {filtredList.map((item) => (
            <UserRow data={item} />
          ))}
        </div>
      </div>
    </>
  );
};
