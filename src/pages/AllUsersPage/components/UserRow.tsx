export type UserRowProps = {
  data: UserRowModel;
  //onDelete: (id: number) => void,
};

export type UserRowModel = {
  name: string;
  lastName: string;
  role: string[];
  roleIds: number[];
  isDeleted: boolean;
};

export const UserRow = (props: UserRowProps) => {
  const user = props.data;
  return (
    <div className="user-row">
      <div className="user-name">
        {user.name} {user.lastName}
      </div>
      <div className="user-role">
        {user.role.map((i) => (<span>{i}, </span>))}
      </div>
      <div className="user-buttons">
        <button>v</button><button>x</button>
      </div>
    </div>
  );
};
