import { FilterItem, FilterList } from '../../../components/FilterList/FilterList';

export type StudentProps = {
  data: StudentModel;
  changeGroupId: (studentId: number, groupId: number) => void;
};

export type StudentModel = {
  id: number;
  firstName: string;
  lastName: string;
  groupId: number | undefined;
  phoneNumber: string | null;
  email: string;
};

const groupSelectData: FilterItem[] = [
  { id: 2, name: 'Группа 1' },
  { id: 3, name: 'Группа 2' },
];

export const StudentRow = (props: StudentProps) => {
  const onSelectGroup = (item: FilterItem) => {
    props.changeGroupId(props.data.id, item.id);
  };
  const studentsGroupRow = props.data;
  return (
    <div className="group-table-row-wrapper">
      <div className="group-table-grid-container group-table-row">
        <span>
          {studentsGroupRow.firstName} {studentsGroupRow.lastName}
        </span>
        <span>{studentsGroupRow.email}</span>
        <span>{studentsGroupRow.phoneNumber}</span>
        <FilterList
          data={groupSelectData}
          callback={onSelectGroup}
          selected={studentsGroupRow.groupId}
        />
      </div>
    </div>
  );
};
