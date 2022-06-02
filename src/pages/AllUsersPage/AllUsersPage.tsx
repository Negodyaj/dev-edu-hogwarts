import { useEffect, useState } from 'react';
import './AllUsersPage.scss';
import { UserRow } from './components/UserRow';
import { FilterItem, FilterList } from '../../components/FilterList/FilterList';

const users = [
  {
    name: 'Алла',
    lastName: 'Пугачёва',
    role: ['Студент'],
    roleIds: [3],
    isDeleted: false,
  },
  {
    name: 'Филипп',
    lastName: 'Киркоров',
    role: ['Студент'],
    roleIds: [3],
    isDeleted: false,
  },
  {
    name: 'Сергей',
    lastName: 'Зверев',
    role: ['Студент'],
    roleIds: [3],
    isDeleted: false,
  },
  {
    name: 'Андрей',
    lastName: 'Малахов',
    role: ['Студент', 'Тьютор'],
    roleIds: [3, 4],
    isDeleted: false,
  },
  {
    name: 'Морген',
    lastName: 'Штерн',
    role: ['Менеджер'],
    roleIds: [5],
    isDeleted: false,
  },
  {
    name: 'Валерий',
    lastName: 'Меладзе',
    role: ['Преподаватель', 'Методист'],
    roleIds: [2, 1],
    isDeleted: false,
  },
];
const roleFilterData: FilterItem[] = [
  { id: 0, name: 'Все' },
  { id: 1, name: 'Методист' },
  { id: 2, name: 'Преподаватель' },
  { id: 3, name: 'Студент' },
  { id: 4, name: 'Тьютор' },
  { id: 5, name: 'Менеджер' },
];

export const AllUsersPage = () => {
  const [listState] = useState(users);
  const [filterRoleId, setFilterRoleId] = useState(0);
  const [filtredList, setFilteredList] = useState(users);

  const applyFilters = () => {
    const filtered = listState.filter(
      (item) => filterRoleId === 0 || (filterRoleId > 0 && item.roleIds.includes(filterRoleId))
    );
    setFilteredList(filtered);
    console.log(filtered);
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
