import { CheckboxGroup } from '../../../components/CheckBoxGroup/CheckBoxGroup';
import { CheckboxData } from '../../../components/CheckBoxGroup/CheckBox/CheckBox';
import { FilterItem, FilterList } from '../../../components/FilterList/FilterList';
import { getUserRoleLocalNameForString } from '../../../shared/helpers/translations';
import { FormProvider, useForm } from 'react-hook-form';

export type UserRowProps = {
  data: UserRowModel;
};

export type UserRowModel = {
  name: string;
  lastName: string;
  roles: string[];
  userId: number;
};

const rolesData: FilterItem[] = [
  { id: 1, name: 'Администратор' },
  { id: 2, name: 'Менеджер' },
  { id: 3, name: 'Методист' },
  { id: 4, name: 'Студент' },
  { id: 5, name: 'Учитель' },
  { id: 6, name: 'Тьютор' },
];

const rolesArrayForCheckbox: CheckboxData[] = rolesData.map((role) => {
  const newRole: CheckboxData = {
    value: role.id,
    text: role.name,
    isChecked: false,
  };
  return newRole;
});

export const UserRow = (props: UserRowProps) => {
  const user = props.data;

  const methods = useForm();

  const { handleSubmit } = methods;

  function AddRole(role: string, id: number) {
    console.log('added role ', role, id);
  }

  function DeleteUser() {
    console.log();
  }

  function onSubmit() {
    console.log('submit');
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
      <div className="user-buttons form-element with-dropdown">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FilterList
              data={rolesData}
              placeholder={''}
              callback={(item) => AddRole(item.name, user.userId)}
            />
            <CheckboxGroup checkboxArr={rolesArrayForCheckbox} name="roles" />
            <button onClick={() => DeleteUser()}>x</button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
