import './AllUsersPage.scss'

export const users = [
  {
    name: 'Алла Пугачёва',
    role: ['Студент'],
    isDeleted: false,
  },
  {
    name: 'Филипп Киркоров',
    role: ['Студент', 'Методист'],
    isDeleted: false,
  },
  {
    name: 'Сергей Зверев',
    role: ['Студент'],
    isDeleted: false,
  },
];

export const AllUsersPage = () => {

  return(
    <>
      <div className="content-container grid">
        <div>ФИО Пользователя</div><div>Роль</div><div>Поиск</div> {/*сделать grid-area*/}
        <div>Выберите роль</div>
      </div>
    </>
  )
}