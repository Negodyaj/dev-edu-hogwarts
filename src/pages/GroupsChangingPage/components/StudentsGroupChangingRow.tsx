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

export const StudendsGroupRow = (props: StudentsGroupChangingProps) => {
  const studentsGroupRow = props.data;
  return (
    <div>
      <div>
        {studentsGroupRow.userName} {studentsGroupRow.userSurname}
      </div>
      <div>
        {studentsGroupRow.group}
      </div>
    </div>
  );
};