//import { Roles } from '../AllUsersPage';

import { getUserRoleLocalNameForString } from '../../../shared/helpers/translations';

//import { UserRole } from '../../../shared/enums/UserRole';
//import { getUserRoleLocalName } from '../../../shared/helpers/translations';

export type UserRowProps = {
  data: UserRowModel;
};

export type UserRowModel = {
  name: string;
  lastName: string;
  roles: string[];
};

export const UserRow = (props: UserRowProps) => {
  const user = props.data;

  function AddRole() {
    console.log();
  }

  function DeleteUser() {
    console.log();
  }

  return (
    <div className="user-row">
      <div className="user-name">
        {user.name} {user.lastName}
      </div>
      <div className="user-role">
        {user.roles.map((i) => (
          <span>{getUserRoleLocalNameForString(i)}, </span>
        ))}
      </div>
      <div className="user-buttons">
        <button onClick={() => AddRole()}>v</button>
        <button onClick={() => DeleteUser()}>x</button>
      </div>
    </div>
  );
};
