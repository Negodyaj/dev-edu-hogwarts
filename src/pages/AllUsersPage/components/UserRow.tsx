//import { Roles } from '../AllUsersPage';

import { UserRole } from '../../../shared/enums/UserRole';
//import { getUserRoleLocalName } from '../../../shared/helpers/translations';

export type UserRowProps = {
  data: UserRowModel;
};

export type UserRowModel = {
  name: string;
  lastName: string;
  role: UserRole[];
};

export const UserRow = (props: UserRowProps) => {
  const user = props.data;
  return (
    <div className="user-row">
      <div className="user-name">
        {user.name} {user.lastName}
      </div>
      <div className="user-role">
        {user.role.map((i) => (
          <span>{i}, </span>
        ))}
      </div>
      <div className="user-buttons">
        <button>v</button>
        <button>x</button>
      </div>
    </div>
  );
};
