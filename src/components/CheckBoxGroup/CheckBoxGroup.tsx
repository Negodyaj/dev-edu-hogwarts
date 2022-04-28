import { CheckboxBtn, CheckboxData } from './CheckBox/CheckBox';

export type CheckboxGroupProps = {
  checkboxArr: CheckboxData[];
};

export const CheckboxGroup = (props: CheckboxGroupProps) => {
  return (
    <div>
      {props.checkboxArr.map((item) => (
        <CheckboxBtn data={item} />
      ))}
    </div>
  );
};
