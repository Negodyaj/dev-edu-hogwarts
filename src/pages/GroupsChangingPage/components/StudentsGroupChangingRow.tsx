import { SvgArrow } from '../../../components/SvgIcon/SvgFiles/SvgArrow';
import { FilterItem, FilterList } from '../../../components/FilterList/FilterList';

export type StudentsGroupChangingProps = {
  data: StudendsGroupRowModel;
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
  const studentsGroupRow = props.data;
  return (
    <div>
      <div className="group-table-row-wrapper">
        <div className="group-table-flex-container group-table-row">
          <span>
            {studentsGroupRow.userName} {studentsGroupRow.userSurname}
          </span>
          <FilterList cssClass='' data={groupSelectData} callback={undefined}/>
        </div>
      </div>
    </div>
  );
};
