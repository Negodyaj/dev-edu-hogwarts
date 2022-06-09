import { FilterItem, FilterList } from '../../../components/FilterList/FilterList';
import { Group, StudentToShow } from '../StudentsList';

export type StudentProps = {
  data: StudentToShow;
  groups?: Group[];
  changeGroupId: (studentId: number, groupId: number) => void;
  selectedGroup: Group;
};

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
          data={props.groups || []}
          callback={onSelectGroup}
          selected={props.selectedGroup.id}
        />
      </div>
    </div>
  );
};
