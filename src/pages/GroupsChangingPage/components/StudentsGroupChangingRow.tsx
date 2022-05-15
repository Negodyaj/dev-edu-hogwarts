import { SvgArrow } from '../../../components/SvgIcon/SvgFiles/SvgArrow';

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

export const StudentsGroupRow = (props: StudentsGroupChangingProps) => {
  const studentsGroupRow = props.data;
  return (
    <div>
      <div className='group-table-row-wrapper'>
        <div className='group-table-flex-container'>
          <span>
            {studentsGroupRow.userName} {studentsGroupRow.userSurname}
          </span>
          <span className='select-span'>
            <select name="group-select select-options-wrapper" id="group-select">              
                <option value="group-1">Группа 1</option>
                <option value="group-2">Группа 2</option>              
            </select>
            <button className='select-button'>
            <SvgArrow direction="bottom" />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};
