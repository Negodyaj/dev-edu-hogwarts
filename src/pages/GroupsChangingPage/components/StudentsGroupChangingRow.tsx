import { FilterItem, FilterList } from '../../../components/FilterList/FilterList';

export type StudentsGroupChangingProps = {
  data: StudendsGroupRowModel;
  changeGroupId: (studentId: number, groupId: number) => void;
};

export type StudendsGroupRowModel = {
  id: number;
  userName: string;
  userSurname: string;
  group: string;
  groupId: number;
};

const groupSelectData: FilterItem[] = [
  { id: 2, name: 'Группа 1' },
  { id: 3, name: 'Группа 2' },
];

export const StudentsGroupRow = (props: StudentsGroupChangingProps) => {
  const onSelectGroup = (item: FilterItem) => {
    props.changeGroupId(props.data.id, item.id);
  };
  const studentsGroupRow = props.data;
  return (
    <div>
      <div className="group-table-row-wrapper">
        <div className="group-table-flex-container group-table-row">
          <span>
            {studentsGroupRow.userName} {studentsGroupRow.userSurname}
          </span>
          <FilterList data={groupSelectData} callback={onSelectGroup} />
        </div>
      </div>
    </div>
  );
};
