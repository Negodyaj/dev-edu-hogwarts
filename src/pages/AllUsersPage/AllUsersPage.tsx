import { useEffect, useState } from 'react';
import './AllUsersPage.scss';
import { UserRow, UserRowModel } from './components/UserRow';
import { FilterItem, FilterList } from '../../components/FilterList/FilterList';
import { UserRole } from '../../shared/enums/UserRole';
import { AllUsersPageState } from '../../store/reducers/allUsers.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { onUsersLoad } from '../../actions/allUsers.thunk';

export interface UsersResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  phoneNumber: string;
  roles: string[];
}

const roleFilterData: FilterItem[] = [
  { id: 7, name: 'Все' },
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
  }, []);

  const [listState] = useState<UserRowModel[]>(userList);
  const [filterRoleId, setFilterRoleId] = useState<UserRole>(UserRole.DefaultRole);
  const [filtredList, setFilteredList] = useState<UserRowModel[]>(userList);
  const [searchBarState, setSearchBarState] = useState('');

  const filterByRole = () => {
    const filtered = listState.filter(
      (item) =>
        filterRoleId === UserRole.DefaultRole ||
        item.roles.find((t) => t === UserRole[filterRoleId].toString())
    );
    console.log(filtered);
    setFilteredList(filtered);
  };

  useEffect(() => filterByRole(), [filterRoleId]);

  const applyRoleFilter = (item: FilterItem) => {
    setFilterRoleId(item.id as UserRole);
  };

  return (
    <>
      <div className="content-container">
        <div className="head-row">
          <div className="user-name">ФИО Пользователя</div>
          <div className="user-role">Роль</div>
          <div>
            <input
              type="search"
              placeholder="Поиск"
              onChange={(event) => {
                setSearchBarState(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="role-filter-row">
          Выберите роль <FilterList data={roleFilterData} callback={applyRoleFilter} />
        </div>

        <div>
          {filtredList
            .filter((i) => {
              if (searchBarState === '') {
                return i;
              } else if (
                i.name.toLowerCase().includes(searchBarState.toLowerCase()) ||
                i.lastName.toLowerCase().includes(searchBarState.toLowerCase())
              ) {
                return i;
              }
            })
            .map((item) => (
              <UserRow data={item} />
            ))}
        </div>
      </div>
    </>
  );
};
